import Navbar from "@/components/NavBar";
import ResumeList from "./components/ResumeList";

export default function MainPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-black mb-10">Welcome to AutoResume</h1>
        <ResumeList />
      </main>
    </div>
  );
}
