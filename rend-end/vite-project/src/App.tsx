import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/Landing"
import Register from "./pages/register"
import Slot from "./pages/slot";
import BookedSlots from "./pages/bookedSlots";

function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/slot" element={<Slot/>} />
        <Route path="/bookedslots" element={<BookedSlots/>} />



      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
