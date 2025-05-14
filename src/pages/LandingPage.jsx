import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";

const LandingPage = () => {
  const navigate = useNavigate();
  return(
    <div>
      <Navbar />
      <Carousel />
      <Footer/>
      {/* Landing Page
      <button onClick={() => navigate('\login')}>Login</button> */}
    </div>
  )
}
export default LandingPage