import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative px-4 md:px-20 min-h-[90vh] pt-16 md:pt-24 pb-12 md:pb-20 overflow-scroll">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 pt-20"
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      ></video>

      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="max-w-full md:max-w-xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 md:mb-6">
              <span className="text-white">Manage Projects with </span>
              <span className="text-gradient">Flow</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-8">
              Streamline your workflow, enhance team collaboration, and boost
              productivity with our AI-powered task management platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                variant={"default"}
                className="text-base md:text-lg w-full sm:w-auto"
                size={"lg"}
              >
                Get Started for Free
              </Button>

              <Button
                asChild
                variant="outline"
                className="text-base md:text-lg w-full sm:w-auto border-neon-blue/30 text-white hover:bg-neon-blue/10"
                size={"lg"}
              >
                <Link href={"/dashboard"}>Dashbaord</Link>
              </Button>
            </div>
          </div>

          <div className="relative animate-float hidden sm:block mt-8 md:mt-0">
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-8 md:w-12 h-8 md:h-12 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple blur-sm"></div>
            <div className="absolute -bottom-6 -left-6 w-8 md:w-12 h-8 md:h-12 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue blur-sm"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
