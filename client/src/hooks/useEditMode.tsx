import { createContext, useContext, useState, ReactNode } from "react";

interface EditModeContextType {
  isEditMode: boolean;
  setEditMode: (mode: boolean) => void;
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

interface EditModeProviderProps {
  children: ReactNode;
  initialEditMode?: boolean;
}

export function EditModeProvider({ children, initialEditMode = false }: EditModeProviderProps) {
  const [isEditMode, setEditMode] = useState(initialEditMode);

  return (
    <EditModeContext.Provider value={{ isEditMode, setEditMode }}>
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  const context = useContext(EditModeContext);
  if (context === undefined) {
    throw new Error("useEditMode must be used within an EditModeProvider");
  }
  return context;
}
