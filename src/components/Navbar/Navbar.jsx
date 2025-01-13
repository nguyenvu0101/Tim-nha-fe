import React, { useState, useEffect } from 'react';
import './Navbar.css';
import axios from 'axios';
import LogoutModal from '../ModalLogout/ModalLogout';
import PostList from '../PostList/PostList';
const Navbar = () => {
  const [provinces, setProvinces] = useState([]); // Danh sách tỉnh
  const [selectedProvince, setSelectedProvince] = useState(null); // Tỉnh đã chọn
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [districts, setDistricts] = useState([]); // Quận huyện
  const [userName, setUserName] = useState(''); // Tên người dùng
  const [userEmail, setUserEmail] = useState(''); // Email người dùng
  const [showModal, setShowModal] = useState(false); // Trạng thái để hiển thị modal
 const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');

  const id = localStorage.getItem('id')

  // Hàm hiển thị modal
  const handleLogoutClick = () => {
    
    setShowModal(true);
  };

  // Hàm đóng modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Hàm xử lý xác nhận đăng xuất
  const handleLogoutConfirm = () => {
    console.log('Đã đăng xuất!');
    // Xử lý đăng xuất
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('id');
    setShowModal(false);
  };
  
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    if (storedUsername) {
      setUserName(storedUsername);
    }
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    axios
      .get('https://provinces.open-api.vn/api/?depth=2')
      .then((response) => setProvinces(response.data))
      .catch((error) => console.error('Error fetching provinces:', error));
  }, []);
  // Xử lý thay đổi tỉnh/thành phố
  useEffect(() => {
      if (selectedProvince) {
        const selectedProvinceData = provinces.find(
          (province) => province.code === Number(selectedProvince)
        );
        setDistricts(selectedProvinceData?.districts || []); // Cập nhật danh sách huyện
      } else {
        setDistricts([]); // Xóa danh sách huyện nếu không có tỉnh nào được chọn
      }
    }, [selectedProvince, provinces]);
     
    
      
    const handleProvinceChange = (event) => {
      const provinceId = event.target.value;
  
      // Lấy thông tin tỉnh dựa trên provinceId
      const selectedProvinceData = provinces.find(
        (province) => province.code === Number(provinceId)
      );
  
      if (selectedProvinceData) {
        setSelectedProvince(provinceId); // Lưu ID vào state
        setProvince(selectedProvinceData.name);
        setSelectedDistrict(''); // Reset huyện khi tỉnh thay đổi
        setDistrict(''); // Reset district về null khi province thay đổi
      }
     
    };
  
    const handleDistrictChange = (event) => {
      const districtId = event.target.value;
  
      // Lấy thông tin huyện dựa trên districtId
      const selectedDistrictData = districts.find(
        (district) => district.code === Number(districtId)
      );
  
      if (selectedDistrictData) {
        setSelectedDistrict(districtId); // Lưu ID vào state
        setDistrict(selectedDistrictData.name);
        
      }
    };

  // Xử lý đổi mật khẩu


  return (
    <>
      <nav className="header">
        <div className="header-left">
          {/* Ô Trang chủ */}
          <h1 className="home-btn">
            <a href={`http://localhost:3000/home/${id}`}>Trang Chủ</a>
          </h1>

          {/* Dropdown Tìm Tỉnh/Thành Phố */}
          <select
            className="dropdown"
            onChange={handleProvinceChange}
            value={selectedProvince || ''}
          >
            <option value="">Chọn Tỉnh / Thành Phố</option>
            {provinces.map((province) => (
              <option key={province.code} value={province.code}>
                {province.name}
              </option>
            ))}
          </select>

          {/* Dropdown Tìm Huyện/Quận */}
          <select
            className="dropdown"
            disabled={!selectedProvince}
            value={selectedDistrict || ''}
            onChange={handleDistrictChange}
          >
            <option value="">Chọn Quận / Huyện</option>
            {districts.map((district) => (
              <option key={district.code} value={district.code}>
                {district.name}
              </option>
            ))}
          </select>

          {/* Ô Input Tìm Kiếm */}
          <input
            type="text"
            placeholder="Nhập từ khóa tìm kiếm"
            className="search-input"
          />

          {/* Nút Tìm */}
          <button className="search-btn">Tìm</button>
        </div>

        <div className="header-right">
          <>
            {/* Hiển thị tên người dùng */}
            <p className="user-name">
              <a href={`/information/${id}`}>Xin chào {userName}</a>
            </p>

            {/* Nút Đăng Xuất */}
            <button className="nav-btn" onClick={handleLogoutClick}>
              Đăng Xuất
            </button>
            <LogoutModal
              show={showModal}
              onClose={closeModal}
              onConfirm={handleLogoutConfirm}
            />
          </>

          {/* Nút Đăng Tin */}
          <button className="nav-btn post-btn">
            <a href={`http://localhost:3000/post/${id}`}>Đăng Tin</a>
          </button>
        </div>
      </nav>
      <div className="post-list-header">
        <PostList province={province} district={district} />
      </div>
    </>
  );
};

export default Navbar;
