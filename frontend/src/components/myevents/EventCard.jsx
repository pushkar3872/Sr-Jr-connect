import React from 'react';
import { CalendarDays, MapPin } from 'lucide-react';

export default function EventCard({ event }) {
  const { title, description, date, location, image } = event;
  
  return (
    <div className="max-w-xl mx-auto backdrop-blur-lg bg-base-100 shadow-xl rounded-3xl overflow-hidden border border-base-300 hover:shadow-2xl transition duration-500 group">
      
      {/* Header Image with Gradient Overlay */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral/50 to-transparent group-hover:opacity-90 transition duration-500" />
        <div className="absolute bottom-3 left-4 text-white text-2xl font-bold drop-shadow-lg tracking-wide">
          {title}
        </div>
      </div>
      
      {/* Event Info */}
      <div className="p-6 space-y-4">
        <p className="text-base-content text-base leading-relaxed">{description}</p>
        
        <div className="flex flex-col sm:flex-row justify-between gap-3 text-sm text-base-content/70">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-primary" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{location}</span>
          </div>
        </div>
        <button className="mt-4 w-full btn btn-primary text-primary-content font-semibold rounded-xl shadow-md transition duration-300">
          Learn More
        </button>
      </div>
    </div>
  );
}