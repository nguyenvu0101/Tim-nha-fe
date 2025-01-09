import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PostList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const PostList = () => {
  const [posts, setPosts] = useState([]); // Lưu trữ dữ liệu từ API
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const itemsPerPage = 4;
  const [currentImages, setCurrentImages] = useState({}); // Lưu trữ ảnh lớn cho từng bài đăng

  const priceRanges = [
    { label: 'Dưới 1 triệu', min: 0, max: 1 },
    { label: '1 - 3 triệu', min: 1, max: 3 },
    { label: '3 - 5 triệu', min: 3, max: 5 },
    { label: '5 - 10 triệu', min: 5, max: 10 },
    { label: '10 - 20 triệu', min: 10, max: 20 },
    { label: '20 - 30 triệu', min: 20, max: 30 },
    { label: 'Trên 30 triệu', min: 30, max: Infinity },
  ];
  const areaRanges = [
    { label: 'Dưới 20 m²', min: 0, max: 20 },
    { label: '20 - 30 m²', min: 20, max: 30 },
    { label: '30 - 40 m²', min: 30, max: 40 },
    { label: '40 - 50 m²', min: 40, max: 50 },
    { label: '50 - 60 m²', min: 50, max: 60 },
    { label: '60 - 70 m²', min: 60, max: 70 },
    { label: 'Trên 70 m²', min: 70, max: Infinity },
  ];

  const handleFilterPrice = async (minPrice, maxPrice) => {
    try {
      setLoading(true);
      const response = await axios.get(
        'http://localhost:3003/post/filter-price-post',
        {
          params: { minPrice, maxPrice },
        }
      );
      setPosts(response.data); // Cập nhật bài đăng
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi lọc bài đăng:', error.message);
      setLoading(false);
    }
  };
const handleFilterArea = async (minArea, maxArea) => {
  try {
    setLoading(true);
    const response = await axios.get(
      'http://localhost:3003/post/filter-area-post',
      {
        params: { minArea, maxArea },
      }
    );
    setPosts(response.data); // Cập nhật bài đăng
    setLoading(false);
  } catch (error) {
    console.error('Lỗi khi lọc bài đăng:', error.message);
    setLoading(false);
  }
};
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Gửi yêu cầu GET tới API để lấy dữ liệu
        const response = await axios.get('http://localhost:3003/post/list');
        setPosts(response.data); // Lưu dữ liệu vào state
        setLoading(false); // Thay đổi trạng thái loading
      } catch (error) {
        console.error('Lỗi khi gọi API:', error.message);
        setLoading(false); // Dừng trạng thái loading nếu có lỗi
      }
    };

    fetchPosts(); // Gọi hàm fetchPosts khi component mount
  }, []); // Chạy 1 lần khi component mount

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const displayItems = posts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleImageClick = (postId, image) => {
    setCurrentImages((prevState) => ({
      ...prevState,
      [postId]: image, // Lưu ảnh lớn cho bài đăng có _id là postId
    }));
  };

  return (
    <div className="bai-dang">
      <div className="bo-loc col-xl-2">
        <div>
          <h4>Tìm theo khoảng giá</h4>
          <div className="filter-buttons">
            {priceRanges.map((range, index) => (
              <button
                key={index}
                className="btn btn-outline-primary"
                onClick={() => handleFilterPrice(range.min, range.max)}
                style={{ margin: '5px' }}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h4>Tìm theo diện tích</h4>
          <div className="filter-buttons">
            {areaRanges.map((range, index) => (
              <button
                key={index}
                className="btn btn-outline-primary"
                onClick={() => handleFilterArea(range.min, range.max)}
                style={{ margin: '5px' }}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="post-list col-xl-10">
        {posts.length === 0 ? (
          <p>Không có bài đăng nào</p>
        ) : (
          <div className="posts col-xl-12">
            {displayItems.map((post) => (
              <div key={post._id} className="post-item">
                <div>
                  <div className="main-image">
                    <img
                      src={currentImages[post._id] || post.images[0]} // Sử dụng ảnh lớn của từng bài đăng
                      alt="Main"
                      width="300"
                      height="300"
                      style={{ margin: '10px' }}
                    />
                  </div>
                  <div
                    className="thumbnail-images"
                    style={{ display: 'flex', margin: '10px' }}
                  >
                    {post.images?.map((image, index) => (
                      <div
                        key={index}
                        onClick={() => handleImageClick(post._id, image)} // Thêm post._id vào khi click
                        style={{ cursor: 'pointer' }}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index}`}
                          width="60px"
                          height="60px"
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
                <p className="address">
                  <strong>Địa chỉ:</strong> {post.address},{post.district},
                  {post.province}
                </p>
                <p className="area">
                  <strong>Diện tích:</strong> {post.area} m²
                </p>
                <p className="price">
                  <strong>Giá:</strong> {post.price} triệu/tháng
                </p>
                <p style={{ fontWeight: '750' }}>Thông tin mô tả</p>
                <h3>{post.description}</h3>

                <button className="phone">
                  <div className="icon-phone">
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                  <div>0358387662</div>
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="paginate">
          <nav>
            <ul className="pagination">
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <FontAwesomeIcon icon={faAngleLeft} />
                </button>
              </li>
              {[...Array(Math.ceil(posts.length / itemsPerPage))].map(
                (_, index) => (
                  <li
                    key={index}
                    className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                )
              )}
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={
                    currentPage === Math.ceil(posts.length / itemsPerPage)
                  }
                >
                  <FontAwesomeIcon icon={faAngleRight} />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PostList;
