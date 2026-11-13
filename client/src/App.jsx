import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import Stars from "./components/Stars";
import CurveDecor from "./components/CurveDecor";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Design from "./pages/Design";
import Projects from "./pages/Projects";
import Education from "./pages/Education";
import Contact from "./pages/Contact";
import { API_ENDPOINTS } from "./config/api";

// Single-page layout. Section ids are the navigation targets used by Navbar.
const App = () => {
  useEffect(() => {
    // Warm up the Render backend in the background on initial load to avoid cold-start delays
    fetch(API_ENDPOINTS.health).catch(() => {});
  }, []);

  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:text-[#17051F]">
          Skip to content
        </a>
        <Cursor />
        <Navbar />
        <main id="main">
          <section id="home"><Hero /></section>
          <section id="about" className="relative isolate overflow-hidden"><Stars count={45} particles={4} seed={21} /><CurveDecor /><About /></section>
          <section id="skills" className="bg-tint"><Skills /></section>
          <section id="design"><Design /></section>
          <section id="projects" className="bg-tint"><Projects /></section>
          <section id="education"><Education /></section>
          <section id="contact" className="relative isolate overflow-hidden bg-tint"><Stars count={45} particles={4} seed={55} /><CurveDecor flip /><Contact /></section>
        </main>
        <Footer />
        <ScrollToTopButton />
      </MotionConfig>
    </ThemeProvider>
  );
};

export default App;
