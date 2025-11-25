import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, MapPin, Ruler, Bed, Wifi, DollarSign } from 'lucide-react';
import { Room, FilterState } from '../types';
import { getRooms } from '../services/api';
import { Link } from 'react-router-dom';

export const RoomCard: React.FC<{ room: Room }> = ({ room }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-slate-100"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={room.image}
          alt={room.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {room.type}
        </div>
        <div className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${room.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {room.available ? 'Còn phòng' : 'Hết phòng'}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-slate-800 line-clamp-1 group-hover:text-brand-600 transition-colors">
            {room.title}
          </h3>
        </div>
        
        <div className="flex items-center text-slate-500 text-sm mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          {room.location}
        </div>

        <div className="flex gap-4 mb-4 border-y border-slate-100 py-3">
          <div className="flex items-center text-slate-600 text-sm">
            <Ruler className="w-4 h-4 mr-1 text-brand-500" /> {room.size}m²
          </div>
          <div className="flex items-center text-slate-600 text-sm">
            <Bed className="w-4 h-4 mr-1 text-brand-500" /> {room.bedrooms} ngủ
          </div>
           <div className="flex items-center text-slate-600 text-sm">
            <Wifi className="w-4 h-4 mr-1 text-brand-500" /> Free
          </div>
        </div>

        <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-brand-600">
                {new Intl.NumberFormat('vi-VN').format(room.price)}
                <span className="text-sm text-slate-400 font-normal">/tháng</span>
            </div>
            <Link to={`/room/${room.id}`} className="bg-slate-900 text-white p-2 rounded-lg hover:bg-brand-500 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </Link>
        </div>
      </div>
    </motion.div>
  );
};

const RoomList: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    keyword: '',
    minPrice: 0,
    maxPrice: 10000000,
    location: '',
    type: ''
  });

  useEffect(() => {
    getRooms().then(data => {
      setRooms(data);
      setFilteredRooms(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let result = rooms;
    if (filters.keyword) {
      const lower = filters.keyword.toLowerCase();
      result = result.filter(r => r.title.toLowerCase().includes(lower) || r.location.toLowerCase().includes(lower));
    }
    if (filters.location) {
      result = result.filter(r => r.location.includes(filters.location));
    }
    if (filters.type) {
        result = result.filter(r => r.type === filters.type);
    }
    result = result.filter(r => r.price >= filters.minPrice && r.price <= filters.maxPrice);
    setFilteredRooms(result);
  }, [filters, rooms]);

  return (
    <section id="room-list" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        
        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-6 -mt-32 relative z-20 mb-12 border border-slate-100">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative col-span-1 md:col-span-2">
                 <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Từ khóa</label>
                 <div className="flex items-center border rounded-lg px-3 py-2 bg-slate-50 focus-within:ring-2 ring-brand-200">
                    <Filter className="w-5 h-5 text-slate-400 mr-2" />
                    <input 
                        type="text" 
                        placeholder="Tìm theo khu vực, tên đường..." 
                        className="bg-transparent w-full outline-none text-slate-800 placeholder:text-slate-400"
                        value={filters.keyword}
                        onChange={(e) => setFilters({...filters, keyword: e.target.value})}
                    />
                 </div>
              </div>

              <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Khoảng giá (VNĐ)</label>
                   <div className="flex items-center border rounded-lg px-3 py-2 bg-slate-50">
                        <DollarSign className="w-5 h-5 text-slate-400 mr-1" />
                        <select 
                            className="bg-transparent w-full outline-none text-slate-800"
                            onChange={(e) => {
                                const val = e.target.value;
                                if(val === 'all') setFilters({...filters, maxPrice: 20000000});
                                else if(val === 'low') setFilters({...filters, maxPrice: 4000000});
                                else if(val === 'mid') setFilters({...filters, minPrice: 4000000, maxPrice: 7000000});
                                else setFilters({...filters, minPrice: 7000000, maxPrice: 20000000});
                            }}
                        >
                            <option value="all">Tất cả mức giá</option>
                            <option value="low">Dưới 4 triệu</option>
                            <option value="mid">4 triệu - 7 triệu</option>
                            <option value="high">Trên 7 triệu</option>
                        </select>
                   </div>
              </div>

               <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Loại phòng</label>
                   <div className="flex items-center border rounded-lg px-3 py-2 bg-slate-50">
                        <Bed className="w-5 h-5 text-slate-400 mr-1" />
                        <select 
                             className="bg-transparent w-full outline-none text-slate-800"
                             value={filters.type}
                             onChange={(e) => setFilters({...filters, type: e.target.value})}
                        >
                            <option value="">Tất cả loại phòng</option>
                            <option value="Studio">Studio</option>
                            <option value="1 Ngủ">1 Phòng Ngủ</option>
                            <option value="2 Ngủ">2 Phòng Ngủ</option>
                            <option value="Duplex">Duplex</option>
                        </select>
                   </div>
              </div>
           </div>
        </div>

        {/* Header Section */}
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Phòng Nổi Bật Dành Cho Bạn</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Chúng tôi chọn lọc những căn phòng có chất lượng tốt nhất, vị trí thuận lợi và giá cả hợp lý.</p>
        </div>

        {/* Results Grid */}
        {loading ? (
           <div className="flex justify-center py-20">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
           </div>
        ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                    {filteredRooms.map(room => (
                        <RoomCard key={room.id} room={room} />
                    ))}
                </AnimatePresence>
            </motion.div>
        )}

        {!loading && filteredRooms.length === 0 && (
            <div className="text-center py-20">
                <p className="text-xl text-slate-400">Không tìm thấy phòng phù hợp với tiêu chí của bạn.</p>
                <button 
                    onClick={() => setFilters({keyword: '', minPrice: 0, maxPrice: 10000000, location: '', type: ''})}
                    className="mt-4 text-brand-600 font-bold hover:underline"
                >
                    Xóa bộ lọc
                </button>
            </div>
        )}
        
        <div className="mt-12 text-center">
            <button className="px-8 py-3 border border-slate-300 rounded-lg font-medium text-slate-600 hover:bg-white hover:border-brand-500 hover:text-brand-500 transition-all">
                Xem thêm 50+ phòng khác
            </button>
        </div>
      </div>
    </section>
  );
};

export default RoomList;