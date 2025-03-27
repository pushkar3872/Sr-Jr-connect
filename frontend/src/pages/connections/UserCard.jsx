import React from 'react';

export default function UserCard({ fullName, avatar, domain }) {
  // const = user;

  return (
    <div className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-shadow ring-1 ring-base-content/50">
      <div className="card-body p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="avatar">
                <div className="w-12 h-12 rounded-full">
                  <img
                    src={avatar || `/avatar.png`}
                    alt={fullName}
                    className="bg-base-300"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-base-content">{fullName}</h3>
              <p className="text-sm text-base-content opacity-70">{domain}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}