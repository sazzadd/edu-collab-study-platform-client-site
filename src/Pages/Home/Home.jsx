import { Helmet } from "react-helmet";
import SessionSec from "../../component/SessionSec";
import Banner from "../Shared/Banner";
import TutorList from "./TutorList";
import FAQ from "./components/FAQ";
import Feedback from "./components/Feedback";
import ServicesSection from "./components/ServicesSection";
import CounterSection from "./components/CounterSection";

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
      <Feedback></Feedback>
      <ServicesSection></ServicesSection>
      <CounterSection></CounterSection>
      <FAQ></FAQ>
    </div>
  );
};

export default Home;
<h1>home</h1>;
