"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Stack from "../components/Stack";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import FadeInSection from "../components/FadeInSection";
import ScrollToTop from "../components/ScrollToTop";

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState<"es" | "en">("es");

  // Detectar idioma del navegador al cargar
  useEffect(() => {
    const browserLang = navigator.language || navigator.languages[0];
    setLanguage(browserLang.includes("en") ? "en" : "es");
  }, []);

  // Controlar clase "dark" en <html>
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("portfolio-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Cargar preferencia guardada del usuario
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme) setDarkMode(savedTheme === "dark");
  }, []);

  const t = {
    es: {
      name: "Emilio Funes",
      role: "Backend Developer | Java, Spring Boot, PHP, Laravel",
      contact: "Contacto",
      viewCV: "Ver CV",
      about: "Sobre mí",
      aboutText:
        "Soy un desarrollador backend con una fuerte orientación a la calidad del código, la arquitectura escalable y la resolución de problemas reales. Me especializo en construir APIs sólidas, seguras y eficientes utilizando Java (Spring Boot) y PHP (Laravel), integrando bases de datos relacionales y herramientas modernas de desarrollo. Mi enfoque combina buenas prácticas de ingeniería, pensamiento estratégico y compromiso con la entrega de valor en cada proyecto.",
      tech: "Tecnologías que uso",
      projects: "Proyectos Destacados",
      contactSection: "¿Charlamos?",
      contactText:
        "Disponible para proyectos freelance, consultorías o roles remotos. ¡Conectemos!",
      sendMail: "Enviar un correo",
      testimonials: "Testimonios",
    },
    en: {
      name: "Emilio Funes",
      role: "Backend Developer | Java, Spring Boot, PHP, Laravel",
      contact: "Contact",
      viewCV: "View CV",
      about: "About Me",
      aboutText:
        "I'm a backend developer passionate about building clean, scalable, and high-performance systems. I specialize in designing robust APIs using Java (Spring Boot) and PHP (Laravel), with strong experience in database integration and modern development workflows. I combine engineering best practices with business-driven thinking to deliver backend solutions that create real impact.",
      tech: "Tech Stack",
      projects: "Highlighted Projects",
      contactSection: "Let's Talk",
      contactText:
        "Available for freelance, consulting, or remote roles. Let’s connect!",
      sendMail: "Send Email",
      testimonials: "Testimonials",
    },
  };

  const tLang = t[language];

  return (
    <>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        language={language}
        setLanguage={setLanguage}
      />

      <main
        className="min-h-screen pt-20 p-4 md:p-10 font-sans transition-all duration-500
        bg-white text-gray-900 dark:bg-gray-950 dark:text-white"
      >
        <FadeInSection>
          <Hero
            name={tLang.name}
            role={tLang.role}
            contact={tLang.contact}
            viewCV={tLang.viewCV}
            language={language}
          />
        </FadeInSection>

        <FadeInSection>
          <About title={tLang.about} text={tLang.aboutText} />
        </FadeInSection>

        <FadeInSection>
          <Stack title={tLang.tech} />
        </FadeInSection>

        <FadeInSection>
          <Projects title={tLang.projects} />
        </FadeInSection>

        <FadeInSection>
          <Testimonials title={tLang.testimonials} />
        </FadeInSection>

        <FadeInSection>
          <Contact
            title={tLang.contactSection}
            description={tLang.contactText}
            buttonText={tLang.sendMail}
            language={language}
          />
        </FadeInSection>
           
        <ScrollToTop />
        <Footer language={language} />
      </main>
    </>
  );
}
