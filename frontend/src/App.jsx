import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext";
import { LangProvider } from "./LangContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [walletAddress, setWalletAddress] = useState(null);

  return (
    <ThemeProvider>
      <LangProvider>
        <Router>
          <ToastContainer position="top-center" autoClose={2000} />
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow bg-neutral-50 dark:bg-black">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route
                  path="/PreDashboard"
                  element={<PreDashboard setWalletAddress={setWalletAddress} />}
                />
                <Route
                  path="/SenderDashboard"
                  element={
                    <PrivateRoute
                      requiredRole="Sender"
                      element={SenderDashboard}
                      walletAddress={walletAddress}
                    />
                  }
                />
                <Route
                  path="/CarrierDashboard"
                  element={
                    <PrivateRoute
                      requiredRole="Carrier"
                      element={CarrierDashboard}
                      walletAddress={walletAddress}
                    />
                  }
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
