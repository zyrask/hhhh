import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Message sent successfully!" });
      setFormData({ name: "", email: "", message: "" });
    },
    onError: () => {
      toast({ title: "Failed to send message", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    contactMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactMethods = [
    {
      icon: "💬",
      label: "Discord",
      value: "codexyn",
      color: "bg-red-500"
    },
    {
      icon: "🎮",
      label: "Roblox",
      value: "SUSPECTPLOT",
      color: "bg-red-500"
    },
    {
      icon: "✉️",
      label: "Email",
      value: "zyraskk@gmail.com",
      color: "bg-red-500",
      href: "mailto:zyraskk@gmail.com"
    }
  ];

  return (
    <section id="contact" className="py-20 px-6 bg-midnight">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">Get In Touch</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-white">Let's Connect</h3>
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`${method.color} p-3 rounded-lg`}>
                    <span className="text-white text-xl">{method.icon}</span>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">{method.label}</p>
                    {method.href ? (
                      <a 
                        href={method.href}
                        className="text-white font-semibold hover:text-red-500 transition-colors duration-300"
                      >
                        {method.value}
                      </a>
                    ) : (
                      <p className="text-white font-semibold">{method.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-midnight border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-colors duration-300"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-midnight border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-colors duration-300"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-midnight border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-colors duration-300"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={contactMutation.isPending}
                className="w-full bg-red-500 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:glow-red disabled:opacity-50"
              >
                {contactMutation.isPending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
