import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext";
import { LangProvider } from "./LangContext";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import PreDashboard from "./pages/PreDashboard";
import SenderDashboard from "./pages/SenderDashboard";
import CarrierDashboard from "./pages/CarrierDashboard";
import PrivateRoute from "./components/PrivateRoute";
import TermsAndCond from "./pages/TermsAndCond";
import Footer from "./components/Footer";

function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/PreDashboard" element={<PreDashboard />} />
                <Route
                  path="/SenderDashboard"
                  element={<PrivateRoute element={SenderDashboard} />}
                />
                <Route
                  path="/CarrierDashboard"
                  element={<PrivateRoute element={CarrierDashboard} />}
                />
                <Route path="/TermsAndCond" element={<TermsAndCond />} />
              </Routes>
            </div>
            <Footer className="mt-auto" />
          </div>
        </Router>
      </LangProvider>
    </ThemeProvider>
  );
}

export default App;
