import React from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronRight } from 'lucide-react';
import ThreeHero from './ThreeHero';

const Hero: React.FC = () => {
  const scrollToRoomList = () => {
    const element = document.getElementById('room-list');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-brand-50 to-white">
      {/* 3D Element */}
      <ThreeHero />

      <div className="container mx-auto px-4 z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-block px-4 py-1 mb-4 bg-brand-100 text-brand-700 rounded-full text-sm font-semibold tracking-wide">
            🏆 Hệ thống nhà trọ số 1 Việt Nam
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
            Tìm Không Gian <br/>
            <span className="text-brand-600">Sống Lý Tưởng</span> <br/>
            Cùng VIHOME PLUS
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-lg">
            Trải nghiệm sống tiện nghi, an toàn và hiện đại. Giá cả minh bạch, hỗ trợ 24/7. Hơn 1000+ phòng đang chờ bạn.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2"
              onClick={scrollToRoomList}
            >
              <Search className="w-5 h-5" />
              Tìm Phòng Ngay
            </motion.button>
            <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="bg-white text-brand-700 border-2 border-brand-100 px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-50 flex items-center justify-center gap-2"
               onClick={scrollToRoomList}
            >
               Xem Danh Sách <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="mt-10 flex items-center gap-6 text-slate-500 text-sm font-medium">
             <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                    <img key={i} src={`https://picsum.photos/id/${50+i}/50/50`} className="w-10 h-10 rounded-full border-2 border-white" alt="user" />
                ))}
             </div>
             <p>Được tin tưởng bởi 5000+ cư dân</p>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.8, y: 50 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="relative hidden lg:block"
        >
             <div className="relative rounded-3xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500 border-8 border-white">
                <img src="https://picsum.photos/id/15/800/1000" alt="Hero Room" className="object-cover h-[600px] w-full" />
                
                <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-8 left-8 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg max-w-xs"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-bold text-green-700 uppercase">Vừa đăng 5 phút trước</span>
                    </div>
                    <h3 className="font-bold text-slate-900">Duplex Sunlight Quận 1</h3>
                    <p className="text-brand-600 font-bold">8.500.000đ/tháng</p>
                </motion.div>
             </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;