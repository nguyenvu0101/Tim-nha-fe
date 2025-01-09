import React, { useState } from 'react';
import Header from '../Header/Header';
import PostList from '../PostList/PostList';
const Location = () => {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  // Hàm xử lý khi tỉnh/thành phố thay đổi
  const handleProvinceChange = (provinceId) => {
    setSelectedProvince(provinceId);
    setSelectedDistrict(null); // Reset huyện/quận khi tỉnh thay đổi
  };

  // Hàm xử lý khi huyện/quận thay đổi
  const handleDistrictChange = (districtId) => {
    setSelectedDistrict(districtId);
  };

  return (
    <div>
      <Header
        selectedProvince={selectedProvince}
        onProvinceChange={handleProvinceChange} // Truyền vào Header
        onDistrictChange={handleDistrictChange} // Truyền vào Header
      />
      <PostList province={selectedProvince} district={selectedDistrict} />
    </div>
  );
};
export default Location;
