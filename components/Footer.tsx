import React from 'react';
import { Home, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-2xl mb-4">
                <Home className="w-8 h-8 text-brand-500" />
                <span>VIHOME PLUS</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Hệ thống tìm kiếm và quản lý nhà trọ số 1 Việt Nam. Mang đến không gian sống tiện nghi, an toàn cho cộng đồng.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-brand-500 transition">Trang chủ</a></li>
              <li><a href="#" className="hover:text-brand-500 transition">Tìm phòng</a></li>
              <li><a href="#" className="hover:text-brand-500 transition">Tin tức</a></li>
              <li><a href="#" className="hover:text-brand-500 transition">Liên hệ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Hỗ trợ</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-brand-500 transition">Trung tâm trợ giúp</a></li>
              <li><a href="#" className="hover:text-brand-500 transition">Quy định chung</a></li>
              <li><a href="#" className="hover:text-brand-500 transition">Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:text-brand-500 transition">Giải quyết khiếu nại</a></li>
            </ul>
          </div>

           <div>
            <h4 className="text-white font-bold mb-4">Tải ứng dụng</h4>
            <p className="text-xs mb-4">Trải nghiệm tốt hơn trên thiết bị di động.</p>
            <div className="flex gap-2">
               <div className="w-32 h-10 bg-slate-800 rounded flex items-center justify-center text-xs font-bold border border-slate-700 cursor-pointer hover:bg-slate-700">App Store</div>
               <div className="w-32 h-10 bg-slate-800 rounded flex items-center justify-center text-xs font-bold border border-slate-700 cursor-pointer hover:bg-slate-700">Google Play</div>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs text-slate-500">
          © 2024 VIHOME PLUS. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;