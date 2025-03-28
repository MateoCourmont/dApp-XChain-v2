import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext";
import { LangProvider } from "./LangContext";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import PreDasboard from "./pages/PreDasboard";
import SenderDashboard from "./pages/SenderDashboard";
import CarrierDasboard from "./pages/CarrierDashboard";
import Footer from "./components/Footer";

function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/PreDasboard" element={<PreDasboard />} />
            <Route path="/SenderDashboard" element={<SenderDashboard />} />
            <Route path="/CarrierDashboard" element={<CarrierDasboard />} />
          </Routes>
          <Footer />
        </Router>
      </LangProvider>
    </ThemeProvider>
  );
}

export default App;
