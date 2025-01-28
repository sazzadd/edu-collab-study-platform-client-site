import Lottie from "lottie-react";
import React from "react";
import WelcomeAnimation from "../../../assets/lottie/dashboard-ani1.json";
const WelcomeDashboard = () => {
  return (
    <div className="">
      <div className="h-1/4 w-5/12 mx-auto">
        <Lottie animationData={WelcomeAnimation}></Lottie>
      </div>
    </div>
  );
};

export default WelcomeDashboard;
