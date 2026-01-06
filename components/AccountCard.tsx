
import React, { useState } from 'react';
import { BankAccount } from '../types';
import { Wifi, Copy, Check, Maximize2, AlertCircle } from 'lucide-react';

interface AccountCardProps {
  bankAccount: BankAccount;
  onZoom?: () => void;
  onCopy?: (e: React.MouseEvent) => void;
  isZoomed?: boolean;
}

const AccountCard: React.FC<AccountCardProps> = ({ bankAccount, onZoom, onCopy, isZoomed = false }) => {
  const [copied, setCopied] = useState(false);

  const handleLocalCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onCopy) onCopy(e);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className={`relative w-full aspect-[1.58/1] rounded-[32px] p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-700 ${onZoom && !isZoomed ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]' : ''} ${bankAccount.isInactive ? 'grayscale-[0.9]' : ''} opacity-100`}
      style={{ 
        backgroundColor: bankAccount.themeColor,
        backgroundImage: bankAccount.backgroundImage ? `url(${bankAccount.backgroundImage})` : 'none',
        backgroundBlendMode: 'overlay',
        backgroundSize: 'cover'
      }}
      onClick={onZoom}
    >
      {/* Subtle Shine - Purely visual, does not affect background transparency */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-black/10 pointer-events-none"></div>

      {/* Top Section: Branding & Zoom */}
      <div className="flex justify-between items-start relative z-10">
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-2">
            <span className="text-white font-black italic text-xl md:text-2xl tracking-tight">
              {bankAccount.isEWallet ? 'Digital' : 'Paspor'}
            </span>
            <span className="text-white/80 font-medium text-[10px] md:text-xs uppercase tracking-widest">
              {bankAccount.isEWallet ? 'wallet' : 'platinum debit'}
            </span>
          </div>
          {bankAccount.isInactive && (
            <div className="flex items-center gap-1.5 bg-red-600 px-2 py-0.5 rounded-full w-fit shadow-lg">
               <AlertCircle size={10} className="text-white" />
               <span className="text-[9px] font-black text-white uppercase tracking-widest">Nonaktif</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <div className="h-8 md:h-10 flex items-center bg-white/10 px-3 py-1 rounded-xl backdrop-blur-md">
             <img 
              src={bankAccount.logo} 
              alt="Bank Logo" 
              className={`h-full object-contain brightness-0 invert ${bankAccount.bankName === 'ShopeePay' ? 'brightness-100 invert-0' : ''}`}
            />
          </div>
          
          {!isZoomed && onZoom && (
            <div className="p-2 rounded-full bg-black/20 text-white/80 border border-white/20">
              <Maximize2 size={16} />
            </div>
          )}
        </div>
      </div>

      {/* Middle Section: Chip & Wireless */}
      <div className="flex items-center justify-between relative z-10">
        {/* EMV Chip - Solid Look */}
        <div className="w-12 h-9 md:w-14 md:h-11 bg-gradient-to-br from-[#d4af37] via-[#f9e29f] to-[#aa8439] rounded-lg shadow-md relative overflow-hidden border border-[#8a6d1d]">
          <div className="absolute inset-0 opacity-40 grid grid-cols-3 grid-rows-2">
            <div className="border-r border-b border-black/30"></div>
            <div className="border-r border-b border-black/30"></div>
            <div className="border-b border-black/30"></div>
            <div className="border-r border-black/30"></div>
            <div className="border-r border-black/30"></div>
            <div></div>
          </div>
        </div>
        
        <Wifi className="text-white/60 rotate-90" size={20} />
      </div>

      {/* Bottom Section: Info & Copy */}
      <div className="relative z-10 flex justify-between items-end">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <p className={`${isZoomed ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl lg:text-3xl'} text-white font-black tracking-[0.05em] transition-all duration-500 whitespace-nowrap drop-shadow-md`}>
              {bankAccount.accountNumber}
            </p>
            
            <button 
              onClick={handleLocalCopy}
              className={`p-2 rounded-xl transition-all duration-300 shadow-lg flex-shrink-0 ${copied ? 'bg-emerald-500 text-white scale-110' : 'bg-black/30 text-white/80 hover:text-white hover:bg-black/50 border border-white/10'}`}
              title="Salin Nomor"
            >
              {copied ? <Check size={16} strokeWidth={3} /> : <Copy size={16} strokeWidth={3} />}
            </button>
          </div>
          
          <p className="text-white font-bold text-base md:text-lg tracking-wide uppercase drop-shadow-sm">
            {bankAccount.accountName} {bankAccount.isInactive ? '(NONAKTIF)' : ''}
          </p>
        </div>

        {/* Card Brand Aesthetic Circles - Solid */}
        <div className="flex items-center -space-x-4 flex-shrink-0">
          <div className={`w-10 h-10 rounded-full border-2 border-white/20 ${bankAccount.isEWallet ? 'bg-[#00AA13]' : 'bg-white/10'}`}></div>
          <div className={`w-10 h-10 rounded-full border-2 border-white/10 ${bankAccount.isEWallet ? 'bg-[#008CED]' : 'bg-black/10'}`}></div>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
