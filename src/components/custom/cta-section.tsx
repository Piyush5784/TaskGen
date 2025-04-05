import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CtaSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-neon-blue/10 to-transparent -z-10"></div>

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Ready to become a{" "}
              <span className="text-gradient">productivity</span> superstar?
            </h2>
            <p className="text-gray-300 mb-8">
              Join thousands of teams who have already transformed their
              workflow with NeonFlow. Get started today with our 14-day free
              trial.
            </p>
            <div className="glass-card p-6 md:p-8">
              <form>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Full Name
                    </label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="bg-gray-900 border-gray-700 text-gray-300 focus:border-neon-blue focus:ring-neon-blue/20"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Work Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      className="bg-gray-900 border-gray-700 text-gray-300 focus:border-neon-blue focus:ring-neon-blue/20"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Company Size
                    </label>
                    <select
                      id="company"
                      className="w-full rounded-md bg-gray-900 border-gray-700 text-gray-300 focus:border-neon-blue focus:ring-neon-blue/20 py-2 px-3"
                    >
                      <option>Select company size</option>
                      <option>1-10 employees</option>
                      <option>11-50 employees</option>
                      <option>51-200 employees</option>
                      <option>201-500 employees</option>
                      <option>500+ employees</option>
                    </select>
                  </div>
                  <Button className="w-full py-6 bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:opacity-90 transition-opacity">
                    Start Managing Projects Efficiently!
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <div className="hidden md:block">
            <img
              src="/lovable-uploads/dbca3b71-e7e4-4c09-9d5d-f2a6fe2fe729.png"
              alt="NeonFlow UI Preview"
              className="w-full rounded-xl glass-card p-3 animate-float"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
