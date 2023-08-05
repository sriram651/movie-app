export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className="bg-pink-500">Hello from dashboard layout</h1>
      {children}
    </>
  );
}
