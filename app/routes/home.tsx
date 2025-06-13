import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "akazwz" },
    { name: "description", content: "akazwz" },
  ];
}

export default function Home() {
  return (
    <div className="h-dvh justify-center items-center flex">
      <h1 className="text-4xl font-bold">AKAZWZ</h1>
    </div>
  );
}
