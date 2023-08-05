import { Movie } from "@/app/interfaces";
import Image from "next/image";
import Link from "next/link";

async function getMovieDetails(id: string) {
  const movieById = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      accept: "application/json",
      Authorization: process.env.THEMOVIEDBAPI as string,
    },
    next: {
      revalidate: 60,
    },
  });
  return movieById.json();
}
export default async function MovieDetails({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  const data: Movie = await getMovieDetails(params?.id);

  console.log(data);
  return (
    <>
      <div className="min-h-screen p-10">
        <div className="h-[40vh] relative">
          <Image
            src={`https://image.tmdb.org/t/p/original/${data?.backdrop_path}`}
            alt="Movie Banner"
            className="object-cover w-full rounded-lg"
            fill
          />
        </div>
        <h1 className="pt-4 text-4xl font-bold text-center">{data?.title}</h1>
        <div className="flex gap-x-10 mt-10">
          <div className="w-1/2 font-medium">
            <h1>
              <span className="underline">Homepage:</span>
              <Link href={data?.homepage} target="_blank">
                {" "}
                Link
              </Link>
            </h1>
            <h1>
              <span className="underline">Original Language:</span>
              <span> {data?.original_language}</span>
            </h1>
            <p>
              <span className="underline">Overview:</span>
              <span> {data?.overview}</span>
            </p>
            <p>
              <span className="underline">Release Date:</span>
              <span> {data?.release_date}</span>
            </p>
          </div>
          <div className="w-1/2 font-medium bg-gray-100">{children}</div>
        </div>
      </div>
    </>
  );
}
