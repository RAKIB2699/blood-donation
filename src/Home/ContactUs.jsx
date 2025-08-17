import React from 'react';

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;
    console.log({ name, email, message });
    form.reset();
    alert('Message submitted! (This is a placeholder. You can integrate backend or email API.)');
  };

  return (
    <section className="max-w-[1600px] bg-gray-100 py-8 px-4 mb-4 flex items-center">
      <div className="w-full md:w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Left Side */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-red-700 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            If you have any questions or need assistance, feel free to reach out.
          </p>
          <p className="text-lg text-gray-800 font-medium">
            Contact Number: <span className="text-red-600 font-semibold">+880-1234-567890</span>
          </p>
        </div>

        {/* Right Side (Form) */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              rows="4"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
          >
            Send Message
          </button>
        </form>

      </div>
    </section>
  );
};

export default ContactUs;
