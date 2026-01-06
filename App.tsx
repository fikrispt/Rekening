
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { UserProfile, BankAccount } from './types';
import ProfileCard from './components/ProfileCard';
import AccountCard from './components/AccountCard';
import { Check, X, ChevronLeft, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [profile] = useState<UserProfile>({
    name: 'Fikri Saputra',
    role: 'Creative Designer',
    bio: 'Professional UI Designer & Web Developer. Let\'s build something amazing together!',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800&h=400',
    companyName: 'Adobe Photoshop',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.png',
    stats: {
      rating: 5.0,
      followers: '1.1M',
      following: '1'
    }
  });

  const [bankAccounts] = useState<BankAccount[]>([
    {
      id: '1',
      bankName: 'Bank BCA',
      accountName: 'Fikri Saputra',
      accountNumber: '0512 4638 50',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg',
      themeColor: '#001E42',
      backgroundImage: 'https://www.transparenttextures.com/patterns/cubes.png'
    },
    {
      id: '2',
      bankName: 'Blu by BCA',
      accountName: 'Fikri Saputra',
      accountNumber: '0046 9834 8466',
      logo: 'https://blubybcadigital.id/static/media/logo-blu-white.76f92797.svg',
      themeColor: '#005F8C',
      backgroundImage: 'https://www.transparenttextures.com/patterns/diamond-upholstery.png'
    },
    {
      id: '3',
      bankName: 'BRI',
      accountName: 'Fikri Saputra',
      accountNumber: '2130 0101 0586 506',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/BRI_Logo.svg',
      themeColor: '#00529C',
      backgroundImage: 'https://www.transparenttextures.com/patterns/carbon-fibre.png'
    },
    {
      id: '4',
      bankName: 'BTN Syariah',
      accountName: 'Fikri Saputra',
      accountNumber: '2003 4978 36',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Logo_Bank_BTN.svg',
      themeColor: '#0B1A35',
      backgroundImage: 'https://www.transparenttextures.com/patterns/dark-matter.png'
    },
    {
      id: '5',
      bankName: 'BNI',
      accountName: 'Fikri Saputra',
      accountNumber: '0843 9489 44',
      logo: 'https://upload.wikimedia.org/wikipedia/id/5/55/BNI_logo.svg',
      themeColor: '#E06012',
      backgroundImage: 'https://www.transparenttextures.com/patterns/diagmonds-light.png',
      isInactive: true
    },
    {
      id: '6',
      bankName: 'SeaBank',
      accountName: 'Fikri Saputra',
      accountNumber: '9010 6937 1035',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/d/de/SeaBank_logo.svg',
      themeColor: '#FF6600',
      backgroundImage: 'https://www.transparenttextures.com/patterns/cubes.png'
    },
    {
      id: '7',
      bankName: 'ShopeePay',
      accountName: 'Fikri Saputra',
      accountNumber: '0898 0332 737',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg',
      themeColor: '#EE4D2D',
      backgroundImage: 'https://www.transparenttextures.com/patterns/crissxcross.png',
      isEWallet: true
    },
    {
      id: '8',
      bankName: 'DANA',
      accountName: 'Fikri Saputra',
      accountNumber: '0898 0332 737',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg',
      themeColor: '#008CED',
      backgroundImage: 'https://www.transparenttextures.com/patterns/asfalt-dark.png',
      isEWallet: true
    },
    {
      id: '9',
      bankName: 'Gopay',
      accountName: 'Fikri Saputra',
      accountNumber: '0898 0332 737',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg',
      themeColor: '#00AA13',
      backgroundImage: 'https://www.transparenttextures.com/patterns/carbon-fibre.png',
      isEWallet: true
    }
  ]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  
  const touchStartX = useRef<number | null>(null);

  const nextCard = () => setActiveIndex((prev) => (prev + 1) % bankAccounts.length);
  const prevCard = () => setActiveIndex((prev) => (prev - 1 + bankAccounts.length) % bankAccounts.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) nextCard();
      else prevCard();
    }
    touchStartX.current = null;
  };

  const handleCopy = useCallback((account: BankAccount) => {
    const textToCopy = account.accountNumber.replace(/\s/g, '');
    navigator.clipboard.writeText(textToCopy);
    setShowToast(true);
  }, []);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const activeAccount = bankAccounts[activeIndex];

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-10 px-4 md:px-8 lg:py-16 text-gray-900 overflow-x-hidden selection:bg-indigo-100">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-12">
        
        {/* Profile Section */}
        <div className="w-full animate-in fade-in slide-in-from-top-4 duration-700">
          <ProfileCard profile={profile} />
        </div>

        {/* Bank Accounts Section - Swipe Layout */}
        <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 relative">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4">
            <div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">Informasi Pembayaran</h2>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Official Payment Details</p>
            </div>
            <div className="bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
               <span className="text-xs font-black text-indigo-600">Geser untuk melihat</span>
            </div>
          </div>

          {/* Glowing Background Effect */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-64 blur-[120px] opacity-10 transition-all duration-1000 pointer-events-none"
            style={{ backgroundColor: activeAccount.themeColor }}
          ></div>

          {/* 3D Swipe Container */}
          <div className="relative w-full max-w-2xl mx-auto px-4 md:px-0 overflow-visible">
            
            {/* Desktop Navigation Arrows */}
            <button 
              onClick={prevCard}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-20 z-30 p-3 rounded-full bg-white shadow-xl hover:scale-110 active:scale-95 transition-all text-gray-400 hover:text-indigo-600 hidden md:flex border border-gray-100"
            >
              <ChevronLeft size={24} strokeWidth={3} />
            </button>
            <button 
              onClick={nextCard}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-20 z-30 p-3 rounded-full bg-white shadow-xl hover:scale-110 active:scale-95 transition-all text-gray-400 hover:text-indigo-600 hidden md:flex border border-gray-100"
            >
              <ChevronRight size={24} strokeWidth={3} />
            </button>

            {/* Carousel Viewport */}
            <div 
              className="relative w-full aspect-[1.58/1] flex items-center justify-center cursor-grab active:cursor-grabbing"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {bankAccounts.map((account, index) => {
                const isActive = index === activeIndex;
                const isPrev = index === (activeIndex - 1 + bankAccounts.length) % bankAccounts.length;
                const isNext = index === (activeIndex + 1) % bankAccounts.length;

                if (!isActive && !isPrev && !isNext) return null;

                let positionClass = "translate-x-0 scale-100 z-20 blur-none";
                if (isPrev) positionClass = "-translate-x-[65%] scale-[0.8] z-10 blur-[8px]";
                if (isNext) positionClass = "translate-x-[65%] scale-[0.8] z-10 blur-[8px]";

                return (
                  <div 
                    key={account.id}
                    className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] transform opacity-100 ${positionClass}`}
                    onClick={() => {
                      if (isActive) setIsZoomed(account.id);
                      else setActiveIndex(index);
                    }}
                  >
                    <AccountCard 
                      bankAccount={account} 
                      onZoom={() => setIsZoomed(account.id)} 
                      onCopy={() => handleCopy(account)}
                    />
                  </div>
                );
              })}
            </div>

            {/* Pagination Indicators */}
            <div className="flex justify-center items-center gap-2 mt-10">
              {bankAccounts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    activeIndex === index 
                      ? 'w-8 bg-indigo-600' 
                      : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Footer Info */}
          <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] px-4">
            <span>Official Identity &bull; {profile.name}</span>
            <div className="flex gap-4">
              <span>Verified Account</span>
              <span className="text-emerald-500">Secure Payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pop-up Notification (Toast) */}
      <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] transition-all duration-500 transform ${showToast ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90 pointer-events-none'}`}>
        <div className="bg-black/80 backdrop-blur-xl border border-white/10 text-white px-8 py-4 rounded-[24px] shadow-2xl flex items-center gap-3">
          <div className="bg-emerald-500 p-1 rounded-full">
            <Check size={16} strokeWidth={3} />
          </div>
          <span className="font-bold tracking-tight">Berhasil disalin</span>
        </div>
      </div>

      {/* Modal View */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-6"
          onClick={() => setIsZoomed(null)}
        >
          <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
            <X size={40} strokeWidth={1.5} />
          </button>
          
          <div className="w-full max-w-xl transform transition-all duration-500 animate-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
            <AccountCard 
              bankAccount={bankAccounts.find(a => a.id === isZoomed)!} 
              isZoomed={true}
              onCopy={() => handleCopy(bankAccounts.find(a => a.id === isZoomed)!)}
            />
            <div className="mt-12 text-center">
               <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.4em]">Ketuk area manapun untuk kembali</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
