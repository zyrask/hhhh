import { useState } from "react";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 floating-nav border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="https://i.ibb.co/XfLLCNmk/download-4.jpg" 
              alt="codexyn logo" 
              className="w-10 h-10 rounded-full border-2 border-accent-red"
            />
            <span className="text-xl font-bold gradient-text">codexyn</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection("home")} className="hover:text-red-500 transition-colors duration-300">
              Home
            </button>
            <button onClick={() => scrollToSection("projects")} className="hover:text-red-500 transition-colors duration-300">
              Projects
            </button>
            <button onClick={() => scrollToSection("about")} className="hover:text-red-500 transition-colors duration-300">
              About
            </button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-red-500 transition-colors duration-300">
              Contact
            </button>
          </div>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-red-500"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-midnight border-t border-gray-800 mt-4">
            <div className="px-6 py-4 space-y-4">
              <button onClick={() => scrollToSection("home")} className="block hover:text-red-500 transition-colors duration-300">
                Home
              </button>
              <button onClick={() => scrollToSection("projects")} className="block hover:text-red-500 transition-colors duration-300">
                Projects
              </button>
              <button onClick={() => scrollToSection("about")} className="block hover:text-red-500 transition-colors duration-300">
                About
              </button>
              <button onClick={() => scrollToSection("contact")} className="block hover:text-red-500 transition-colors duration-300">
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
