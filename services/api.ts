import { Room, BlogPost, Testimonial } from '../types';

// Mock Data
const ROOMS: Room[] = [
  {
    id: '1',
    title: 'VIHOME Studio Hiện Đại - Cầu Giấy',
    price: 4500000,
    location: 'Cầu Giấy, Hà Nội',
    size: 25,
    bedrooms: 1,
    bathrooms: 1,
    available: true,
    image: 'https://picsum.photos/id/10/800/600',
    gallery: ['https://picsum.photos/id/10/800/600', 'https://picsum.photos/id/11/800/600', 'https://picsum.photos/id/12/800/600'],
    amenities: ['Wifi', 'Điều hòa', 'Nóng lạnh', 'Máy giặt chung', 'Thang máy', 'Khóa vân tay'],
    description: 'Căn hộ Studio đầy đủ tiện nghi, thiết kế hiện đại, ban công thoáng mát. Vị trí trung tâm gần các trường đại học lớn.',
    type: 'Studio',
    rating: 4.8,
    coordinates: { lat: 21.03, lng: 105.78 },
    nearby: {
      shopping: 'Gần IPH, Discovery Complex, Chợ Nhà Xanh',
      universities: 'ĐH Quốc Gia, Sư Phạm, Báo Chí, Thương Mại',
      transportation: 'Gần Bến xe Mỹ Đình, trạm xe bus, Metro Nhổn'
    }
  },
  {
    id: '2',
    title: 'Căn Hộ Duplex Sang Trọng - Quận 3',
    price: 8500000,
    location: 'Quận 3, TP.HCM',
    size: 40,
    bedrooms: 1,
    bathrooms: 1,
    available: true,
    image: 'https://picsum.photos/id/14/800/600',
    gallery: ['https://picsum.photos/id/14/800/600', 'https://picsum.photos/id/15/800/600'],
    amenities: ['Wifi tốc độ cao', 'Full nội thất', 'Bếp riêng', 'An ninh 24/7', 'Hầm để xe'],
    description: 'Căn hộ Duplex trần cao, không gian mở sang trọng. Thích hợp cho cặp đôi hoặc người đi làm cần không gian yên tĩnh.',
    type: 'Duplex',
    rating: 4.9,
    coordinates: { lat: 10.77, lng: 106.69 },
    nearby: {
        shopping: 'Gần Chợ Bến Thành, Vincom Center',
        universities: 'ĐH Kinh Tế, Kiến Trúc, Mở',
        transportation: 'Gần Ga Sài Gòn, trạm xe bus trung tâm'
      }
  },
  {
    id: '3',
    title: 'Phòng Trọ Giá Rẻ - Thanh Xuân',
    price: 3200000,
    location: 'Thanh Xuân, Hà Nội',
    size: 20,
    bedrooms: 1,
    bathrooms: 1,
    available: false,
    image: 'https://picsum.photos/id/16/800/600',
    gallery: ['https://picsum.photos/id/16/800/600'],
    amenities: ['Wifi', 'Điều hòa', 'Chỗ để xe'],
    description: 'Phòng trọ sạch sẽ, an ninh tốt, giờ giấc tự do. Gần chợ và bến xe buýt.',
    type: '1 Ngủ',
    rating: 4.2,
    coordinates: { lat: 20.99, lng: 105.80 },
    nearby: {
        shopping: 'Gần Royal City, Big C Thăng Long',
        universities: 'ĐH Khoa học Tự nhiên, Xã hội Nhân văn',
        transportation: 'Gần đường vành đai 3, trạm xe bus'
      }
  },
  {
    id: '4',
    title: 'Căn Hộ Mini 2 Ngủ - Bình Thạnh',
    price: 6500000,
    location: 'Bình Thạnh, TP.HCM',
    size: 50,
    bedrooms: 2,
    bathrooms: 1,
    available: true,
    image: 'https://picsum.photos/id/18/800/600',
    gallery: ['https://picsum.photos/id/18/800/600', 'https://picsum.photos/id/19/800/600'],
    amenities: ['Tủ lạnh', 'Máy giặt riêng', 'Sofa', 'Ban công rộng'],
    description: 'Căn hộ 2 phòng ngủ rộng rãi, view Landmark 81. Tiện ích tòa nhà đầy đủ.',
    type: '2 Ngủ',
    rating: 4.7,
    coordinates: { lat: 10.80, lng: 106.71 },
    nearby: {
        shopping: 'Gần Chợ Bà Chiểu, Vincom Plaza, Emart',
        universities: 'ĐH Hutech, UEF, Ngoại Thương, GTVT',
        transportation: 'Gần Bến xe Miền Đông, trạm xe bus, sân bay TSN'
    }
  },
  {
    id: '5',
    title: 'Studio Vintage - Đống Đa',
    price: 5000000,
    location: 'Đống Đa, Hà Nội',
    size: 30,
    bedrooms: 1,
    bathrooms: 1,
    available: true,
    image: 'https://picsum.photos/id/20/800/600',
    gallery: ['https://picsum.photos/id/20/800/600'],
    amenities: ['Decor đẹp', 'Nhiều ánh sáng', 'Bếp từ'],
    description: 'Phong cách vintage ấm cúng, ngay mặt hồ Xã Đàn. Không gian cực chill.',
    type: 'Studio',
    rating: 4.6,
    coordinates: { lat: 21.01, lng: 105.82 },
    nearby: {
        shopping: 'Gần Vincom Phạm Ngọc Thạch, Chợ Thái Hà',
        universities: 'ĐH Công Đoàn, Thủy Lợi, Y Hà Nội',
        transportation: 'Gần ga Cát Linh, trạm xe bus'
      }
  }
];

const BLOGS: BlogPost[] = [
  {
    id: '1',
    title: 'Kinh nghiệm tìm phòng trọ cho sinh viên năm nhất',
    excerpt: 'Những điều cần lưu ý để tránh bị lừa đảo và tìm được phòng ưng ý giá tốt.',
    image: 'https://picsum.photos/id/42/400/300',
    date: '20/05/2024',
    author: 'Minh Tuấn',
    content: `
      <p>Việc tìm phòng trọ là một trong những thử thách đầu tiên mà tân sinh viên phải đối mặt khi bắt đầu cuộc sống xa nhà. Để giúp các bạn tránh bỡ ngỡ và tìm được nơi ở ưng ý, dưới đây là một số kinh nghiệm quan trọng:</p>
      
      <h3>1. Xác định khu vực và ngân sách</h3>
      <p>Trước khi đi tìm phòng, bạn cần xác định rõ mình muốn ở khu vực nào (gần trường, gần bến xe buýt, an ninh tốt...) và khả năng tài chính của gia đình. Hãy tính toán cả chi phí điện, nước, internet và phí dịch vụ khác.</p>

      <h3>2. Tìm kiếm thông tin từ nhiều nguồn</h3>
      <p>Đừng chỉ dựa vào một nguồn tin. Hãy tham khảo trên các trang web uy tín, hội nhóm sinh viên trên Facebook, hoặc hỏi trực tiếp các anh chị khóa trên. Ứng dụng như <strong>VIHOME PLUS</strong> là một lựa chọn tuyệt vời để tìm kiếm phòng trọ đã được xác thực.</p>

      <h3>3. Kiểm tra thực tế phòng trọ</h3>
      <p>Hình ảnh trên mạng có thể khác xa thực tế. Hãy đến tận nơi để kiểm tra:
      <ul>
        <li>Tình trạng phòng: Tường có ẩm mốc không? Nhà vệ sinh có sạch sẽ?</li>
        <li>An ninh: Khu vực xung quanh có an toàn không? Có camera giám sát không?</li>
        <li>Tiện ích: Nguồn nước, sóng điện thoại, chỗ phơi đồ...</li>
      </ul>
      </p>

      <h3>4. Đọc kỹ hợp đồng trước khi đặt cọc</h3>
      <p>Đây là bước quan trọng nhất để tránh bị lừa đảo. Hợp đồng cần ghi rõ giá thuê, tiền cọc, giá điện nước, thời hạn thuê và các điều khoản đền bù.</p>
    `
  },
  {
    id: '2',
    title: '5 Cách trang trí phòng trọ nhỏ trở nên rộng rãi',
    excerpt: 'Mẹo decor giúp không gian sống của bạn thoáng đãng và tiện nghi hơn.',
    image: 'https://picsum.photos/id/43/400/300',
    date: '18/05/2024',
    author: 'Lan Anh',
    content: `
      <p>Sống trong một không gian nhỏ không có nghĩa là bạn phải chịu cảnh chật chội. Với vài mẹo trang trí thông minh, bạn có thể biến phòng trọ nhỏ hẹp thành không gian sống lý tưởng.</p>

      <h3>1. Sử dụng gam màu sáng</h3>
      <p>Màu trắng, kem hoặc pastel nhẹ nhàng giúp phản chiếu ánh sáng tốt hơn, tạo cảm giác không gian rộng mở hơn so với diện tích thực.</p>

      <h3>2. Tận dụng không gian chiều dọc</h3>
      <p>Sử dụng kệ treo tường, giá sách cao sát trần để lưu trữ đồ đạc. Điều này giúp giải phóng diện tích sàn nhà.</p>

      <h3>3. Sử dụng gương</h3>
      <p>Một chiếc gương lớn không chỉ để soi mà còn tạo ảo giác về chiều sâu, nhân đôi không gian căn phòng.</p>
    `
  },
  {
    id: '3',
    title: 'Quy định mới về đăng ký tạm trú 2024',
    excerpt: 'Cập nhật những thay đổi quan trọng trong luật cư trú mà người thuê nhà cần biết.',
    image: 'https://picsum.photos/id/44/400/300',
    date: '15/05/2024',
    author: 'Luật sư Hùng',
    content: `
      <p>Theo Luật Cư trú mới nhất, việc đăng ký tạm trú là nghĩa vụ bắt buộc đối với công dân sinh sống ngoài nơi đăng ký thường trú từ 30 ngày trở lên.</p>
      
      <h3>Thủ tục đăng ký tạm trú online</h3>
      <p>Hiện nay, bạn có thể thực hiện đăng ký tạm trú ngay trên Cổng Dịch vụ công Quốc gia mà không cần ra trực tiếp công an phường.</p>
      
      <h3>Hồ sơ cần chuẩn bị:</h3>
      <ul>
        <li>Tờ khai thay đổi thông tin cư trú.</li>
        <li>Giấy tờ chứng minh chỗ ở hợp pháp (Hợp đồng thuê nhà).</li>
        <li>CCCD/CMND.</li>
      </ul>
    `
  }
];

export const getRooms = async (): Promise<Room[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(ROOMS), 500);
  });
};

export const getRoomById = async (id: string): Promise<Room | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(ROOMS.find(r => r.id === id)), 300);
  });
};

export const getRelatedRooms = async (currentId: string): Promise<Room[]> => {
  return new Promise((resolve) => {
    // Simulate finding related rooms (excluding current)
    const related = ROOMS.filter(r => r.id !== currentId).slice(0, 3);
    setTimeout(() => resolve(related), 400);
  });
};

export const getBlogs = async (): Promise<BlogPost[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(BLOGS), 500);
    });
}

export const getBlogById = async (id: string): Promise<BlogPost | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(BLOGS.find(b => b.id === id)), 300);
    });
}

export const submitContact = async (data: any): Promise<boolean> => {
  console.log("Sending to CRM...", data);
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 1000);
  });
};