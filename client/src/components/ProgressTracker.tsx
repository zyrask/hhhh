import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEditMode } from "@/hooks/useEditMode";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { ProgressUpdate, InsertProgressUpdate, UpdateProgressUpdate } from "@shared/schema";

export default function ProgressTracker() {
  const { isEditMode } = useEditMode();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);

  const { data: progressUpdates = [], isLoading } = useQuery<ProgressUpdate[]>({
    queryKey: ["/api/progress-updates"],
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateProgressUpdate }) => {
      const response = await apiRequest("PATCH", `/api/progress-updates/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress-updates"] });
      setEditingId(null);
      setEditingField(null);
      toast({ title: "Progress update saved successfully" });
    },
    onError: () => {
      toast({ title: "Failed to save update", variant: "destructive" });
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertProgressUpdate) => {
      const response = await apiRequest("POST", "/api/progress-updates", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress-updates"] });
      toast({ title: "New progress update created" });
    },
    onError: () => {
      toast({ title: "Failed to create update", variant: "destructive" });
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Upload failed');
      return response.json();
    },
    onSuccess: (data, file) => {
      toast({ title: "Image uploaded successfully" });
      // You would typically update the specific progress update here
    },
    onError: () => {
      toast({ title: "Failed to upload image", variant: "destructive" });
    },
  });

  const handleTextEdit = (id: number, field: string, value: string) => {
    updateMutation.mutate({
      id,
      data: { [field]: value }
    });
  };

  const handleImageUpload = (id: number) => {
    if (fileInputRef.current) {
      fileInputRef.current.onchange = (e) => {
        const target = e.target as HTMLInputElement;
        if (target.files && target.files[0]) {
          uploadImageMutation.mutate(target.files[0]);
        }
      };
      fileInputRef.current.click();
    }
  };

  const createNewUpdate = () => {
    const newUpdate: InsertProgressUpdate = {
      title: "New Update",
      description: "Click to edit this description",
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      status: "Latest Update",
      tags: ["New"],
      imageUrl: null,
    };
    createMutation.mutate(newUpdate);
  };

  if (isLoading) {
    return (
      <section id="progress-tracker" className="py-20 px-6 bg-midnight">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">Broadcast Error Progress</h2>
          <div className="text-center text-gray-400">Loading progress updates...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="progress-tracker" className="py-20 px-6 bg-midnight">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">Broadcast Error Progress</h2>
        
        <div className="space-y-8">
          {progressUpdates.map((update, index) => (
            <div 
              key={update.id} 
              className={`bg-midnight rounded-xl p-6 border border-gray-800 ${
                isEditMode ? 'edit-mode' : ''
              }`}
            >
              {isEditMode && (
                <div className="edit-overlay">Editable</div>
              )}
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm mr-3 ${
                      index === 0 ? 'bg-red-500 text-white' : 'bg-gray-600 text-white'
                    }`}>
                      {update.status}
                    </span>
                    <span className="text-gray-400 text-sm">{update.date}</span>
                  </div>
                  
                  <h3 
                    className={`text-2xl font-bold mb-4 text-white ${
                      isEditMode ? 'cursor-pointer hover:bg-gray-800 p-2 rounded' : ''
                    }`}
                    contentEditable={isEditMode}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => {
                      if (isEditMode) {
                        handleTextEdit(update.id, 'title', e.currentTarget.textContent || '');
                      }
                    }}
                  >
                    {update.title}
                  </h3>
                  
                  <p 
                    className={`text-gray-300 mb-4 ${
                      isEditMode ? 'cursor-pointer hover:bg-gray-800 p-2 rounded' : ''
                    }`}
                    contentEditable={isEditMode}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => {
                      if (isEditMode) {
                        handleTextEdit(update.id, 'description', e.currentTarget.textContent || '');
                      }
                    }}
                  >
                    {update.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {update.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="md:w-1/3">
                  <div 
                    className={`bg-gradient-to-br from-gray-800 to-midnight rounded-xl h-48 flex items-center justify-center border border-gray-700 ${
                      isEditMode ? 'cursor-pointer hover:border-red-500' : ''
                    }`}
                    onClick={() => isEditMode && handleImageUpload(update.id)}
                  >
                    {update.imageUrl ? (
                      <img 
                        src={update.imageUrl} 
                        alt="Progress update" 
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="text-4xl text-gray-500 mb-2">📷</div>
                        <span className="text-gray-500">
                          {isEditMode ? 'Click to add image' : 'Progress Image'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Update Button (visible in edit mode) */}
        {isEditMode && (
          <div className="text-center mt-8">
            <button 
              onClick={createNewUpdate}
              className="bg-red-500 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              disabled={createMutation.isPending}
            >
              <svg className="inline w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {createMutation.isPending ? 'Creating...' : 'Add New Update'}
            </button>
          </div>
        )}

        {/* Hidden file input for image uploads */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
        />
      </div>
    </section>
  );
}
