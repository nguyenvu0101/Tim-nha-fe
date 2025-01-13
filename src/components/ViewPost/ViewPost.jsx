import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewPost.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const ViewPost = () => {
  const [provinces, setProvinces] = useState([]); // Danh sách tỉnh
  const [selectedProvince, setSelectedProvince] = useState(null); // Tỉnh đã chọn
  const [districts, setDistricts] = useState([]);
  const [edit, setEdit] = useState({});
  const [currentImages, setCurrentImages] = useState({});
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem('id');
  const token = localStorage.getItem('token');

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
  useEffect(() => {
    if (edit && Object.keys(edit).length > 0) {
      setFormData({
        province: edit.province || '',
        district: edit.district || '',
        address: edit.address || '',
        description: edit.description || '',
        area: edit.area || '',
        price: edit.price || '',
        numBedrooms: edit.numBedrooms || '',
        numBathrooms: edit.numBathrooms || '',
        amenities: {
          dieu_hoa: edit.amenities?.dieu_hoa || false,
          nong_lanh: edit.amenities?.nong_lanh || false,
          may_giat: edit.amenities?.may_giat || false,
          free_time: edit.amenities?.free_time || false,
          gac_xep: edit.amenities?.gac_xep || false,
          tu_lanh: edit.amenities?.tu_lanh || false,
          security: edit.amenities?.security || false,
          thang_may: edit.amenities?.thang_may || false,
          chung_chu: edit.amenities?.chung_chu || false,
        },
        images: edit.images || [],
      });
    }
  }, [edit]);

  const { postid } = useParams();
  // Fetch dữ liệu bài đăng để chỉnh sửa
  console.log(postid);
  // Cập nhật dữ liệu form

  useEffect(() => {
    // Gọi API lấy thông tin bài đăng
    axios
      .get(`http://localhost:3003/post/view/${postid}`)
      .then((response) => {
        console.log(response.data);
        setEdit(response.data);
        setCurrentImages(response.data.images?.[0] || null);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy thông tin bài đăng:', error);
      });
  }, [postid]);

  useEffect(() => {
    // Gọi API lấy thông tin bài đăng
    axios
      .get('http://localhost:3003/post/list')
      .then((response) => {
        console.log(response.data);
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy thông tin bài đăng:', error);
      });
  }, [postid]); // Khi postid thay đổi, sẽ gọi lại API
  const filteredPosts = posts.filter((post) => post._id !== postid);

  const handleImageClick = (image) => {
    setCurrentImages(image);
  };

  return (
    <div className="form-post-container ">
      <div className="anh-chinh">
        <div className="anh-chinh-1">
          <div>
            <div className="view-main-image">
              <a href={currentImages} rel="noopener noreferrer">
                <img
                  src={currentImages || 'default_image_url'} // Sử dụng ảnh lớn của từng bài đăng
                  alt="Main"
                  width="600"
                  height="400"
                  style={{ margin: '10px' }}
                />
              </a>
            </div>
            <div className="view-thumbnail-images" style={{ display: 'flex' }}>
              {edit.images?.map((image, index) => (
                <div
                  key={index}
                  onClick={() => handleImageClick(image)} // Thay đổi ảnh chính khi click
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index}`}
                    width="100px"
                    height="100px"
                    style={{
                      borderRadius: '5px',
                      margin: '5px',
                      border: '1px solid #ddd',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="view-location">
            <label>Địa chỉ </label>
            <br></br>
            {edit.address},{edit.district},{edit.province}
          </div>
          <div className="chi-tiet-phong">
            <div className="gia-dientich">
              <div className="view-price">
                <label>Giá</label>
                {edit.price} triệu/tháng
              </div>
              <div className="view-area">
                <label>Diện Tích</label>
                {edit.area} m²
              </div>
            </div>

            <div className="ngu-tam">
              <div className="view-numBedrooms">
                <label>Số Phòng Ngủ</label>
                {edit.numBedrooms}
              </div>

              <div className="view-numBathrooms">
                <label>Số Phòng Tắm</label>
                {edit.numBathrooms}
              </div>
            </div>
          </div>
          <div className="view-description">
            <label>Mô Tả</label>
            <br></br>
            <pre>{edit.description}</pre>           
          </div>

          <div className="view-noi-bat">
            <div className="tieu-de">
              <label>Nổi Bật</label>
            </div>
            <div className="view-cac-tien-ich">
              <div className="view-1">
                <div>
                  <input
                    type="checkbox"
                    name="dieu_hoa"
                    checked={formData.amenities.dieu_hoa}
                  />
                  <label>Điều hòa</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="nong_lanh"
                    checked={formData.amenities.nong_lanh}
                  />
                  <label>Nóng lạnh</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="chung_chu"
                    checked={formData.amenities.chung_chu}
                  />
                  <label>Chung chủ</label>
                </div>
              </div>
              <div className="view-2">
                <div>
                  <input
                    type="checkbox"
                    name="free_time"
                    checked={formData.amenities.free_time}
                  />
                  <label>Giờ giấc tự do</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="gac_xep"
                    checked={formData.amenities.gac_xep}
                  />
                  <label>Có gác xép</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="may_giat"
                    checked={formData.amenities.may_giat}
                  />
                  <label>Máy giặt</label>
                </div>
              </div>
              <div className="view-3">
                <div>
                  <input
                    type="checkbox"
                    name="security"
                    checked={formData.amenities.security}
                  />
                  <label>Bảo vệ 24/7</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="thang_may"
                    checked={formData.amenities.thang_may}
                  />
                  <label>Thang máy</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="tu_lanh"
                    checked={formData.amenities.tu_lanh}
                  />
                  <label>Tủ lạnh</label>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="luu-huy">
          <div className="save-edit">
            <button className="submit" type="submit">
              Lưu
            </button>
          </div>
          <div className="huy-edit" onClick={() => navigate(`/home/${userId}`)}>
            <a>Huỷ</a>
          </div>
        </div> */}
        </div>
      </div>

      <div className="anh-phu">
        {filteredPosts.map((post) => (
          <div key={post._id} className="post-item-anh-phu">
            <div>
              <div className="main-image-anh-phu">
                <a href={`/view-post/${post._id}`}>
                  <img
                    src={currentImages[post._id] || post.images[0]} // Sử dụng ảnh lớn của từng bài đăng
                    alt="Main"
                    width="400"
                    height="300"
                    
                  />
                </a>
              </div>
            </div>
            <p className="address-phu">
              <strong style={{ fontWeight: '750' }}>Địa chỉ:</strong>{' '}
              {post.address},{post.district},{post.province}
            </p>
            <p className="area-phu">
              <strong style={{ fontWeight: '750' }}>Diện tích:</strong>{' '}
              {post.area} m²
            </p>
            <p className="price-phu">
              <strong style={{ fontWeight: '750' }}>Giá:</strong> {post.price}{' '}
              triệu/tháng
            </p>
            {/* <p style={{ fontWeight: '750' }}>Thông tin mô tả</p>
                      <h3>{post.description}</h3> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewPost;
