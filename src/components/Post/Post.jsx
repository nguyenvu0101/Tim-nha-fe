import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Post.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Post = () => {
  const [provinces, setProvinces] = useState([]); // Danh sách tỉnh
  const [selectedProvince, setSelectedProvince] = useState(null); // Tỉnh đã chọn
  const [districts, setDistricts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    province: '',
    district: '',
    address: '',
    description: '',
    area: '',
    price: '',
    numBedrooms: '',
    numBathrooms: '',
    amenities: {
      dieu_hoa: false,
      nong_lanh: false,
      may_giat: false,
      free_time: false,
      gac_xep: false,
      tu_lanh: false,
      security: false,
      thang_may: false,
      chung_chu: false,
    },
    images: [], // Thêm trường để lưu ảnh
  });

  // Cập nhật dữ liệu form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      amenities: {
        ...formData.amenities,
        [name]: checked,
      },
    });
  };

  // Xử lý thay đổi ảnh
  const handleFileChange = (e) => {
    const files = e.target.files;
    const imagesArray = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    ); // Chuyển đổi file thành URL để hiển thị
    setFormData({
      ...formData,
      images: imagesArray,
    });
  };

 const handleSubmit = async (e) => {
   e.preventDefault();

   // Dữ liệu cần gửi
   const dataToSubmit = {
     ...formData, // Bao gồm tất cả các dữ liệu từ formData
   };

   // Chuyển đổi đối tượng thành chuỗi JSON
   const jsonData = JSON.stringify(dataToSubmit);

   // In ra chuỗi JSON để kiểm tra
   console.log('Đã chuyển dữ liệu sang json');

   try {
     // Gửi dữ liệu đến backend bằng async/await
     const response = await axios.post(
       'http://localhost:3003/post',
       jsonData,
       {
         headers: {
           'Content-Type': 'application/json', // Đảm bảo rằng server nhận dữ liệu dạng JSON
         },
       }
     );

     // Xử lý phản hồi khi gửi thành công
     console.log('Dữ liệu đã được gửi thành công:', response.data);
     alert('Dữ liệu đã được gửi thành công!');
   } catch (error) {
     // Xử lý lỗi nếu có
     alert('Có lỗi xảy ra khi gửi dữ liệu!');
   }
 };


  useEffect(() => {
    axios
      .get('https://provinces.open-api.vn/api/?depth=2')
      .then((response) => setProvinces(response.data))
      .catch((error) => console.error('Error fetching provinces:', error));
  }, []);
  // Xử lý thay đổi tỉnh/thành phố
  const handleProvinceChange = (event) => {
    const provinceId = event.target.value;
    setSelectedProvince(provinceId);

    const selectedProvinceData = provinces.find(
      (p) => p.code === Number(provinceId)
    );
    setDistricts(selectedProvinceData?.districts || []);
    setFormData((formData) => ({
      ...formData,
      province: selectedProvinceData?.name || '',
      district: '', // Reset giá trị quận/huyện
    }));
  };
  const handleDistrictChange = (event) => {
    const districtId = event.target.value;

    // Tìm huyện được chọn trong danh sách huyện
    const selectedDistrictData = districts.find(
      (district) => district.code === Number(districtId)
    );

    // Cập nhật giá trị formData
    setFormData((prevData) => ({
      ...prevData,
      district: selectedDistrictData?.name || '', // Lấy tên huyện
    }));
  };

  return (
    <div className="form-container">
      <h2>Đăng Bài</h2>
      <form onSubmit={handleSubmit}>
        <div className="province">
          <label>Tỉnh/Thành Phố:</label>
          <select
            name="province"
            onChange={(handleInputChange, handleProvinceChange)}
          >
            <option value="">Chọn tỉnh/thành phố</option>
            {provinces.map((province) => (
              <option key={province.code} value={province.code}>
                {province.name}
              </option>
            ))}
          </select>
        </div>

        <div className="district">
          <label>Quận/Huyện:</label>
          <select
            name="district"
            onChange={(handleInputChange, handleDistrictChange)}
          >
            <option value="">Chọn quận/huyện</option>
            {districts.map((district) => (
              <option key={district.code} value={district.code}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        <div className="address">
          <label>Địa chỉ:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Nhập địa chỉ cụ thể"
          />
        </div>

        <div className="description">
          <label>Mô Tả:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Mô tả chi tiết"
          />
        </div>

        <div className="area">
          <label>Diện Tích (m²):</label>
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleInputChange}
            placeholder="Nhập diện tích"
          />
        </div>

        <div className="price">
          <label>Giá (VND):</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Nhập giá thuê"
          />
        </div>

        <div className="numBedrooms">
          <label>Số Phòng Ngủ:</label>
          <input
            type="number"
            name="numBedrooms"
            value={formData.numBedrooms}
            onChange={handleInputChange}
            placeholder="Nhập số phòng ngủ"
          />
        </div>

        <div className="numBathrooms">
          <label>Số Phòng Tắm:</label>
          <input
            type="number"
            name="numBathrooms"
            value={formData.numBathrooms}
            onChange={handleInputChange}
            placeholder="Nhập số phòng tắm"
          />
        </div>

        <div className="noi-bat">
          <div className="tieu-de">
            <label>Nổi Bật</label>
          </div>
          <div className="cac-tien-ich">
            <div className="1">
              <div>
                <input
                  type="checkbox"
                  name="dieu_hoa"
                  checked={formData.amenities.dieu_hoa}
                  onChange={handleCheckboxChange}
                />
                <label>Điều hòa</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="nong_lanh"
                  checked={formData.amenities.nong_lanh}
                  onChange={handleCheckboxChange}
                />
                <label>Nóng lạnh</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="chung_chu"
                  checked={formData.amenities.chung_chu}
                  onChange={handleCheckboxChange}
                />
                <label>Chung chủ</label>
              </div>
            </div>
            <div className="2">
              <div>
                <input
                  type="checkbox"
                  name="free_time"
                  checked={formData.amenities.free_time}
                  onChange={handleCheckboxChange}
                />
                <label>Giờ giấc tự do</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="gac_xep"
                  checked={formData.amenities.gac_xep}
                  onChange={handleCheckboxChange}
                />
                <label>Có gác xép</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="may_giat"
                  checked={formData.amenities.may_giat}
                  onChange={handleCheckboxChange}
                />
                <label>Máy giặt</label>
              </div>
            </div>
            <div className="3">
              <div>
                <input
                  type="checkbox"
                  name="security"
                  checked={formData.amenities.security}
                  onChange={handleCheckboxChange}
                />
                <label>Bảo vệ 24/7</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="thang_may"
                  checked={formData.amenities.thang_may}
                  onChange={handleCheckboxChange}
                />
                <label>Thang máy</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="tu_lanh"
                  checked={formData.amenities.tu_lanh}
                  onChange={handleCheckboxChange}
                />
                <label>Tủ lạnh</label>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Ảnh */}
        <div className="img-upload">
          <label>Chọn ảnh (tối đa 5 ảnh):</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
          <div className="preview-images">
            {formData.images.length > 0 && (
              <div>
                {formData.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Preview ${index}`}
                    width="100"
                    height="100"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <button className="submit" type="submit">
          Đăng Bài
        </button>
      </form>
    </div>
  );
};

export default Post;