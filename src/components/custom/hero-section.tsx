import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="w-full py-12 h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-500 to-indigo-700">
      <div className="container px-4 md:px-6 mx-auto flex flex-col items-center text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
          Streamline Your Task Management
        </h1>
        <p className="max-w-[700px] text-lg text-white/90 md:text-xl">
          Efficiently organize projects and tasks for your entire organization. Track deadlines, assign responsibilities, and boost team productivity in one unified platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-white/90">
            <Link href="/dashboard">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
            <Link href="/features">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
