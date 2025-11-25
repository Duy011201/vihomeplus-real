import React, { useState } from 'react';
import { ShieldCheck, UserCheck, Clock, Heart, Star, Check, Wifi, Zap, Wrench, Shield, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Testimonial } from '../types';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// FEATURES
const Features: React.FC = () => {
    const features = [
        { icon: ShieldCheck, title: "An Ninh Tuyệt Đối", desc: "Hệ thống camera 24/7, khóa vân tay 2 lớp, bảo vệ trực đêm." },
        { icon: UserCheck, title: "Chủ Nhà Xác Thực", desc: "100% chủ nhà được xác minh danh tính và giấy tờ pháp lý." },
        { icon: Clock, title: "Hỗ Trợ 24/7", desc: "Đội ngũ kỹ thuật hỗ trợ sửa chữa, vấn đề phát sinh mọi lúc." },
        { icon: Heart, title: "Cộng Đồng Văn Minh", desc: "Môi trường sống trẻ trung, hiện đại, tôn trọng riêng tư." }
    ];

    return (
        <section id="features" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Tại Sao Chọn VIHOME PLUS?</h2>
                    <div className="w-20 h-1 bg-brand-500 mx-auto rounded-full"></div>
                </motion.div>
                
                <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {features.map((f, i) => (
                        <motion.div 
                            key={i}
                            variants={fadeInUp}
                            whileHover={{ y: -10 }}
                            className="p-8 rounded-2xl bg-slate-50 border border-slate-100 text-center hover:bg-white hover:shadow-xl transition-all duration-300"
                        >
                            <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <f.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">{f.title}</h3>
                            <p className="text-slate-500">{f.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

// PRICING CALCULATOR
const PricingCalculator: React.FC = () => {
    const [duration, setDuration] = useState(6);
    const [guests, setGuests] = useState(1);
    const [services, setServices] = useState({ cleaning: false, parking: true });

    const basePrice = 4500000; // Mock base price
    const serviceFee = (services.cleaning ? 300000 : 0) + (services.parking ? 150000 : 0);
    const guestSurcharge = guests > 1 ? (guests - 1) * 200000 : 0;
    const discount = duration >= 12 ? 0.05 : 0; // 5% discount for 1 year
    
    const monthlyTotal = basePrice + serviceFee + guestSurcharge;
    const finalMonthly = monthlyTotal * (1 - discount);
    const totalSavings = (monthlyTotal - finalMonthly) * duration;

    const benefits = [
        { icon: Wifi, text: "Miễn phí Wifi 5GHz tốc độ cao", sub: "Trị giá 250k/tháng" },
        { icon: Zap, text: "Giảm 5% cho HĐ 12 tháng", sub: "Tiết kiệm lên tới 3 triệu/năm" },
        { icon: Wrench, text: "Bảo trì thiết bị miễn phí", sub: "Hỗ trợ trong 24h" },
        { icon: Shield, text: "Cam kết không tăng giá", sub: "Trong suốt chu kỳ hợp đồng" }
    ];

    return (
        <section className="py-24 bg-slate-900 relative overflow-hidden">
             {/* Background Effects */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] rounded-full bg-brand-600 opacity-20 blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] rounded-full bg-purple-600 opacity-10 blur-[100px]"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    
                    {/* Left Side: Info */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-5/12"
                    >
                        <div className="inline-block px-3 py-1 bg-brand-900 border border-brand-700 rounded-full text-brand-300 text-xs font-bold uppercase tracking-wider mb-4">
                            Minh bạch & Tiết kiệm
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Bảng Tính Chi Phí <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-teal-200">Rõ Ràng</span>
                        </h2>
                        <p className="text-slate-300 text-lg mb-10 leading-relaxed">
                            Không có phí ẩn. Bạn hoàn toàn làm chủ ngân sách của mình. Tùy chỉnh gói thuê linh hoạt và nhận ưu đãi khi cam kết dài hạn.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {benefits.map((item, i) => (
                                <motion.div 
                                    key={i}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl flex items-start gap-4 hover:bg-white/10 transition-colors"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-brand-500/20 flex items-center justify-center shrink-0">
                                        <item.icon className="w-5 h-5 text-brand-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm">{item.text}</h4>
                                        <p className="text-slate-400 text-xs mt-1">{item.sub}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side: Calculator Card */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:w-7/12 w-full"
                    >
                        <div className="bg-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-400 to-brand-600"></div>
                            
                            <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-100">
                                <h3 className="text-xl font-bold text-slate-800">Ước tính chi phí</h3>
                                <div className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
                                    Cập nhật hôm nay
                                </div>
                            </div>
                            
                            <div className="space-y-8">
                                {/* Duration Slider */}
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <label className="font-bold text-slate-700">Thời gian thuê</label>
                                        <span className="font-bold text-brand-600 text-lg">{duration} Tháng</span>
                                    </div>
                                    <div className="relative h-2 bg-slate-200 rounded-lg">
                                        <div 
                                            className="absolute top-0 left-0 h-full bg-brand-500 rounded-lg transition-all duration-300" 
                                            style={{ width: `${(duration / 12) * 100}%` }}
                                        ></div>
                                        <input 
                                            type="range" min="1" max="12" 
                                            value={duration}
                                            onChange={(e) => setDuration(parseInt(e.target.value))}
                                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <div 
                                            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-4 border-brand-500 rounded-full shadow-lg pointer-events-none transition-all duration-300"
                                            style={{ left: `calc(${(duration / 12) * 100}% - 12px)` }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                                        <span>1 tháng</span>
                                        <span>6 tháng</span>
                                        <span>12 tháng</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Guests Select */}
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-3">Số người ở</label>
                                        <div className="relative">
                                            <select 
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 ring-brand-200 font-medium text-slate-700 appearance-none"
                                                value={guests}
                                                onChange={(e) => setGuests(parseInt(e.target.value))}
                                            >
                                                <option value={1}>1 Người (Tiêu chuẩn)</option>
                                                <option value={2}>2 Người (+200k)</option>
                                                <option value={3}>3 Người (+400k)</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                                <UserCheck className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Services Toggles */}
                                    <div>
                                         <label className="block text-sm font-bold text-slate-700 mb-3">Dịch vụ bổ sung</label>
                                         <div className="flex flex-col gap-3">
                                             <div 
                                                onClick={() => setServices({...services, cleaning: !services.cleaning})}
                                                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-50 transition-all"
                                             >
                                                 <span className="text-sm text-slate-600">Dọn phòng (+300k)</span>
                                                 <div className={`w-10 h-6 rounded-full p-1 transition-colors duration-300 ${services.cleaning ? 'bg-brand-500' : 'bg-slate-300'}`}>
                                                     <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${services.cleaning ? 'translate-x-4' : 'translate-x-0'}`} />
                                                 </div>
                                             </div>
                                              <div 
                                                onClick={() => setServices({...services, parking: !services.parking})}
                                                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-50 transition-all"
                                             >
                                                 <span className="text-sm text-slate-600">Gửi xe (+150k)</span>
                                                 <div className={`w-10 h-6 rounded-full p-1 transition-colors duration-300 ${services.parking ? 'bg-brand-500' : 'bg-slate-300'}`}>
                                                     <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${services.parking ? 'translate-x-4' : 'translate-x-0'}`} />
                                                 </div>
                                             </div>
                                         </div>
                                    </div>
                                </div>

                                {/* Total Box */}
                                <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-3 opacity-10">
                                        <Zap className="w-24 h-24" />
                                    </div>
                                    
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-slate-400 text-sm">Tổng chi phí / tháng</span>
                                            {discount > 0 && (
                                                <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded">
                                                    Đã giảm 5%
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-baseline gap-1 mb-4">
                                            <span className="text-4xl font-bold tracking-tight">
                                                {new Intl.NumberFormat('vi-VN').format(finalMonthly)}
                                            </span>
                                            <span className="text-xl font-normal text-slate-400">đ</span>
                                        </div>
                                        
                                        {discount > 0 ? (
                                             <div className="flex items-center gap-2 text-sm text-brand-300">
                                                <Star className="w-4 h-4 fill-brand-300" />
                                                <span>Bạn tiết kiệm được <span className="font-bold text-white">{new Intl.NumberFormat('vi-VN').format(totalSavings)}đ</span> cho toàn bộ hợp đồng</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                                <Info className="w-4 h-4" />
                                                <span>Kéo thời gian thuê lên 12 tháng để được giảm giá</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button className="w-full bg-brand-600 text-white py-4 rounded-xl font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/30 transform hover:scale-[1.01] flex items-center justify-center gap-2">
                                    Đặt Lịch Xem Phòng Ngay <Check className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// TESTIMONIALS
const Testimonials: React.FC = () => {
    const [current, setCurrent] = useState(0);
    const testimonials: Testimonial[] = [
        { id: 1, name: 'Nguyễn Văn A', role: 'Sinh viên NEU', content: 'Phòng ốc rất sạch đẹp, giá cả hợp lý so với khu vực. Mình thích nhất là hệ thống an ninh ở đây.', avatar: 'https://picsum.photos/id/64/100/100' },
        { id: 2, name: 'Trần Thị B', role: 'Nhân viên văn phòng', content: 'Chủ nhà thân thiện, hỗ trợ nhiệt tình. Không gian yên tĩnh giúp mình tập trung làm việc tại nhà.', avatar: 'https://picsum.photos/id/65/100/100' },
        { id: 3, name: 'Lê Hoàng C', role: 'Freelancer', content: 'Wifi cực mạnh, thiết kế phòng Studio rất có gu. Sẽ giới thiệu cho bạn bè.', avatar: 'https://picsum.photos/id/66/100/100' }
    ];

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [testimonials.length]);

    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4 text-center">
                 <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-slate-900 mb-12"
                 >
                    Khách Hàng Nói Gì Về Chúng Tôi
                 </motion.h2>
                 <div className="max-w-3xl mx-auto relative h-64">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white p-8 rounded-2xl shadow-xl absolute w-full"
                        >
                            <div className="flex justify-center mb-6">
                                {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 text-yellow-400 fill-current" />)}
                            </div>
                            <p className="text-xl text-slate-600 italic mb-6">"{testimonials[current].content}"</p>
                            <div className="flex items-center justify-center gap-4">
                                <img src={testimonials[current].avatar} alt={testimonials[current].name} className="w-12 h-12 rounded-full object-cover" />
                                <div className="text-left">
                                    <h4 className="font-bold text-slate-900">{testimonials[current].name}</h4>
                                    <p className="text-xs text-slate-500 uppercase">{testimonials[current].role}</p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                 </div>
                 <div className="flex justify-center gap-2 mt-8">
                     {testimonials.map((_, i) => (
                         <button 
                            key={i} 
                            onClick={() => setCurrent(i)}
                            className={`w-3 h-3 rounded-full transition-all ${i === current ? 'bg-brand-600 w-6' : 'bg-slate-300'}`}
                         />
                     ))}
                 </div>
            </div>
        </section>
    );
};

export { Features, PricingCalculator, Testimonials };