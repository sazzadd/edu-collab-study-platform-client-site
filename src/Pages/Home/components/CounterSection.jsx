import { useEffect, useState } from "react";
import CountUp from "react-countup";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import useSession from "../../../hook/useSession";

export default function CounterSection() {
  const [session, loading] = useSession();
  const [stats, setStats] = useState([
    { number: 0, label: "Study Sessions" },
    { number: 0, label: "Total Tutors" },
    { number: 0, label: "Total Students" },
    { number: 0, label: "Total Users" },
  ]);
  const [users, setUsers] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic
      .get("/users")
      .then((res) => {
        setUsers(res.data);

        // Filter data based on role
        const tutors = res.data.filter((user) => user.role === "tutor");
        const students = res.data.filter((user) => user.role === "student");

        // Update stats dynamically
        setStats([
          { number: session.length, label: "Study Sessions" },
          { number: tutors.length, label: "Total Tutors" },
          { number: students.length, label: "Total Students" },
          { number: res.data.length, label: "Total Users" },
        ]);
      })
      .catch((error) => {
        console.error("There was an error fetching users!", error);
      });
  }, [axiosPublic, session]);

  return (
    <div className="bg-gray-100 py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 max-w-3xl mx-auto leading-tight">
          Empower Your Learning with <span className="text-[#10b981]">Great Mentors</span>
        </h2>
        <p className="text-gray-600 mb-16 max-w-2xl mx-auto">
          Learn the right skills for the future. Join our expert-led courses and become a part of a thriving community.
        </p>

        <div className="bg-white rounded-2xl shadow-lg p-10 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center px-6 py-4 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300"
              >
                <div className="text-[#10b981] text-6xl font-extrabold mb-2">
                  <CountUp end={stat.number} duration={2.5} suffix="+" enableScrollSpy />
                </div>
                <p className="text-gray-700 text-base font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
