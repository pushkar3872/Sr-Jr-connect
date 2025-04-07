import React, { useState } from 'react';
import Addiction from './myevents/Addiction';
import Pulzion from './myevents/Pulzion';
import Credenz from './myevents/Credenz';
import Pradny from './myevents/Pradnya';
import EventCard from './myevents/EventCard';

export default function Events() {
  const [searchTerm, setSearchTerm] = useState('');

  const events = [Addiction, Pulzion, Credenz, Pradny];

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">🎉 Explore Events</h1>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-10">
        <div className="relative">
          <input
            type="text"
            placeholder="🔍 Search event by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 pl-12 pr-4 text-lg rounded-full shadow-md border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400 text-xl">🔎</span>
        </div>
      </div>

      {/* Responsive Grid of Cards */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, idx) => <EventCard key={idx} event={event} />)
        ) : (
          <div className="text-center text-gray-500 col-span-full text-xl">No events found 😕</div>
        )}
      </div>
    </div>
  );
}
