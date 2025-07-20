export default function Projects() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const discordBots = [
    {
      name: "Light Yagami",
      description: "A comprehensive moderation bot with fun and game features. Built solo as a skills demonstration project.",
      tags: ["Python", "Moderation", "Games"],
      icon: "🏛️"
    },
    {
      name: "Luckigi", 
      description: "A gambling-focused Discord bot with virtual currency and games, similar to popular bots like Dank Memer.",
      tags: ["Node.js", "Gaming", "Economy"],
      icon: "🎰"
    },
    {
      name: "Sentinel",
      description: "A specialized bot designed for ticketing systems and welcoming new users to Discord servers.",
      tags: ["Python", "Ticketing", "Welcome"],
      icon: "🛡️"
    }
  ];

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">My Projects</h2>
        
        {/* Featured Project - Broadcast Error */}
        <div className="mb-20">
          <div className="bg-midnight rounded-2xl p-8 md:p-12 border border-gray-800 hover:border-red-500 transition-all duration-300">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <span className="text-red-500 text-sm font-semibold uppercase tracking-wide">Featured Project</span>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">Broadcast Error</h3>
                <p className="text-gray-300 text-lg mb-6">
                  An exciting game currently in development, created in collaboration with a talented friend. 
                  This project showcases our combined skills in game development and creative design.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://discord.gg/c9MfbBAkfH" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-red-500 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:glow-red inline-flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                    </svg>
                    Join Discord
                  </a>
                  <button 
                    onClick={() => scrollToSection("progress-tracker")}
                    className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                  >
                    View Progress
                  </button>
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-gradient-to-br from-gray-800 to-midnight rounded-xl h-64 flex items-center justify-center border border-gray-700">
                  <div className="text-center">
                    <div className="text-6xl text-red-500 opacity-50 mb-4">🎮</div>
                    <span className="text-gray-400">Game Development in Progress</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Discord Bots Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {discordBots.map((bot, index) => (
            <div key={index} className="project-card rounded-xl p-6 border border-gray-800">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">{bot.icon}</span>
                <h3 className="text-xl font-bold">{bot.name}</h3>
              </div>
              <p className="text-gray-300 mb-4">
                {bot.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {bot.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className={`px-3 py-1 rounded-full text-sm ${
                      tagIndex === 0 ? 'bg-red-500 text-white' : 'bg-gray-700 text-white'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button className="text-red-500 hover:text-red-400 font-semibold transition-colors duration-300">
                Learn More 
                <svg className="inline w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
