import React, { useEffect, useState } from 'react';
import './Header.css';
import axios from 'axios';

const Header = () => {
  const [provinces, setProvinces] = useState([]); // Danh sách tỉnh
  const [selectedProvince, setSelectedProvince] = useState(null); // Tỉnh đã chọn
  const [districts, setDistricts] = useState([]);

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
  return (
    <header className="header">
      <div className="header-left">
        {/* Ô Trang chủ */}
        <h1 className="home-btn">Trang Chủ</h1>

        {/* Dropdown Tìm Tỉnh/Thành Phố */}
        <select className="dropdown" onChange={handleProvinceChange}>
          <option value="">Chọn Tỉnh / Thành Phố</option>
          {provinces.map((province) => (
            <option key={province.code} value={province.code}>
              {province.name}
            </option>
          ))}
        </select>

        {/* Dropdown Tìm Huyện/Quận */}
        <select className="dropdown" disabled={!selectedProvince}>
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
