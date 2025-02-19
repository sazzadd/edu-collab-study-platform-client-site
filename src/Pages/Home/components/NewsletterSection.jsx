import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <div className="w-11/12 mx-auto p-4">
      <div className="relative bg-[#EDFBFF] text-white rounded-3xl p-10 shadow-xl overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-6 left-6">
          <div className="w-6 h-6 bg-white opacity-30 rounded-full"></div>
        </div>
        <div className="absolute bottom-6 right-6">
          <div className="w-6 h-6 bg-white opacity-30 rounded-full"></div>
        </div>

        {/* Content Section */}
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-bold leading-tight text-gray-900">
            Join Our Newsletter & Stay Updated!
          </h2>
          <p className="text-lg text-gray-600">
            Get exclusive content, special offers, and insightful updates directly to your inbox.
          </p>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="relative flex items-center max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              className="w-full px-6 py-4 rounded-full border-none focus:outline-none focus:ring-4 focus:ring-gray-300 text-gray-900"
              required
            />
            <button
              type="submit"
              className="absolute right-2 px-6 py-3 bg-[#10b981] text-white font-medium rounded-full hover:bg-[#0e9e6e] transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}