import React, { useEffect, useState } from 'react';
import './Header.css';
import axios from 'axios';

const Header = () => {
  const [provinces, setProvinces] = useState([]); // Danh sách tỉnh
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null); // Tỉnh đã chọn
  const [selectedDistrict, setSelectedDistrict] = useState(null); // Huyện được chọn

  useEffect(() => {
    axios
      .get('https://provinces.open-api.vn/api/?depth=2')
      .then((response) => setProvinces(response.data))
      .catch((error) => console.error('Error fetching provinces:', error));
  }, []);
  const handleProvinceChange = (event) => {
    const provinceId = event.target.value;
    setSelectedProvince(provinceId);

    const selectedProvinceData = provinces.find(
      (p) => p.code === Number(provinceId)
    );
    setDistricts(selectedProvinceData?.districts || []);
  };
const handleDistrictChange = (event) => {
  const districtId = event.target.value;
  setSelectedDistrict(districtId); // Cập nhật huyện
};

  return (
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
  );
};

export default Header;
