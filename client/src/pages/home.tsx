import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import ProgressTracker from "@/components/ProgressTracker";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useSecretCode } from "@/hooks/useSecretCode";
import { EditModeProvider } from "@/hooks/useEditMode";

export default function Home() {
  const { isEditMode, showNotification } = useSecretCode("9017598429");

  return (
    <EditModeProvider initialEditMode={isEditMode}>
      <div className="min-h-screen bg-midnight text-white">
        {/* Secret Code Notification */}
        {showNotification && (
          <div className="secret-notification show">
            <i className="fas fa-unlock mr-2"></i>
            Edit mode activated! Click on elements to edit.
          </div>
        )}

        <Navigation />
        <Hero />
        <Projects />
        <ProgressTracker />
        <About />
        <Contact />
        <Footer />
      </div>
    </EditModeProvider>
  );
}
