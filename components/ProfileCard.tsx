
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Star, Users, UserCheck, Bookmark, BadgeCheck, Link2 } from 'lucide-react';

interface ProfileCardProps {
  profile: UserProfile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="bg-white rounded-[48px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] overflow-hidden flex flex-col h-fit p-4 border border-gray-100">
      {/* Hero Header Area */}
      <div className="relative">
        {/* Cover Container */}
        <div className="h-56 rounded-[40px] overflow-hidden bg-white">
          <img 
            src={profile.coverImage} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Profile Avatar */}
        <div className="absolute -bottom-8 left-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-[6px] border-white shadow-2xl overflow-hidden bg-white">
              <img 
                src={profile.profileImage} 
                alt={profile.name} 
                className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
              />
            </div>
          </div>
        </div>

        {/* Company Badge */}
        <div className="absolute bottom-6 right-6 bg-[#3b5998] text-white px-5 py-2.5 rounded-full flex items-center gap-2.5 shadow-xl backdrop-blur-md bg-opacity-95 border border-white/20">
          <div className="w-5 h-5 flex items-center justify-center rounded-md overflow-hidden bg-white/20">
            <img src={profile.companyLogo} alt="Logo" className="w-3 h-3 object-contain invert" />
          </div>
          <span className="text-xs font-black tracking-tight uppercase">{profile.companyName}</span>
        </div>
      </div>

      {/* Profile Content */}
      <div className="px-8 pt-14 pb-8">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-[28px] font-black text-gray-900 tracking-tight leading-tight">{profile.name}</h2>
              <BadgeCheck className="text-blue-500 fill-blue-500/20" size={24} />
            </div>
            <p className="text-gray-400 font-bold text-base tracking-tight">{profile.role}</p>
          </div>
          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`w-12 h-12 flex items-center justify-center rounded-full transition-all border border-gray-100 shadow-sm ${
              isBookmarked 
                ? 'bg-indigo-600 text-white border-indigo-600' 
                : 'bg-gray-50 text-gray-300 hover:text-indigo-600 hover:bg-indigo-50'
            }`}
          >
            <Bookmark size={22} className={isBookmarked ? 'fill-current' : ''} />
          </button>
        </div>

        {/* Minimalist Link Section - Increased size and updated URL */}
        <div className="mt-4 flex items-center gap-2">
          <Link2 size={18} className="text-indigo-900 rotate-[-45deg]" />
          <a 
            href="https://linktr.ee/fikrispt" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-900 text-base font-bold hover:text-indigo-600 transition-all tracking-tight"
          >
            linktr.ee/fikrispt
          </a>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-2 mt-10">
          <div className="bg-gray-50/50 rounded-3xl p-4 flex flex-col items-center justify-center border border-gray-100/50">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Star size={18} className="text-[#FFB800] fill-[#FFB800]" />
              <span className="font-extrabold text-gray-900 text-lg">{profile.stats.rating.toFixed(1)}</span>
            </div>
            <span className="text-[11px] text-gray-400 font-black uppercase tracking-widest">Rating</span>
          </div>
          <div className="bg-gray-50/50 rounded-3xl p-4 flex flex-col items-center justify-center border border-gray-100/50">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Users size={18} className="text-[#3b82f6] fill-[#3b82f6]/10" />
              <span className="font-extrabold text-gray-900 text-lg">{profile.stats.followers}</span>
            </div>
            <span className="text-[11px] text-gray-400 font-black uppercase tracking-widest">Followers</span>
          </div>
          <div className="bg-gray-50/50 rounded-3xl p-4 flex flex-col items-center justify-center border border-gray-100/50">
            <div className="flex items-center gap-1.5 mb-1.5">
              <UserCheck size={18} className="text-[#a855f7] fill-[#a855f7]/10" />
              <span className="font-extrabold text-gray-900 text-lg">{profile.stats.following}</span>
            </div>
            <span className="text-[11px] text-gray-400 font-black uppercase tracking-widest">Following</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
