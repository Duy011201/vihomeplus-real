import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { getBlogs, submitContact } from '../services/api';
import { Send, ArrowRight, Calendar, ChevronDown, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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

const BlogSection: React.FC = () => {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);

    useEffect(() => {
        getBlogs().then(setBlogs);
    }, []);

    return (
        <section id="blog" className="py-24 bg-white border-t border-slate-100">
            <div className="container mx-auto px-4">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="flex justify-between items-end mb-12"
                >
                     <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Tin Tức & Mẹo Hay</h2>
                        <p className="text-slate-500">Cập nhật thông tin mới nhất về thị trường thuê nhà</p>
                     </div>
                     <Link to="/blog/1" className="text-brand-600 font-bold hover:underline flex items-center">Xem tất cả <ArrowRight className="w-4 h-4 ml-1"/></Link>
                </motion.div>
                
                <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {blogs.map(blog => (
                        <motion.div variants={fadeInUp} key={blog.id}>
                            <Link to={`/blog/${blog.id}`} className="group cursor-pointer block h-full">
                                <div className="overflow-hidden rounded-2xl mb-4 relative shadow-md">
                                    <img src={blog.image} alt={blog.title} className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                                </div>
                                <div className="text-xs text-brand-600 font-bold mb-2 uppercase tracking-wide">{blog.date} • {blog.author}</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors leading-tight">{blog.title}</h3>
                                <p className="text-slate-500 text-sm line-clamp-2">{blog.excerpt}</p>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({ 
        name: '', 
        phone: '', 
        area: 'Quận Bình Thạnh',
        type: 'Phòng tiêu chuẩn', 
        moveInDate: '' 
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate CRM integration
        await submitContact(formData);
        setStatus('success');
        setFormData({ name: '', phone: '', area: 'Quận Bình Thạnh', type: 'Phòng tiêu chuẩn', moveInDate: '' });
        setTimeout(() => setStatus('idle'), 3000);
    };

    return (
        <section id="contact" className="py-24 bg-slate-100 relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                 <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[550px]"
                 >
                     {/* Left Column: Dark Info Panel */}
                     <div className="md:w-5/12 bg-slate-900 p-10 md:p-12 text-white relative flex flex-col justify-center overflow-hidden">
                        {/* Decorative Circles matching the design */}
                        <div className="absolute top-[-50px] left-[-50px] w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-[-60px] right-[-60px] w-64 h-64 bg-brand-900/50 rounded-full"></div>

                        <div className="relative z-10">
                            <h2 className="text-4xl font-bold mb-6 leading-tight">
                                Đăng Ký Xem <br/> Phòng
                            </h2>
                            <p className="text-slate-300 text-base mb-10 leading-relaxed">
                                Để lại thông tin, đội ngũ VIHOME PLUS sẽ liên hệ tư vấn và sắp xếp lịch xem phòng cho bạn trong vòng 30 phút.
                            </p>

                            <ul className="space-y-6">
                                <li className="flex items-center gap-4">
                                    <div className="w-2.5 h-2.5 rounded-full bg-brand-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]"></div>
                                    <span className="text-slate-200 font-medium text-lg">Tư vấn miễn phí 24/7</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-2.5 h-2.5 rounded-full bg-brand-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]"></div>
                                    <span className="text-slate-200 font-medium text-lg">Có xe đưa đón xem phòng</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-2.5 h-2.5 rounded-full bg-brand-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]"></div>
                                    <span className="text-slate-200 font-medium text-lg">Quà tặng khi check-in</span>
                                </li>
                            </ul>
                        </div>
                     </div>

                     {/* Right Column: Detailed Form */}
                     <div className="md:w-7/12 bg-white p-8 md:p-12 flex flex-col justify-center">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-600">Họ và tên</label>
                                    <input 
                                        required
                                        type="text" 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3.5 outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all placeholder:text-slate-400 text-slate-800"
                                        placeholder="Nguyễn Văn A"
                                        value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-600">Số điện thoại</label>
                                    <input 
                                        required
                                        type="tel" 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3.5 outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all placeholder:text-slate-400 text-slate-800"
                                        placeholder="0909 xxx xxx"
                                        value={formData.phone}
                                        onChange={e => setFormData({...formData, phone: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-600">Khu vực quan tâm</label>
                                    <div className="relative">
                                        <select 
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3.5 outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all appearance-none cursor-pointer text-slate-800"
                                            value={formData.area}
                                            onChange={e => setFormData({...formData, area: e.target.value})}
                                        >
                                            <option>Quận Bình Thạnh</option>
                                            <option>Quận Cầu Giấy</option>
                                            <option>Quận Đống Đa</option>
                                            <option>Quận 3</option>
                                            <option>Quận Thanh Xuân</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-600">Loại phòng</label>
                                    <div className="relative">
                                        <select 
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3.5 outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all appearance-none cursor-pointer text-slate-800"
                                            value={formData.type}
                                            onChange={e => setFormData({...formData, type: e.target.value})}
                                        >
                                            <option>Phòng tiêu chuẩn</option>
                                            <option>Studio (25 - 30m²)</option>
                                            <option>1 Phòng Ngủ (35 - 45m²)</option>
                                            <option>2 Phòng Ngủ (50 - 70m²)</option>
                                            <option>Duplex Cao Cấp</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-600">Thời gian dự kiến chuyển vào</label>
                                <div className="relative">
                                    <input 
                                        type="date"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3.5 outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all text-slate-600"
                                        value={formData.moveInDate}
                                        onChange={e => setFormData({...formData, moveInDate: e.target.value})}
                                    />
                                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                            
                            <button 
                                disabled={status === 'sending'}
                                type="submit" 
                                className={`w-full py-4 rounded-xl font-bold text-white text-base shadow-lg shadow-brand-500/30 flex justify-center items-center gap-2 transition-all transform active:scale-[0.98] mt-4 ${status === 'success' ? 'bg-green-500 hover:bg-green-600' : 'bg-brand-600 hover:bg-brand-700'}`}
                            >
                                {status === 'sending' ? (
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                ) : status === 'success' ? (
                                    <>Đã Gửi Thành Công <CheckCircle className="w-5 h-5 ml-2" /></>
                                ) : (
                                    <> <Send className="w-4 h-4 rotate-45 -mt-1" /> Đặt Lịch Xem Phòng Ngay</>
                                )}
                            </button>
                        </form>
                     </div>
                 </motion.div>
            </div>
        </section>
    );
};

export { BlogSection, ContactForm };