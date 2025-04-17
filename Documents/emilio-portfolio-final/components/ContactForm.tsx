"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "@emailjs/browser";

export default function ContactForm({ language }: { language: "es" | "en" }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;
  const recaptchaKey = "6Lc1XRorAAAAAG2I4WvcK5zbK0W5AjDkVGlwD4Sn";

  const t = {
    es: {
      name: "Nombre",
      email: "Correo electrónico",
      message: "Mensaje",
      placeholderName: "Tu nombre",
      placeholderEmail: "tucorreo@ejemplo.com",
      placeholderMessage: "¿En qué puedo ayudarte?",
      submit: "Enviar mensaje",
      error: "Todos los campos son obligatorios.",
      invalidEmail: "El correo electrónico no es válido.",
      success: "¡Gracias! Tu mensaje fue enviado correctamente.",
      errorSend: "Hubo un problema al enviar el mensaje.",
      errorNetwork: "Error de red al enviar el formulario.",
      errorCaptcha: "Completa la verificación reCAPTCHA.",
    },
    en: {
      name: "Name",
      email: "Email",
      message: "Message",
      placeholderName: "Your name",
      placeholderEmail: "you@example.com",
      placeholderMessage: "How can I help you?",
      submit: "Send message",
      error: "All fields are required.",
      invalidEmail: "Invalid email address.",
      success: "Thank you! Your message has been sent successfully.",
      errorSend: "There was an issue sending the message.",
      errorNetwork: "Network error while submitting the form.",
      errorCaptcha: "Please complete the reCAPTCHA.",
    },
  };

  const tLang = t[language];

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError(tLang.error);
      return;
    }
    if (!validateEmail(formData.email)) {
      setError(tLang.invalidEmail);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const token = await recaptchaRef.current?.executeAsync();
      recaptchaRef.current?.reset();

      if (!token) {
        setError(tLang.errorCaptcha);
        setLoading(false);
        return;
      }

      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          "g-recaptcha-response": token,
        },
        publicKey
      );

      if (result.status === 200) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setError(tLang.errorSend);
      }
    } catch (err) {
      setError(tLang.errorNetwork);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto mt-8 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {submitted && <p className="text-green-500 text-sm">{tLang.success}</p>}

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          {tLang.name}
        </label>
        <input
          aria-label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
          placeholder={tLang.placeholderName}
          className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          {tLang.email}
        </label>
        <input
          aria-label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
          placeholder={tLang.placeholderEmail}
          className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          {tLang.message}
        </label>
        <textarea
          aria-label="Message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          disabled={loading}
          placeholder={tLang.placeholderMessage}
          className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-md transition flex items-center justify-center gap-2 ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {loading ? (
          <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-opacity-75" />
        ) : (
          tLang.submit
        )}
      </button>

      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={recaptchaKey}
        size="invisible"
        badge="bottomright"
      />
    </motion.form>
  );
}
