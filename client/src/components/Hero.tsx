import { useState, useEffect } from "react";

export default function Hero() {
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTypingComplete(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-midnight via-gray-900 to-midnight"></div>
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 className={`text-6xl md:text-8xl font-bold mb-6 gradient-text ${!isTypingComplete ? 'typing-indicator' : ''}`}>
          codexyn
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Discord Bot Developer specializing in Python & Node.js
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => scrollToSection("projects")}
            className="bg-red-500 hover:bg-red-700 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:glow-red"
          >
            View My Work
          </button>
          <button 
            onClick={() => scrollToSection("contact")}
            className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300"
          >
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
}
