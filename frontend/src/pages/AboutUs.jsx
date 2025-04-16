import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function BalancedTeamProfile() {
  const team = [
    {
      name: "Pushkar Takale",
      role: "Computer Engineering Student",
      description: "Passionate about tech, AI, and building impactful projects.",
      color: "primary",
      size: "large",
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "John Doe",
      role: "Frontend Developer",
      description: "Loves crafting beautiful UI with React and Tailwind.",
      color: "secondary",
      size: "medium",
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Jane Smith",
      role: "UI/UX Designer",
      description: "Creates intuitive and beautiful user experiences.",
      color: "accent",
      size: "medium",
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Alex Johnson",
      role: "Backend Developer",
      description: "Architecture expert with a passion for scalable systems.",
      color: "info",
      size: "medium",
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#"
      }
    }
  ];

  const getSizeClass = (size) => {
    switch(size) {
      case 'large': return 'w-36 h-36';
      case 'medium': return 'w-28 h-28';
      case 'small': return 'w-20 h-20';
      default: return 'w-28 h-28';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 text-base-content flex flex-col justify-between">
      <main className="py-12 flex-grow">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">Meet the Team</h2>
          <p className="text-center mb-12 text-base-content/70 max-w-xl mx-auto">
            We are a passionate team of developers, designers, and thinkers dedicated to creating meaningful digital experiences that bridge the gap between seniors and juniors.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="card glass shadow-xl border-2 transition-transform hover:scale-[1.02] hover:shadow-2xl">
                <div className="card-body items-center text-center">
                  <div className="avatar">
                    <div className={`${getSizeClass(member.size)} rounded-full ring ring-${member.color} ring-offset-2 ring-offset-base-100`}>
                      <img src={`/api/placeholder/150/150?text=${member.name.charAt(0)}`} alt={member.name} />
                    </div>
                  </div>
                  <h3 className={`card-title text-${member.color} mt-4`}>{member.name}</h3>
                  <div className={`badge badge-${member.color} badge-outline mb-2`}>{member.role}</div>
                  <p className="text-sm">{member.description}</p>
                  <div className="card-actions justify-center mt-4">
                    <a className={`btn btn-circle btn-outline btn-${member.color} btn-sm`}><Github size={16} /></a>
                    <a className={`btn btn-circle btn-outline btn-${member.color} btn-sm`}><Linkedin size={16} /></a>
                    <a className={`btn btn-circle btn-outline btn-${member.color} btn-sm`}><Twitter size={16} /></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-300 text-base-content rounded-t-lg mt-12 border-t border-base-content/10">
        <div>
          <h4 className="font-bold text-lg">Senior–Junior Connect</h4>
          <p className="text-sm max-w-xl mx-auto">
            Empowering students to learn, grow, and support each other. A community where experience meets enthusiasm. Connect. Learn. Rise together.
          </p>
        </div>

        <div className="grid grid-flow-col gap-4">
          <a className="link link-hover">About Us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Contribute</a>
        </div>

        <div>
          <p className="italic text-sm text-base-content/70">
            “Alone we can do so little; together we can do so much.” — Helen Keller
          </p>
          <p className="text-xs text-base-content/50">
            © {new Date().getFullYear()} Senior–Junior Connect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
