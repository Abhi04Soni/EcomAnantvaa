import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar";

const LandingPage = () => {
  const navigate = useNavigate();
  return(
    <div>
      <Navbar></Navbar>
      Landing Page
      <button onClick={() => navigate('\login')}>Login</button>
    </div>
  )
}
export default LandingPage