import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./routes";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { BetFormPage } from "./pages/BetFormPage";
import { LoginPage } from "./pages/LoginPage";
import { BetsPage } from "./pages/BetsPage";
import { BetProvider } from "./context/betsContext";
import  ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { UpcomingEventsPage } from "./pages/UpcomingEventsPage";
import { ProfilePage } from "./pages/ProfilePage";

function App() {
  return (
    <AuthProvider>
      <BetProvider>
        <BrowserRouter>
          <main className="container content-container mx-auto px-10 md:px-0">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPassword/>} />
              <Route path="/upcoming-events" element={<UpcomingEventsPage/>} />
              <Route path="/reset_password/:id/:token" element={<ResetPassword />}></Route>


              <Route element={<ProtectedRoute />}>
                <Route path="/bets" element={<BetsPage />} />
                <Route path="/add-bet" element={<BetFormPage />} />
                <Route path="/bets/:id" element={<BetFormPage />} />
                <Route path="/profile" element={<ProfilePage/>} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </BetProvider>
    </AuthProvider>
  );
}

export default App;
