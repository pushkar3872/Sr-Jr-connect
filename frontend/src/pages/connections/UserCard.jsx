import React from 'react';

export default function UserCard({ user }) {
  const { name, avatar, role, connectionDate, messageCount, isOnline } = user;
    
  return (
    <div className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-shadow ring-1 ring-base-content/50">
      <div className="card-body p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="avatar">
                <div className="w-12 h-12 rounded-full">
                  <img
                    src={avatar || `/api/placeholder/40/40`}
                    alt={name}
                    className="bg-base-300"
                  />
                </div>
              </div>
              {isOnline && (
                <span className="badge badge-success badge-xs absolute bottom-0 right-0 border-2 border-base-100 rounded-full"></span>
              )}
            </div>
            
            <div>
              <h3 className="font-medium text-base-content">{name}</h3>
              <p className="text-sm text-base-content opacity-70">{role}</p>
            </div>
          </div>
          
          {/* Commented out message button 
          <button className="btn btn-ghost btn-circle btn-sm text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/>
              <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/>
            </svg>
          </button>
          */}
        </div>
        
        {/* Commented out connection info
        <div className="mt-4 pt-3 border-t border-base-200 flex justify-between text-xs text-base-content opacity-60">
          <span>Connected: {connectionDate}</span>
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            {messageCount}
          </span>
        </div>
        */}
      </div>
    </div>
  );
}