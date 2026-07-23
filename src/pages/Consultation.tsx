import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export default function Consultation() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden px-4 py-12 page-cover-bg">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0"></div>
      <div className="relative z-10 w-full max-w-lg p-6 sm:p-8 rounded-2xl bg-[#0a180f]/80 border border-primary/20 shadow-[0_0_30px_rgba(50,205,50,0.1)]">
        <h2 className="text-3xl font-bold text-center mb-2">
          Book a <span className="text-primary">Consultation</span>
        </h2>
        <p className="text-gray-400 text-center mb-6 text-sm">
          Not sure where to start? Speak with our experts.
        </p>

        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                First Name
              </label>
              <input
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                placeholder="First Name"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Last Name
              </label>
              <input
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              type="email"
              className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
              placeholder="Email Address"
            />
          </div>
          <div>
            <div className="relative">
              <select
                defaultValue=""
                className="w-full appearance-none rounded-xl border border-white/10 bg-[#0f1f14]/80 px-4 py-3 pr-12 text-white  transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/30 focus:shadow-[0_0_20px_rgba(50,205,50,0.25)] outline-none"
              >
                <option
                  value=""
                  disabled
                  className="bg-[#0f1f14] text-gray-400"
                >
                  Select your experience level
                </option>

                <option value="beginner" className="bg-[#0f1f14] text-white">
                  🌱 Beginner
                </option>

                <option
                  value="intermediate"
                  className="bg-[#0f1f14] text-white"
                >
                  📈 Intermediate
                </option>

                <option value="advanced" className="bg-[#0f1f14] text-white">
                  🚀 Advanced
                </option>
              </select>

              {/* Custom Arrow */}
              <svg
                className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Message (Optional)
            </label>
            <textarea
              className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors h-24 resize-none"
              placeholder="How can we help you?"
            ></textarea>
          </div>
          <Button type="button" className="w-full mt-4">
            Confirm Booking
          </Button>
        </form>
        <div className="mt-6 text-center">
          <Link
            to="/course"
            className="text-xs text-gray-500 hover:text-white transition-colors"
          >
            Back to Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
