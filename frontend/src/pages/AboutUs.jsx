import React from 'react';
import { Github, Linkedin, Phone, Mail } from 'lucide-react';
import shubhamImage from '../assets/shubham.jpg';
import krishimg from "../assets/krisha.jpg"
import varadimg from "../assets/varad.jpg"
import pushkarimg from "../assets/pushkar.jpg"

export default function BalancedTeamProfile() {
  const team = [
    {
      name: "Pushkar Takale",
      role: "Frontend and Backend Developer",
      description: "Passionate about tech, AI, and building impactful projects.",
      color: "black",
      size: "w-28 h-28",
      img: pushkarimg,
      social: {
        github: "https://github.com/pushkar3872",
        linkedin: "https://www.linkedin.com/in/pushkar-takale-a78644288/",
        whatsapp: "8421663872",
        email: "taklepushkar3872@gmail.com"
      }
    },
    {
      name: "Varad Sane",
      role: "Frontend Developer",
      description: "Loves crafting beautiful UI with React and Tailwind.",
      color: "black",
      size: "w-28 h-28",
      img: varadimg,
      social: {
        github: "https://github.com/Varad73",
        linkedin: "https://www.linkedin.com/in/varad-sane-0838552a9/",
        whatsapp: "9518953455",
        email: "varadsane2004@gmail.com"
      }
    },
    {
      name: "Krisha Ukey",
      role: "Frontend Developer",
      description: "Creates intuitive and beautiful user experiences.",
      color: "black",
      size: "w-28 h-28",
      img: krishimg,
      social: {
        github: "https://github.com/Krisha1803",
        linkedin: "https://www.linkedin.com/in/krisha-ukey-173399288/",
        whatsapp: "8767964320",
        email: "ukeykrisha@gmail.com"
      }
    },
    {
      name: "Shubham Shinde",
      role: "Frontend and Backend Developer",
      description: "Full-stack developer with hands-on experience in building scalable systems through real-world projects.",
      color: "black",
      size: "w-28 h-28",
      img: shubhamImage,
      social: {
        github: "https://github.com/Its-Shinde4241",
        linkedin: "https://www.linkedin.com/in/shubham-shinde-3a36b528a/",
        whatsapp: "8767604529",
        email: "shindeshubham4241@gmail.com"
      }
    }
  ];

  const getSizeClass = (size) => {
    switch (size) {
      case 'large': return 'w-28 h-28';
      case 'medium': return 'w-28 h-28';
      case 'small': return 'w-28 h-28';
      default: return 'w-28 h-28';
    }
  };

  const redirectToWhatsApp = (phoneNumber) => {
    if (phoneNumber) {
      window.open(`https://wa.me/${phoneNumber}`, '_blank');
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
                      <img
                        src={member.img || `/api/placeholder/150/150?text=${member.name}`}
                        alt={member.name}
                      // onError={(e) => {
                      //   e.target.onerror = null;
                      //   e.target.src = `/api/placeholder/150/150?text=${member.name}`;
                      // }}
                      />
                    </div>
                  </div>
                  <h3 className={`card-title text-primary mt-4`}>{member.name}</h3>
                  <div className={`badge badge-${member.color} badge-outline mb-2`}>{member.role}</div>
                  <p className="text-sm">{member.description}</p>
                  <div className="card-actions justify-center mt-4">
                    <a href={member.social.github} target="_blank" rel="noopener noreferrer" className={`btn btn-circle btn-outline btn-${member.color} btn-sm`}>
                      <Github size={16} />
                    </a>
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className={`btn btn-circle btn-outline btn-${member.color} btn-sm`}>
                      <Linkedin size={16} />
                    </a>
                    <button
                      onClick={() => redirectToWhatsApp(member.social.whatsapp)}
                      className={`btn btn-circle btn-outline btn-${member.color} btn-sm`}
                      disabled={!member.social.whatsapp}
                    >
                      <Phone size={16} />
                    </button>
                    <a
                      href={`mailto:${member.social.email}`}
                      className={`btn btn-circle btn-outline btn-${member.color} btn-sm`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Mail size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

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
            "Alone we can do so little; together we can do so much." — Helen Keller
          </p>
          <p className="text-xs text-base-content/50">
            © {new Date().getFullYear()} Senior-Junior Connect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
