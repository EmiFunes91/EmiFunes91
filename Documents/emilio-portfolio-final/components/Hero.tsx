"use client";

import { Mail, FileText } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";

type HeroProps = {
  name: string;
  role: string;
  contact: string;
  viewCV: string;
  language: "es" | "en";
};

export default function Hero({
  name,
  role,
  contact,
  viewCV,
  language,
}: HeroProps) {
  const flagSrc = language === "es" ? "/icons/es.svg" : "/icons/gb.svg";
  const altText = language === "es" ? "Bandera de España" : "UK Flag";
  const cvLink = `https://emifunes91.github.io/emiliofunes-cv/${language}/EmilioFunes-CV-${language}.pdf`;

  return (
    <section
      id="inicio"
      className="scroll-mt-24 text-center pt-16 md:pt-24 px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl mx-auto space-y-6"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-blue-600 dark:text-blue-400">
          {name}
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
          {role}
        </p>

        <div className="flex justify-center flex-wrap gap-4 pt-2">
          {/* Botón Contacto */}
          <a
            href="mailto:emilio.ifunes@hotmail.es"
            className="group inline-flex items-center gap-2 rounded-full px-5 py-2 bg-blue-600 text-white shadow-md hover:shadow-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Mail className="w-4 h-4" />
            <span className="text-sm font-medium">{contact}</span>
          </a>

          {/* Botón Ver CV */}
          <a
            href={cvLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full px-5 py-2 bg-gray-800 text-white hover:bg-gray-700 shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <FileText className="w-4 h-4" />
            <span className="text-sm font-medium">
              {language === "es" ? "Ver CV" : "View CV"}
            </span>
            <Image src={flagSrc} alt={altText} width={20} height={20} />
          </a>
        </div>

        <div className="flex justify-center space-x-6 pt-4">
          <a
            href="https://github.com/EmiFunes91"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 dark:hover:text-gray-300 transition"
          >
            <FaGithub className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/emilio-funes-8b140b21a/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition"
          >
            <FaLinkedin className="w-6 h-6" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}


