import React from "react";
import { useLoaderData } from "react-router-dom";

const UpdateSession = () => {
  const session = useLoaderData();
  console.log(session);
  return <div>Update Session</div>;
};

export default UpdateSession;
