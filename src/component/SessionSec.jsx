import React from "react";
import useSession from "../hook/useSession";
import Loading from "./Loading";
import SessionCard from "./SessionCard";

const SessionSec = () => {
  const [session, loading] = useSession();
  console.log(session);

  if (loading) {
    return <Loading />;
  }

  // If session array is empty, display a message
  if (session.length === 0) {
    return <div className="text-center text-lg">No sessions available.</div>;
  }

  return (
    <div>
      <h1>sessions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {session.map((item) => {
          return (
            // Return JSX from map
            <SessionCard key={item._id} item={item} />
          );
        })}
      </div>
    </div>
  );
};

export default SessionSec;
