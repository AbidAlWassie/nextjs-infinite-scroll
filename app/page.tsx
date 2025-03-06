import { ModeToggle } from "@/components/ModeToggle";
import Posts from "./components/data/Posts";

export default function HomePage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <nav className="flex justify-between ">
        <h1 className="text-3xl font-bold mb-6">Infinite Scroll Posts</h1>
        <ModeToggle />
      </nav>
      <Posts />
    </div>
  );
}
