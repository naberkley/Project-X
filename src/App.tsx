import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "./components/Header";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import Pricing from "./components/Pricing";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/LoginForm";
import Register from "./components/RegisterForm";
import Profile from "./components/UserProfile";
import PrivateRoute from "./components/PrivateRoute";
import ProtectedComponent from "./components/ProtectedComponent";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header id="header" className="Header">
          <AppHeader />
        </header>
        <main id="main">
          {" "}
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/Portfolio" element={<Portfolio />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />{" "}
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/protected" element={<ProtectedComponent />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
