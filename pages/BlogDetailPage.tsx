import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { BlogPost } from '../types';
import { getBlogById } from '../services/api';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    if (id) {
        setLoading(true);
        getBlogById(id).then(data => {
            setBlog(data || null);
            setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div></div>;
  if (!blog) return <div className="h-screen flex items-center justify-center">Bài viết không tồn tại</div>;

  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-white"
    >
        {/* Parallax Hero Image */}
        <div className="relative h-[60vh] overflow-hidden">
            <motion.div style={{ y, opacity }} className="absolute inset-0">
                 <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
            </motion.div>
            
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-10">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại trang chủ
                        </Link>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight shadow-sm">{blog.title}</h1>
                        <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>{blog.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{blog.date}</span>
                            </div>
                             <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>5 phút đọc</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="prose prose-lg prose-slate mx-auto prose-headings:text-brand-800 prose-a:text-brand-600 hover:prose-a:text-brand-500 prose-img:rounded-xl"
            >
                <div className="font-bold text-xl text-slate-600 mb-8 border-l-4 border-brand-500 pl-4 italic">
                    {blog.excerpt}
                </div>
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </motion.div>

            <div className="border-t border-slate-100 mt-12 pt-12 flex justify-between items-center">
                 <div className="text-slate-500 font-bold">Chia sẻ bài viết:</div>
                 <div className="flex gap-4">
                     <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition-transform">F</button>
                     <button className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:scale-110 transition-transform">T</button>
                     <button className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:scale-110 transition-transform">P</button>
                 </div>
            </div>
        </div>
    </motion.div>
  );
};

export default BlogDetail;