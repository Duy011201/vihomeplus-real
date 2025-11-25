import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { getBlogs, submitContact } from '../services/api';
import { Send, ArrowRight, MapPin, Phone, Mail } from 'lucide-react';
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
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', type: 'Studio', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate CRM integration
        await submitContact(formData);
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', type: 'Studio', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
    };

    return (
        <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[-5%] w-96 h-96 bg-brand-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
                <div className="absolute bottom-[10%] right-[-5%] w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
            </div>

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                 <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]"
                 >
                     {/* Left Column: Info & Branding */}
                     <div className="md:w-5/12 bg-brand-600 p-10 md:p-12 text-white relative flex flex-col justify-between">
                        {/* Abstract Shapes */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-brand-800 opacity-20 blur-3xl"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
                                Bạn Cần <br/> Tư Vấn Thêm?
                            </h2>
                            <p className="text-brand-50 text-lg mb-10 leading-relaxed font-light">
                                Để lại thông tin, đội ngũ CSKH của <span className="font-bold text-white">VIHOME PLUS</span> sẽ liên hệ lại ngay trong vòng <span className="inline-block bg-white text-brand-700 font-bold px-2 py-0.5 rounded shadow-sm mx-1">15 phút</span> để tư vấn căn phòng phù hợp nhất.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-center gap-5 group">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center backdrop-blur-sm group-hover:bg-white/20 transition-all">
                                        <MapPin className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xs text-brand-200 uppercase tracking-widest mb-1">Trụ sở chính</h4>
                                        <p className="font-semibold text-lg">123 Cầu Giấy, Hà Nội</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-5 group">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center backdrop-blur-sm group-hover:bg-white/20 transition-all">
                                        <Phone className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xs text-brand-200 uppercase tracking-widest mb-1">Hotline 24/7</h4>
                                        <p className="font-bold text-2xl tracking-wide">1900 1234</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-5 group">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center backdrop-blur-sm group-hover:bg-white/20 transition-all">
                                        <Mail className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xs text-brand-200 uppercase tracking-widest mb-1">Email hỗ trợ</h4>
                                        <p className="font-semibold text-lg">support@vihome.vn</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
                            <p className="text-sm text-brand-100 opacity-80 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                Đang hoạt động • Sẵn sàng hỗ trợ
                            </p>
                        </div>
                     </div>

                     {/* Right Column: Form */}
                     <div className="md:w-7/12 bg-white p-10 md:p-14 flex flex-col justify-center">
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-slate-800 mb-2">Gửi Yêu Cầu Tư Vấn</h3>
                            <p className="text-slate-500">Hoàn toàn miễn phí & bảo mật thông tin.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-slate-500 ml-1">Họ tên</label>
                                    <input 
                                        required
                                        type="text" 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                                        placeholder="Nguyễn Văn A"
                                        value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-slate-500 ml-1">Số điện thoại</label>
                                    <input 
                                        required
                                        type="tel" 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                                        placeholder="0912..."
                                        value={formData.phone}
                                        onChange={e => setFormData({...formData, phone: e.target.value})}
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-slate-500 ml-1">Loại phòng quan tâm</label>
                                <div className="relative">
                                    <select 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                                        value={formData.type}
                                        onChange={e => setFormData({...formData, type: e.target.value})}
                                    >
                                        <option>Studio (25 - 30m²)</option>
                                        <option>1 Phòng Ngủ (35 - 45m²)</option>
                                        <option>2 Phòng Ngủ (50 - 70m²)</option>
                                        <option>Duplex Cao Cấp</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>
                            
                             <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-slate-500 ml-1">Lời nhắn (Không bắt buộc)</label>
                                <textarea 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all resize-none"
                                    rows={3}
                                    placeholder="Ví dụ: Tôi muốn xem phòng vào sáng thứ 7..."
                                    value={formData.message}
                                    onChange={e => setFormData({...formData, message: e.target.value})}
                                ></textarea>
                            </div>
                            
                            <button 
                                disabled={status === 'sending'}
                                type="submit" 
                                className={`w-full py-4 rounded-xl font-bold text-white text-lg shadow-lg shadow-brand-200 flex justify-center items-center gap-2 transition-all transform active:scale-95 ${status === 'success' ? 'bg-green-500 hover:bg-green-600' : 'bg-brand-600 hover:bg-brand-700 hover:-translate-y-1'}`}
                            >
                                {status === 'sending' ? (
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                ) : status === 'success' ? (
                                    <>Đã Gửi Thành Công <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[10px]">✓</div></>
                                ) : (
                                    <>Nhận Tư Vấn Miễn Phí <Send className="w-5 h-5 ml-1" /></>
                                )}
                            </button>
                            <p className="text-center text-xs text-slate-400 mt-4">
                                Bằng việc gửi thông tin, bạn đồng ý với chính sách bảo mật của chúng tôi.
                            </p>
                        </form>
                     </div>
                 </motion.div>
            </div>
        </section>
    );
};

export { BlogSection, ContactForm };