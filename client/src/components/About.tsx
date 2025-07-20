export default function About() {
  const skills = [
    { name: "Python", icon: "🐍" },
    { name: "Node.js", icon: "💚" },
    { name: "Discord", icon: "💬" },
    { name: "Roblox", icon: "🎮" }
  ];

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 gradient-text">About Me</h2>
        
        <div className="bg-midnight rounded-2xl p-8 md:p-12 border border-gray-800">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3">
              <img 
                src="https://i.ibb.co/XfLLCNmk/download-4.jpg" 
                alt="codexyn avatar" 
                className="w-48 h-48 rounded-full border-4 border-red-500 mx-auto"
              />
            </div>
            <div className="md:w-2/3 text-left">
              <h3 className="text-2xl font-bold mb-4 text-white">Hey, I'm codexyn</h3>
              <p className="text-gray-300 text-lg mb-6">
                I'm a passionate developer who loves creating Discord bots using Python and Node.js. 
                With medium knowledge of Luau and experience in Roblox Studio, I enjoy building 
                interactive experiences and useful tools for communities.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {skills.map((skill, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl mb-2">{skill.icon}</div>
                    <p className="text-sm text-gray-400">{skill.name}</p>
                  </div>
                ))}
              </div>
              <a 
                href="https://www.roblox.com/users/648417667/profile" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-red-500 hover:text-red-400 font-semibold transition-colors duration-300"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Roblox Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
