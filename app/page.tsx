import Image from "next/image";
import { Trending } from "./interfaces";
import Link from "next/link";

async function getData() {
  const url = await fetch("https://api.themoviedb.org/3/trending/movie/day", {
    headers: {
      accept: "application/json",
      Authorization: process?.env?.THEMOVIEDBAPI as string,
    },
    next: {
      revalidate: 10
    }
  });

  return url.json();
}

export default async function Home() {
  const data: Trending = await getData();

  console.log("length - ", data?.results?.length);
  return (
    <>
      <div className="py-4 sm:py-6 lg:py-8 bg-white">
        <div className="max-w-screen-3xl px-4 md:px-6">
          <div className="mb-6 md:mb-10">
            <h2 className="text-center font-bold text-lg md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-6xl">
              Top Trending Movies
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8 2xl:gap-16">
            {data?.results?.length !== 0 ? (
              data?.results?.map((movie) => (
                <div className="flex flex-col overflow-hidden rounded-lg border bg-white">
                  <Link
                    className="group relative block overflow-hidden bg-gray-500 lg:h-64 2xl:h-80"
                    href={`movie/${movie?.id}`}
                  >
                    <Image
                      className="inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                      src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                      alt="Movie Banner"
                      width={500}
                      height={500}
                    />
                  </Link>
                  <div className="flex flex-col p-2 md:p-4">
                    <h2 className="text-lg font-semibold xl:font-bold xl:text-2xl text-gray-600">
                      <Link
                        className="transition duration-150 hover:text-green-500"
                        href={`movie/${movie?.id}`}
                      >
                        {movie?.title}
                      </Link>
                    </h2>
                    <p className="text-gray-500 line-clamp-3">{movie?.overview}</p>
                  </div>
                </div>
              ))
            ) : (
              <h3>There are no results!</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// const fetch = require('node-fetch');

// const url = 'https://api.themoviedb.org/3/trending/movie/day';
// const options = {
//   method: 'GET',
// headers: {
//   accept: 'application/json',
//   Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjdjNGI3ODI5YTMzY2U4OTliNmVjZDE4MTU1ZGYxOCIsInN1YiI6IjY0YmI5NGQ4ODVjMGEyMDBhZDVmYzA3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.luabciijNNolZaf62BXGjqWs_SnBgGEbq6uddr8Y52I'
// }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error('error:' + err));
