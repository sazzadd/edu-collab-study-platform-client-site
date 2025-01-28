import { Helmet } from "react-helmet";
import SessionSec from "../../component/SessionSec";
import Banner from "../Shared/Banner";
import TutorList from "./TutorList";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Edu Colab |home </title>
      </Helmet>
      <Banner></Banner>

      {/* session section */}
      <SessionSec></SessionSec>
      {/* <Sessions></Sessions> */}
      {/* Tutor */}
      <TutorList></TutorList>
    </div>
  );
};

export default Home;
<h1>home</h1>;
