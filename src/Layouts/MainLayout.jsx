import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer";
import NavBar1 from "../Pages/Shared/NavBar1";

const MainLayout = () => {
  return (
    <div>
      <NavBar1></NavBar1>
      {/* <Navbar></Navbar> */}
      <section className="min-h-screen">
        <Outlet></Outlet>
      </section>
      <Footer></Footer>
      
    </div>
  );
};

export default MainLayout;
