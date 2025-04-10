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
    contact:'',
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
  const userId = localStorage.getItem('id');
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
    const reader = new FileReader();

    reader.onload = (event) => {
      const base64Image = event.target.result; // Chuỗi Base64
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, base64Image], // Lưu Base64 vào state
      }));
    };

    Array.from(files).forEach((file) => reader.readAsDataURL(file));
  };

  const handleRemoveImage = (event, index) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: updatedImages,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('id');
    // Dữ liệu cần gửi
    const dataToSubmit = {
      userId,
      ...formData, // Bao gồm tất cả các dữ liệu từ formData
    };

    // Chuyển đổi đối tượng thành chuỗi JSON
    const jsonData = JSON.stringify(dataToSubmit);

    // In ra chuỗi JSON để kiểm tra
    console.log('Đã chuyển dữ liệu sang json');
    try {
      // Gửi dữ liệu đến backend bằng async/await
      const response = await axios.post(
        `http://localhost:3003/post/${userId}`,
        jsonData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Xử lý phản hồi khi gửi thành công
      console.log('Dữ liệu đã được gửi thành công:', response.data);
      alert('Dữ liệu đã được gửi thành công!');
      navigate(`/home/${userId}`);
    } catch (error) {
  
      alert('Bạn đã nhập sai định dạng hoặc số bài đăng của bạn đã đạt giới hạn');
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
          <label>Tỉnh/Thành Phố</label>
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
          <label>Quận/Huyện</label>
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
          <label>Địa chỉ</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Nhập địa chỉ cụ thể , ví dụ nhà A , ngõ/ngách B , xã/phường C"
          />
        </div>

        <div className="description">
          <label>Mô Tả</label>
          <textarea
            className="text-area"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Mô tả chi tiết"
          />
        </div>

        <div className="area">
          <label>Diện Tích (m²)</label>
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleInputChange}
            placeholder="Nhập diện tích"
          />
        </div>

        <div className="price">
          <label>Giá (triệu)</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Nhập giá thuê"
          />
        </div>

        <div className="numBedrooms">
          <label>Số Phòng Ngủ</label>
          <input
            type="text"
            name="numBedrooms"
            value={formData.numBedrooms}
            onChange={handleInputChange}
            placeholder="Nhập số phòng ngủ"
          />
        </div>

        <div className="numBathrooms">
          <label>Số Phòng Tắm</label>
          <input
            type="text"
            name="numBathrooms"
            value={formData.numBathrooms}
            onChange={handleInputChange}
            placeholder="Nhập số phòng tắm"
          />
        </div>
        <div className="contact">
          <label>Liên hệ</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            placeholder="Nhập SĐT"
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
                  <div
                    key={index}
                    style={{
                      position: 'relative',
                      display: 'inline-block',
                      margin: '5px',
                    }}
                  >
                    <img
                      src={image}
                      alt={`Preview ${index}`}
                      width="100"
                      height="100"
                      style={{ borderRadius: '5px', border: '1px solid #ddd' }}
                    />
                    <button
                      type="button" // Đảm bảo không gửi form
                      style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        background: 'red',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        width: '20px',
                        height: '20px',
                        fontSize: '12px',
                      }}
                      onClick={(event) => handleRemoveImage(event, index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="luu-huy">
          <div className="save-edit">
            <button className="submit" type="submit">
              Đăng
            </button>
          </div>
          <div className="huy-edit" onClick={() => navigate(`/home/${userId}`)}>
            <a>Huỷ</a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Post;
