import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Music, Stars, Sparkles, Volume2, VolumeX, Gift, Smile, Sun, Moon, 
  CloudRain, Coffee, Camera, Book, Feather, Hand, Utensils, Anchor, Cloud, 
  Crown, Flower, Gem, Zap, Ghost, MapPin, User, MessageCircle, HeartHandshake, 
  Laugh, Ear, Flame, Key
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- KONFIGURASI MUSIK ---
// UNTUK DEPLOY: 
// 1. Simpan file lagu (misal: 'elvis.mp3') di folder 'public' project kamu.
// 2. Ubah variable di bawah ini menjadi: "/elvis.mp3"
// 3. Atau gunakan link direct URL jika ada.
const MUSIC_URL = "/love.mp3"; 

// --- DATA 27 ALASAN CINTA (FULL CUSTOM) ---
const fullLoveReasons = [
  {
    id: 1,
    title: "Takdir yang Indah",
    text: "Tentang sosok wanita bernama Khairunnisa yang datang dengan cara yang tidak kaka sangka, mendekat dengan cara yang paling indah.",
    icon: <Stars className="w-6 h-6 text-yellow-300" />
  },
  {
    id: 2,
    title: "Lengkung Senyummu",
    text: "Cara mata Ade menyipit saat tertawa lepas adalah pemandangan paling menenangkan di dunia ini bagi Kaka.",
    icon: <Smile className="w-6 h-6 text-pink-300" />
  },
  {
    id: 3,
    title: "Rumahku",
    text: "Bersama Ade, rasanya seperti pulang ke rumah. Nyaman, hangat, dan tempat di mana lelah Kaka hilang seketika.",
    icon: <Coffee className="w-6 h-6 text-orange-200" />
  },
  {
    id: 4,
    title: "Ketulusan Hati",
    text: "Ade menerima kurangnya Kaka, dan merayakan lebihnya Kaka. Ade membuat Kaka ingin menjadi laki-laki yang jauh lebih baik.",
    icon: <HeartHandshake className="w-6 h-6 text-red-400" />
  },
  {
    id: 5,
    title: "Melodi Suaramu",
    text: "Hanya mendengar suara Ade adalah terapi terbaik untuk hari-hari Kaka yang berat dan bising.",
    icon: <Music className="w-6 h-6 text-blue-300" />
  },
  {
    id: 6,
    title: "Apresiasi Kecil",
    text: "Bagaimana Ade selalu menghargai hal-hal kecil yang Kaka lakukan. Itu membuat Kaka merasa sangat berharga.",
    icon: <Gift className="w-6 h-6 text-purple-300" />
  },
  {
    id: 7,
    title: "Kasih Sayangmu",
    text: "Cara Ade menyayangi Kaka bukan hanya dengan kata, tapi dengan tatapan dan kehadiran yang menenangkan.",
    icon: <Heart className="w-6 h-6 text-red-500" />
  },
  {
    id: 8,
    title: "Perhatianmu",
    text: "Detail-detail kecil yang Ade ingat tentang Kaka, perhatian yang Ade berikan saat Kaka lupa mengurus diri sendiri.",
    icon: <Sun className="w-6 h-6 text-yellow-400" />
  },
  {
    id: 9,
    title: "Tawamu",
    text: "Suara tawa Ade adalah musik favorit Kaka. Renyah, jujur, dan selalu berhasil menular ke hati Kaka.",
    icon: <Laugh className="w-6 h-6 text-green-300" />
  },
  {
    id: 10,
    title: "Sumber Bahagiaku",
    text: "Melihat Ade bahagia sudah cukup untuk membuat Kaka merasa dunia ini baik-baik saja. Ade adalah candu Kaka.",
    icon: <Sparkles className="w-6 h-6 text-amber-200" />
  },
  {
    id: 11,
    title: "Pendengar Setia",
    text: "Ade tidak pernah bosan mendengar cerita Kaka, dari yang paling penting sampai yang paling random sekalipun.",
    icon: <Ear className="w-6 h-6 text-rose-200" />
  },
  {
    id: 12,
    title: "Cita Rasa Cinta",
    text: "Masakan Ade, atau sekadar cara kita menikmati makanan favorit bersama, selalu punya rasa rindu tersendiri.",
    icon: <Utensils className="w-6 h-6 text-orange-400" />
  },
  {
    id: 13,
    title: "Tutur Katamu",
    text: "Cara Ade bicara yang lembut namun tegas, cara Ade menyampaikan isi kepala dengan bijak.",
    icon: <MessageCircle className="w-6 h-6 text-blue-200" />
  },
  {
    id: 14,
    title: "Jangkar Kaka",
    text: "Saat Kaka jatuh atau merasa 'down', Ade adalah orang pertama yang mengulurkan tangan dan meyakinkan Kaka bisa bangkit.",
    icon: <Anchor className="w-6 h-6 text-slate-300" />
  },
  {
    id: 15,
    title: "Mimpi Kita",
    text: "Membayangkan masa depan, membangun mimpi-mimpi kecil dan besar bersamamu adalah aktivitas favorit Kaka.",
    icon: <Cloud className="w-6 h-6 text-sky-200" />
  },
  {
    id: 16,
    title: "Bahasa Cintamu",
    text: "Cara Ade mencintai Kaka dengan unik, kadang lucu, kadang serius, tapi selalu penuh makna.",
    icon: <Flame className="w-6 h-6 text-red-600" />
  },
  {
    id: 17,
    title: "Pengertianmu",
    text: "Ade yang selalu berusaha mengerti posisi Kaka, bahkan saat Kaka sulit mengerti diri sendiri.",
    icon: <Book className="w-6 h-6 text-amber-100" />
  },
  {
    id: 18,
    title: "Penghargaanmu",
    text: "Ade tidak pernah meremehkan usaha Kaka. Sekecil apapun keringat yang keluar, Ade selalu bilang 'Makasih ya'.",
    icon: <Crown className="w-6 h-6 text-yellow-500" />
  },
  {
    id: 19,
    title: "Kekagumanku",
    text: "Di mata Kaka, Ade adalah wanita hebat dan luar biasa. Tangguh menghadapi dunia namun lembut pada Kaka.",
    icon: <StarIconCustom />
  },
  {
    id: 20,
    title: "Parasmu",
    text: "Cantik. Satu kata yang tidak akan bosan Kaka ucapkan. Cantik hati, cantik rupa.",
    icon: <Flower className="w-6 h-6 text-pink-400" />
  },
  {
    id: 21,
    title: "Gemas",
    text: "Sisi imut Ade yang kadang muncul tiba-tiba, membuat Kaka ingin mencubit pipi itu.",
    icon: <Ghost className="w-6 h-6 text-purple-200" />
  },
  {
    id: 22,
    title: "Energi Positif",
    text: "Vibes yang Ade tularin ke Kaka. Dekat Ade membuat Kaka merasa lebih hidup dan bersemangat.",
    icon: <Zap className="w-6 h-6 text-yellow-400" />
  },
  {
    id: 23,
    title: "Hal Random",
    text: "Tingkah lucu Ade saat tidak ngapa-ngapain, atau celetukan random yang bikin kita tertawa berdua.",
    icon: <Laugh className="w-6 h-6 text-teal-300" />
  },
  {
    id: 24,
    title: "Kerja Kerasmu",
    text: "Melihat Ade berjuang untuk impian Ade, bekerja keras, membuat Kaka makin bangga memiliki Ade.",
    icon: <Gem className="w-6 h-6 text-blue-400" />
  },
  {
    id: 25,
    title: "Ketangguhanmu",
    text: "Terima kasih sudah bertahan sejauh ini, menjadi sekeren dan sehebat ini melewati segala badai.",
    icon: <MapPin className="w-6 h-6 text-red-500" />
  },
  {
    id: 26,
    title: "Khairunnisaku",
    text: "Sederhana saja. Karena kamu adalah Khairunnisa. Dan tidak ada orang lain yang bisa menjadi sepertimu.",
    icon: <User className="w-6 h-6 text-rose-300" />
  },
  {
    id: 27,
    title: "Satu Rasa",
    text: "Dan akhirnya, satu alasan yang merangkum semuanya... Karena Kaka mencintai Ade. Sangat.",
    icon: <Key className="w-6 h-6 text-yellow-200" />
  }
];

// Custom Icon wrapper
function StarIconCustom() {
    return <Stars className="w-6 h-6 text-yellow-200" />;
}

const App = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [unlockedCount, setUnlockedCount] = useState(1);
  const [audioError, setAudioError] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  
  const audioRef = useRef(null);

  // Set Page Title
  useEffect(() => {
    document.title = "For Khairunnisa | The Red String";
  }, []);

  const handleStart = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.error("Audio playback failed:", error);
        });
      }
    }
    setIsStarted(true);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleKnotClick = (index) => {
    // Jika simpul terakhir diklik
    if (index === fullLoveReasons.length - 1 && unlockedCount === fullLoveReasons.length) {
       setShowLetter(true);
       setTimeout(() => {
        const letterElement = document.getElementById('final-letter');
        if (letterElement) {
            letterElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    } 
    // Jika simpul biasa
    else if (index === unlockedCount) {
      const nextCount = unlockedCount + 1;
      setUnlockedCount(nextCount);
      
      setTimeout(() => {
        const nextElement = document.getElementById(`knot-${index}`);
        if (nextElement) {
            nextElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0202] text-[#e6cbb1] font-serif overflow-x-hidden selection:bg-red-900 selection:text-white pb-20">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#2b0505_0%,_#0f0202_100%)] opacity-80" />
        <FloatingParticles />
      </div>

      <audio 
        ref={audioRef} 
        src={MUSIC_URL} 
        loop 
        crossOrigin="anonymous"
        onError={() => setAudioError(true)}
      />

      {isStarted && !audioError && (
        <button 
            onClick={toggleMute}
            className="fixed top-4 right-4 z-50 p-2 bg-black/30 rounded-full text-red-400 hover:bg-black/50 transition-all backdrop-blur-sm border border-red-900/30"
        >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      )}

      <AnimatePresence>
        {!isStarted ? (
          <OpeningScreen onStart={handleStart} audioError={audioError} />
        ) : (
          <WavyStringContent 
            reasons={fullLoveReasons} 
            unlockedCount={unlockedCount} 
            onKnotClick={handleKnotClick}
            showLetter={showLetter}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// --- COMPONENTS ---

const OpeningScreen = ({ onStart, audioError }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-center"
    >
      <motion.div
        animate={{ 
            scale: [1, 1.05, 1],
            rotate: [-5, 5, -5] 
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="mb-10 relative"
      >
        <div className="absolute inset-0 bg-red-600 blur-[80px] opacity-20 rounded-full animate-pulse" />
        <Hand 
            size={100} 
            strokeWidth={1}
            className="text-[#ff4d4d] drop-shadow-[0_0_25px_rgba(255,0,0,0.6)] fill-[#2b0505]/50 -rotate-12" 
        />
        <motion.div
            animate={{ y: [-10, -20, -10], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-4 right-2"
        >
            <Heart size={24} className="text-red-400 fill-red-400" />
        </motion.div>
      </motion.div>

      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-4xl md:text-6xl font-bold mb-4 tracking-wider text-[#ff4d4d]"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        The Red String
      </motion.h1>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="flex flex-col gap-2 mb-12"
      >
        <p className="text-sm md:text-lg text-rose-200/80 tracking-widest italic font-light">
          "Take my hand, take my whole life too..."
        </p>
        <p className="text-xs text-rose-200/40 uppercase tracking-[0.3em]">
          For Adibah
        </p>
      </motion.div>

      {audioError && (
        <p className="text-red-400 text-xs mb-4 max-w-xs bg-red-900/20 p-2 rounded border border-red-800">
          *Musik tidak dapat diputar otomatis
        </p>
      )}

      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "rgba(128, 0, 0, 0.3)" }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="group relative px-10 py-4 rounded-full border border-[#800000] text-rose-200 hover:text-white transition-colors duration-500 overflow-hidden cursor-pointer"
      >
        <span className="relative z-10 flex items-center gap-3 text-lg font-serif italic">
          <Hand size={20} className="fill-current" /> Take My Hand
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#800000]/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </motion.button>
    </motion.div>
  );
};

const WavyStringContent = ({ reasons, unlockedCount, onKnotClick, showLetter }) => {
  const itemHeight = 300; 
  const xAmplitudeMobile = 100;
  const xAmplitudeDesktop = 200; 
  
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1000);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const amplitude = isMobile ? xAmplitudeMobile : xAmplitudeDesktop;
  const centerX = windowWidth / 2;
  const totalHeight = (reasons.length * itemHeight) + (showLetter ? 1200 : 400); 

  const generatePath = (limitIndex) => {
    let path = `M ${centerX} 50`; 
    for (let i = 0; i < limitIndex; i++) {
        const currentY = 50 + (i * itemHeight);
        const nextY = 50 + ((i + 1) * itemHeight);
        
        const currentX = i === 0 ? centerX : (centerX + (i % 2 === 0 ? -amplitude : amplitude));
        const nextX = centerX + ((i + 1) % 2 === 0 ? -amplitude : amplitude);
        
        const cp1x = currentX;
        const cp1y = (currentY + nextY) / 2;
        const cp2x = nextX;
        const cp2y = (currentY + nextY) / 2;

        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${nextX} ${nextY}`;
    }
    return path;
  };

  const activeLimit = showLetter ? reasons.length : unlockedCount;
  const activePath = generatePath(activeLimit);
  const fullPath = generatePath(reasons.length - 1);

  return (
    <div className="relative w-full" style={{ height: totalHeight }}>
      
      {/* SVG LAYER */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <path d={fullPath} fill="none" stroke="#2a0a0a" strokeWidth="2" strokeDasharray="5,5" />
        <motion.path 
          d={activePath} 
          fill="none" 
          stroke="#ff0000" 
          strokeWidth="3"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]"
        />
      </svg>

      {/* CONTENT ITEMS */}
      {reasons.map((item, i) => {
        const isCenter = i === 0;
        const isRightNode = i % 2 !== 0; 
        
        const nodeX = isCenter ? centerX : (centerX + (isRightNode ? amplitude : -amplitude));
        const nodeY = 50 + (i * itemHeight);
        
        const isUnlocked = showLetter || i < unlockedCount;
        const isNextToUnlock = !showLetter && i === unlockedCount;
        const isFinalKnot = i === reasons.length - 1;
        const readyForLetter = isFinalKnot && unlockedCount === reasons.length && !showLetter;

        const isLocked = !isUnlocked && !isNextToUnlock;

        const mobileStyle = {
            position: 'fixed', 
            left: `calc(50vw - ${nodeX}px)`, 
            top: '3.5rem', 
            width: '90vw',
            maxWidth: '350px',
            transform: 'translateX(-50%)',
            margin: 0
        };

        const desktopStyle = {
            top: '-2rem', 
            [isRightNode ? 'right' : 'left']: '3rem', 
            textAlign: isRightNode ? 'right' : 'left',
            width: '320px',
            transform: 'none'
        };

        return (
          <div 
            key={item.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: nodeX, top: nodeY }}
          >
            {/* SIMPUL / KNOT */}
            <div 
                id={`knot-${i}`}
                onClick={() => (isNextToUnlock || readyForLetter) && onKnotClick(i)}
                className={`
                    relative z-20 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-500
                    ${isUnlocked ? 'bg-red-600 shadow-[0_0_20px_#ff0000] scale-100' : ''}
                    ${(isNextToUnlock || readyForLetter) ? 'bg-red-900/80 cursor-pointer scale-125' : ''}
                    ${isLocked ? 'bg-[#1a0505] border border-red-900/30 scale-75' : ''}
                `}
            >
                {(isNextToUnlock || readyForLetter) && (
                    <>
                        <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20" />
                        <div className="absolute inset-0 border-2 border-red-500/50 rounded-full animate-pulse" />
                    </>
                )}
                {isUnlocked && <div className="w-3 h-3 bg-white rounded-full shadow-inner" />}
                {readyForLetter && <Key size={14} className="text-yellow-200 animate-bounce" />}
            </div>

            {/* CONTENT CARD */}
            <AnimatePresence>
                {isUnlocked && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className={`
                            absolute p-5 rounded-xl border border-red-900/40 bg-[#150202]/95 backdrop-blur-md shadow-2xl z-10
                            flex flex-col gap-2
                        `}
                        style={isMobile ? mobileStyle : desktopStyle}
                    >
                         {!isMobile && (
                            <div className={`absolute top-8 w-12 h-[1px] bg-red-500/30 ${isRightNode ? '-right-12' : '-left-12'}`} />
                        )}

                        <div className={`flex flex-col gap-2 ${isMobile ? 'items-center text-center' : (isRightNode ? 'items-end' : 'items-start')}`}>
                            <div className="p-2 bg-red-900/20 rounded-full w-fit mb-1">
                                {item.icon}
                            </div>
                            <h3 className="text-red-200 font-bold text-lg tracking-wide font-serif">{item.title}</h3>
                            <p className="text-rose-100/70 text-sm leading-relaxed font-light">
                                {item.text}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Helper Text */}
            {(isNextToUnlock || readyForLetter) && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-red-400/60 tracking-widest uppercase"
                >
                    {readyForLetter ? "Buka Surat" : "Tap"}
                </motion.div>
            )}

          </div>
        );
      })}
      
      {/* FINAL LETTER SECTION */}
      <AnimatePresence>
        {showLetter && (
            <motion.div
                id="final-letter"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="absolute w-full flex justify-center px-4 pb-20"
                style={{ top: (reasons.length * itemHeight) + 100 }}
            >
                <div className="max-w-2xl w-full bg-[#1a0505] border border-red-900/50 p-8 md:p-12 rounded-lg shadow-[0_0_50px_rgba(139,0,0,0.2)] relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-800 to-transparent" />
                    <Feather className="absolute top-6 right-6 text-red-900/20 w-24 h-24 rotate-12" />
                    
                    <div className="relative z-10 text-center space-y-6">
                        <div className="flex justify-center mb-4">
                             <div className="p-3 bg-red-900/30 rounded-full">
                                <Heart className="w-8 h-8 text-red-500 fill-red-500 animate-pulse" />
                             </div>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-serif text-[#ff4d4d] mb-6">Untuk Khairunnisa</h2>
                        
                        <div className="text-rose-100/90 space-y-6 text-justify md:text-center leading-loose font-light text-sm md:text-base">
                            <p>
                                Assalamu'alaikum, Khairunnisa-ku...
                            </p>
                            <p>
                                Tulisan ini Kaka rangkai khusus untuk satu nama yang telah mengubah segalanya. 
                                Pertama-tama, Kaka ingin Ade tahu betapa bangganya Kaka melihat sosok Ade hari ini. 
                                Kaka melihat bagaimana Ade berjuang, bagaimana Ade bekerja keras tanpa lelah, dan bagaimana Ade tetap tersenyum setangguh itu. 
                                Di mata Kaka, Ade bukan hanya cantik parasnya, tapi cantik luar biasa hatinya. Kebaikan yang Ade tebar, ketulusan yang Ade beri, itu semua membuat Ade bersinar terang di mata Kaka.
                            </p>
                            <p>
                                Kaka sering merenung dan tersadar betapa beruntungnya diri ini. 
                                Terima kasih, Ade... Terima kasih yang tak terhingga karena dulu Ade memilih untuk "mengejar", memilih untuk mendekat, dan memberanikan diri masuk ke dalam hidup Kaka yang sepi ini. 
                                Langkah berani Ade itu adalah anugerah terbesar yang pernah Kaka terima. Jika bukan karena keberanian Ade saat itu, mungkin Kaka tidak akan pernah merasakan bahagia seutuh ini.
                            </p>
                            <p>
                                Terima kasih sudah hadir, menetap, dan mewarnai hari-hari Kaka. 
                                Terima kasih sudah menerima Kaka dengan segala kurang, lebih, dan sederhananya Kaka. 
                                Ade adalah jawaban dari doa-doa yang bahkan belum sempat Kaka langitkan. Ade adalah bukti bahwa Tuhan itu Maha Baik dalam merancang skenario pertemuan.
                            </p>
                            <p>
                                <strong>Ada satu hal kecil yang ingin Kaka sampaikan...</strong>
                                <br />
                                Kaka punya satu ketakutan, Ade. Kaka takut Ade berpikir rasa sayang Kaka berkurang jika suatu saat frekuensi pemberian hadiah atau kejutan dari Kaka sedikit berkurang, entah itu dalam bentuk materi atau lainnya.
                                Ketahuilah Ade, itu bukan karena cinta ini memudar. Justru sebaliknya. Saat ini Kaka sedang berjuang keras membangun jalan masa depan kita.
                                Kaka sedang menabung mimpi dan tenaga demi satu tujuan mulia: <strong>segera melamar Ade, menikahi Ade, dan membahagiakan Ade seutuhnya di bawah atap yang sama.</strong>
                                Jadi, percayalah bahwa setiap peluh Kaka hari ini adalah untuk mewujudkan masa depan itu bersamamu secepatnya.
                            </p>
                            <p>
                                Di setiap lelahmu, ingatlah ada Kaka di sini yang selalu siap menjadi tempat bersandar. 
                                Di setiap bahagiamu, ada Kaka yang ingin ikut tersenyum. 
                                Mari kita terus berjalan beriringan, menulis lembar demi lembar cerita indah lainnya, berdua, selamanya.
                            </p>
                            <p className="font-medium text-rose-200 mt-8 italic text-lg">
                                I love you, Khairunnisa. More than words can ever explain.
                            </p>
                        </div>

                        <div className="pt-8 border-t border-red-900/30 mt-8">
                            <p className="text-xs tracking-widest text-red-400/60 uppercase">Salam Sayang,</p>
                            <p className="text-xl font-serif italic text-white mt-2">Kaka</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FloatingParticles = () => {
  const particles = Array.from({ length: 30 });
  return (
    <div className="absolute inset-0 overflow-hidden h-full">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-red-500/10"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, Math.random() * -100],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: Math.random() * 6 + 2 + 'px',
            height: Math.random() * 6 + 2 + 'px',
          }}
        />
      ))}
    </div>
  );
};

export default App;