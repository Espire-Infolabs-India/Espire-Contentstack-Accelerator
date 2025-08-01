import { useState } from "react";

export default function ContactUsForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  return (
    <section className="contact-form bg-[var(--bg-gray)]">
      <div className="container py-10 mx-auto">
        <h2 className="mb-6">Contact Us</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 rounded bg-white outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded bg-white outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Mobile Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              placeholder="Enter your mobile number"
              className="w-full p-3 border border-gray-300 rounded bg-white outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Message
            </label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              placeholder="Write your message here..."
              className="w-full p-3 border border-gray-300 rounded bg-white outline-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
