import { useState, useEffect } from "react";

export function useSecretCode(secretCode: string) {
  const [currentInput, setCurrentInput] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setCurrentInput(prev => {
        const newInput = prev + e.key;
        const trimmedInput = newInput.length > secretCode.length 
          ? newInput.slice(-secretCode.length) 
          : newInput;
        
        if (trimmedInput === secretCode && !isEditMode) {
          setIsEditMode(true);
          setShowNotification(true);
          
          // Hide notification after 3 seconds
          setTimeout(() => {
            setShowNotification(false);
          }, 3000);
        }
        
        return trimmedInput;
      });
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [secretCode, isEditMode]);

  return { isEditMode, showNotification };
}
