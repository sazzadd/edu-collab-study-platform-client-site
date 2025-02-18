import { Collapse } from "@material-tailwind/react";
import React, { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "How to register on the platform?",
      answer:
        "To register, click on the sign-up button and fill in your details including name, email, photo, and select your role (student, tutor, admin).",
    },
    {
      question: "How can I book a study session?",
      answer:
        "You can book a session by browsing through the available study sessions and clicking the 'Book Now' button. If the session is free, it will be booked without payment.",
    },
    {
      question: "What if I forget my password?",
      answer:
        "You can reset your password by clicking on the 'Forgot Password' link on the login page and following the instructions sent to your email.",
    },
    {
      question: "How do I become a tutor?",
      answer:
        "To become a tutor, you need to register with the platform and apply for the tutor role. Admin will approve your application after reviewing.",
    },
    {
      question: "Can I leave reviews for sessions?",
      answer:
        "Yes, after attending a study session, you can leave a review and rating for the tutor and the session on your dashboard.",
    },
  ];

  return (
    <div className="w-11/12 mx-auto my-10 px-6 md:flex md:items-start md:gap-10">
      {/* Left Side Image (Fixed Height) */}
      <div className="w-full hidden md:block md:w-1/3 flex justify-center">
        <img
          src="https://i.ibb.co.com/yFDjm70P/3757762-removebg-preview.png"
          alt="FAQ Illustration"
          className="w-80 h-auto object-cover"
        />
      </div>

      {/* Right Side FAQ Section */}
      <div className="w-full md:w-2/3 space-y-4 min-h-[500px] flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center md:text-left">
          Frequently Asked Questions
        </h2>

        {faqData.map((item, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
          >
            <div
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center cursor-pointer"
            >
              {/* Question */}
              <h3 className="text-lg font-semibold text-gray-800">
                {item.question}
              </h3>
              {/* Expand/Collapse Icon */}
              {openIndex === index ? (
                <MdExpandLess className="text-2xl text-gray-600" />
              ) : (
                <MdExpandMore className="text-2xl text-gray-600" />
              )}
            </div>
            {/* Answer Section */}
            <Collapse open={openIndex === index}>
              <p className="text-gray-600 mt-3">{item.answer}</p>
            </Collapse>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
