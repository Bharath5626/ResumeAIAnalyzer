import { useState } from "react";
import Navbar from "../components/Navbar";

function Support() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Support form submitted:", form);
    setSubmitted(true);
    // Later: integrate FastAPI endpoint for sending support emails
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Main Section */}
      <div className="flex-1 max-w-6xl mx-auto w-full mt-24 mb-12 px-6">
        <h1 className="text-3xl font-poppins font-bold text-gray-900 mb-4">
          Need Help? We’re Here for You 💬
        </h1>
        <p className="text-gray-600 mb-12 max-w-2xl">
          Whether you’re having trouble with resume templates, ATS analysis, or just have a question — 
          our support team is happy to help.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Support Form */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Contact Support
            </h2>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="Describe your issue or question..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-sm w-full"
                >
                  Submit
                </button>
              </form>
            ) : (
              <div className="text-center text-green-600 font-semibold mt-6">
                ✅ Thank you! Your message has been sent. We’ll reach out soon.
              </div>
            )}
          </div>

          {/* FAQ Section */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              <details className="border border-gray-200 rounded-lg p-4">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  How does the ATS Checker work?
                </summary>
                <p className="text-gray-600 mt-2">
                  Our AI scans your resume for relevant keywords, formatting, and structure to give
                  an ATS-friendly score based on job-matching algorithms.
                </p>
              </details>

              <details className="border border-gray-200 rounded-lg p-4">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Can I download my resume after editing it?
                </summary>
                <p className="text-gray-600 mt-2">
                  Yes! Once you finalize your resume, you’ll be able to download it as a PDF or share it directly.
                </p>
              </details>

              <details className="border border-gray-200 rounded-lg p-4">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Do you store my data securely?
                </summary>
                <p className="text-gray-600 mt-2">
                  Absolutely. Your data is encrypted and stored securely. You can delete it anytime from your dashboard.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;
