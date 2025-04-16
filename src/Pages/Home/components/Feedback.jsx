import { FaRegStar } from "react-icons/fa";

const Feedback = () => {
  return (
    <section className="bg-white py-12 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Student <span className="text-[#10b981]">Feedback</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {/* Feedback Card 1 */}
          <div className="bg-gray-100 p-6 rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
            <FaRegStar className="text-4xl text-yellow-500 mx-auto" />
            <h3 className="font-semibold text-lg mt-3 text-gray-800">
              Redwan Rony
            </h3>
            <p className="mt-2 text-gray-600">
              "This platform helped me find great study sessions and tutors."
            </p>
          </div>
          {/* Feedback Card 2 */}
          <div className="bg-gray-100 p-6 rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
            <FaRegStar className="text-4xl text-yellow-500 mx-auto" />
            <h3 className="font-semibold text-lg mt-3 text-gray-800">
              Mahfuz Hasan
            </h3>
            <p className="mt-2 text-gray-600">
              "The session materials were very useful and well-organized."
            </p>
          </div>
          {/* Feedback Card 3 */}
          <div className="bg-gray-100 p-6 rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
            <FaRegStar className="text-4xl text-yellow-500 mx-auto" />
            <h3 className="font-semibold text-lg mt-3 text-gray-800">
              Tamim Ahmed
            </h3>
            <p className="mt-2 text-gray-600">
              "I highly recommend this platform to other students."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
