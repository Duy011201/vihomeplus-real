import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, MapPin, Share2, Heart, User, Shield, ChevronLeft, ChevronRight, Navigation, X, Phone, MessageCircle } from 'lucide-react';
import { Room } from '../types';
import { getRoomById, getRelatedRooms } from '../services/api';
import { RoomCard } from '../components/RoomList';

const RoomDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [room, setRoom] = useState<Room | null>(null);
  const [relatedRooms, setRelatedRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    if (id) {
        setLoading(true);
        // Reset scroll position
        window.scrollTo(0, 0);
        
        getRoomById(id).then(data => {
            setRoom(data || null);
            setCurrentImageIndex(0);
            
            if (data) {
                getRelatedRooms(id).then(related => {
                    setRelatedRooms(related);
                    setLoading(false);
                });
            } else {
                setLoading(false);
            }
        });
    }
  }, [id]);

  const nextImage = () => {
    if (room && room.gallery.length > 0) {
        setCurrentImageIndex((prev) => (prev + 1) % room.gallery.length);
    }
  };

  const prevImage = () => {
    if (room && room.gallery.length > 0) {
        setCurrentImageIndex((prev) => (prev - 1 + room.gallery.length) % room.gallery.length);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div></div>;
  if (!room) return <div className="h-screen flex items-center justify-center">Phòng không tồn tại</div>;

  return (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="pt-24 pb-20 bg-slate-50 min-h-screen"
    >
        <div className="container mx-auto px-4">
            <Link to="/" className="inline-flex items-center text-slate-500 hover:text-brand-600 mb-6 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" /> Quay lại danh sách
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                {/* Left Column: Gallery & Info */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Gallery Carousel */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg select-none group">
                        <div className="relative h-96 bg-slate-900">
                             <AnimatePresence mode="wait">
                                <motion.img 
                                    key={currentImageIndex}
                                    src={room.gallery[currentImageIndex]} 
                                    alt={`Room Image ${currentImageIndex + 1}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-full object-cover" 
                                />
                            </AnimatePresence>

                            {/* Navigation Arrows */}
                            {room.gallery.length > 1 && (
                                <>
                                    <button 
                                        onClick={(e) => { e.preventDefault(); prevImage(); }}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white text-slate-800 transition opacity-0 group-hover:opacity-100 focus:opacity-100 z-10 shadow-lg"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button 
                                        onClick={(e) => { e.preventDefault(); nextImage(); }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white text-slate-800 transition opacity-0 group-hover:opacity-100 focus:opacity-100 z-10 shadow-lg"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </>
                            )}

                            {/* Top Actions */}
                            <div className="absolute top-4 right-4 flex gap-2 z-10">
                                <button className="p-2 bg-white/80 rounded-full hover:bg-white text-slate-700 transition shadow-sm"><Share2 className="w-5 h-5" /></button>
                                <button className="p-2 bg-white/80 rounded-full hover:bg-white text-red-500 transition shadow-sm"><Heart className="w-5 h-5" /></button>
                            </div>

                             {/* Image Counter */}
                            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm z-10">
                                {currentImageIndex + 1} / {room.gallery.length}
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-2 p-2 overflow-x-auto bg-white border-t border-slate-100">
                            {room.gallery.map((img, i) => (
                                <button 
                                    key={i}
                                    onClick={() => setCurrentImageIndex(i)} 
                                    className={`relative h-20 w-28 flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200 ${
                                        i === currentImageIndex 
                                        ? 'ring-2 ring-brand-500 ring-offset-2 opacity-100' 
                                        : 'opacity-60 hover:opacity-100'
                                    }`}
                                >
                                    <img src={img} alt={`Thumb ${i}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900 mb-2">{room.title}</h1>
                                <div className="flex items-center text-slate-500">
                                    <MapPin className="w-5 h-5 mr-1 text-brand-500" /> {room.location}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold text-brand-600">
                                    {new Intl.NumberFormat('vi-VN').format(room.price)}
                                </div>
                                <div className="text-slate-400 text-sm">VNĐ / tháng</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4 mb-8 p-6 bg-slate-50 rounded-xl border border-slate-100 text-center">
                            <div>
                                <div className="text-slate-400 text-xs uppercase font-bold mb-1">Diện tích</div>
                                <div className="font-bold text-slate-800">{room.size} m²</div>
                            </div>
                            <div>
                                <div className="text-slate-400 text-xs uppercase font-bold mb-1">Phòng ngủ</div>
                                <div className="font-bold text-slate-800">{room.bedrooms}</div>
                            </div>
                            <div>
                                <div className="text-slate-400 text-xs uppercase font-bold mb-1">Loại</div>
                                <div className="font-bold text-slate-800">{room.type}</div>
                            </div>
                             <div>
                                <div className="text-slate-400 text-xs uppercase font-bold mb-1">Đánh giá</div>
                                <div className="font-bold text-slate-800 flex items-center justify-center gap-1">{room.rating} <Shield className="w-3 h-3 text-green-500" /></div>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold mb-4">Mô tả chi tiết</h3>
                        <p className="text-slate-600 leading-relaxed mb-8">{room.description}</p>

                        <h3 className="text-xl font-bold mb-4">Tiện ích có sẵn</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                            {room.amenities.map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-slate-700">
                                    <div className="w-6 h-6 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center">
                                        <Check className="w-3 h-3" />
                                    </div>
                                    {item}
                                </div>
                            ))}
                        </div>

                        {/* Map Section */}
                        <div className="mt-8 pt-8 border-t border-slate-100">
                            <h3 className="text-xl font-bold mb-4">Vị trí & Di chuyển</h3>
                            <div className="w-full h-80 bg-slate-100 rounded-2xl overflow-hidden relative mb-4 shadow-inner">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    scrolling="no"
                                    marginHeight={0}
                                    marginWidth={0}
                                    src={`https://maps.google.com/maps?q=${room.coordinates.lat},${room.coordinates.lng}&hl=vi&z=15&output=embed`}
                                    title="Vị trí phòng trọ"
                                    className="filter grayscale hover:grayscale-0 transition-all duration-500"
                                ></iframe>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                                <div className="text-slate-500 text-sm">
                                    <p><span className="font-bold text-slate-700">Địa chỉ chính xác:</span> {room.location}</p>
                                </div>
                                <a 
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${room.coordinates.lat},${room.coordinates.lng}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-brand-50 text-brand-700 px-6 py-3 rounded-xl font-bold hover:bg-brand-100 transition-all shadow-sm w-full md:w-auto justify-center"
                                >
                                    <Navigation className="w-5 h-5" /> Chỉ đường trên Google Maps
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Sticky Contact */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-xl border border-brand-100">
                            <h3 className="font-bold text-lg mb-4">Thông tin chủ nhà</h3>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
                                    <User className="w-6 h-6 text-slate-500" />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900">Ban Quản Lý VIHOME</div>
                                    <div className="text-xs text-green-600 font-bold flex items-center gap-1">
                                        <Shield className="w-3 h-3" /> Đã xác thực
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={() => setShowContactModal(true)}
                                className="w-full bg-brand-600 text-white py-3 rounded-xl font-bold mb-3 hover:bg-brand-700 transition"
                            >
                                Liên hệ xem phòng
                            </button>
                            <button className="w-full bg-white border-2 border-brand-600 text-brand-600 py-3 rounded-xl font-bold hover:bg-brand-50 transition">
                                Nhắn tin Zalo
                            </button>
                        </div>
                        
                        <div className="bg-slate-800 text-white rounded-2xl p-6">
                             <h4 className="font-bold mb-2">Ưu đãi đặc biệt</h4>
                             <p className="text-sm text-slate-300 mb-4">Giảm ngay 500k cho tháng đầu tiên nếu check-in trước ngày 30/10.</p>
                             <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                                 <div className="bg-yellow-400 w-2/3 h-full"></div>
                             </div>
                             <div className="text-xs text-right mt-1 text-yellow-400">Chỉ còn 3 suất</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Rooms Section */}
            {relatedRooms.length > 0 && (
                <div className="border-t border-slate-200 pt-16">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8">Có thể bạn cũng thích</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {relatedRooms.map(room => (
                            <RoomCard key={room.id} room={room} />
                        ))}
                    </div>
                </div>
            )}
        </div>

        {/* Contact Modal */}
        <AnimatePresence>
            {showContactModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={() => setShowContactModal(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative"
                    >
                        <button 
                            onClick={() => setShowContactModal(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 p-2 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="text-center mb-8 pt-4">
                            <div className="w-24 h-24 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
                                <User className="w-10 h-10 text-brand-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-1">Ban Quản Lý VIHOME</h3>
                            <div className="flex items-center justify-center gap-1 text-green-600 font-medium text-sm">
                                <Shield className="w-4 h-4 fill-current" />
                                Đã xác minh danh tính
                            </div>
                        </div>

                        <div className="space-y-4">
                            <a href="tel:19001234" className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 hover:border-brand-200 transition-all group">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform shadow-sm">
                                    <Phone className="w-5 h-5 fill-current" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gọi điện ngay</div>
                                    <div className="text-lg font-bold text-slate-800 group-hover:text-brand-600 transition-colors">1900 1234</div>
                                </div>
                            </a>

                            <a href="#" className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 hover:border-brand-200 transition-all group">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform shadow-sm">
                                    <MessageCircle className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Chat Zalo</div>
                                    <div className="text-lg font-bold text-slate-800 group-hover:text-brand-600 transition-colors">0912 345 678</div>
                                </div>
                            </a>
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                            <p className="text-xs text-slate-500">
                                Để đảm bảo an toàn, vui lòng liên hệ qua các kênh chính thức của VIHOME PLUS.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
  );
};

export default RoomDetail;