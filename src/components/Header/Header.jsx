import React, { useEffect, useState } from 'react';
import './Header.css';
import axios from 'axios';
import PostList from '../PostList/PostList';

const Header = () => {
  const [provinces, setProvinces] = useState([]); // Danh sách tỉnh
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  useEffect(() => {
    axios
      .get('https://provinces.open-api.vn/api/?depth=2')
      .then((response) => setProvinces(response.data))
      .catch((error) => console.error('Error fetching provinces:', error));
  }, []);
  // Load danh sách huyện khi tỉnh thay đổi
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
  
  return (
    <>
    <header className="header">
      <div className="header-left">
        {/* Ô Trang chủ */}
        <h1 className="home-btn">
          <a href="http://localhost:3000">Trang Chủ</a>
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
        {/* Nút Đăng Nhập */}
        <button className="nav-btn">
          <a href="/login">Đăng Nhập</a>
        </button>

        {/* Nút Đăng Ký */}
        <button className="nav-btn">
          <a href="/register">Đăng Ký</a>
        </button>

        {/* Nút Đăng Tin */}
        <button className="nav-btn post-btn">
          <a href="/login">Đăng Tin</a>
        </button>
      </div>
      </header>
      <div className='post-list-header'>
        <PostList
        province={province}
        district={district}
      />
      </div>
        
    </>
  );
};

export default Header;
