import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './PostList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { PostContext } from '../../PostContext';
const PostList = ({ province, district, keyword }) => {
  const [posts, setPosts] = useState([]); // Lưu trữ dữ liệu từ API
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const itemsPerPage = 4;
  const [currentImages, setCurrentImages] = useState({}); // Lưu trữ ảnh lớn cho từng bài đăng
  const [revealedPostId, setRevealedPostId] = useState(null); // Lưu trữ ID bài đăng được hiển thị số
  const { postStatusMap } = useContext(PostContext); // Sử dụng Context
  console.log(district);
  console.log(province);
  console.log(keyword);
  console.log(postStatusMap);
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

  const handleRevealClick = (postId) => {
    // Nếu bài đăng đang được hiển thị thì ẩn đi, ngược lại hiển thị
    setRevealedPostId((prevId) => (prevId === postId ? null : postId));
  };
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
      setLoading(true);
      try {
        let params = {};

        // Thêm giá trị vào params nếu có province hoặc district
        if (province) {
          params.province = province;
        }

        if (district) {
          params.district = district;
        }

        // Nếu có province hoặc district, gọi API với các tham số
        let response;

        if (province || district) {
          response = await axios.get(
            'http://localhost:3003/post/filter-location-post',
            {
              params,
            }
          );
        } else {
          // Nếu không có province và district, gọi API tất cả các bài đăng
          response = await axios.get('http://localhost:3003/post/list');
        }

        // Kiểm tra nếu không có keyword
        if (!keyword || keyword.trim() === '') {
          // Trường hợp không có keyword: hiển thị toàn bộ bài đăng
          setPosts(response.data);
          console.log('Hiển thị toàn bộ bài đăng:', response.data);
        } else {
          // Trường hợp có keyword: lọc các bài đăng chứa keyword
          const filteredPosts = response.data.filter((post) => {
            return (
              (post.address &&
                post.address.toLowerCase().includes(keyword.toLowerCase())) ||
              (post.province &&
                post.province.toLowerCase().includes(keyword.toLowerCase())) ||
              (post.district &&
                post.district.toLowerCase().includes(keyword.toLowerCase()))
            );
          });

          // Cập nhật danh sách bài đăng phù hợp
          setPosts(filteredPosts);
          console.log('Danh sách bài đăng phù hợp với keyword:', filteredPosts);
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách bài đăng:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts(); // Gọi hàm khi province, district hoặc keyword thay đổi
  }, [province, district, keyword]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  // Tính toán các trang hiển thị và nhóm trang
  const pagesToShow = 4; // Hiển thị tối đa 4 trang mỗi lần
  const totalPages = Math.ceil(posts.length / itemsPerPage); // Tổng số trang

  const startPage =
    Math.floor((currentPage - 1) / pagesToShow) * pagesToShow + 1; // Tính trang bắt đầu
  const endPage = Math.min(startPage + pagesToShow - 1, totalPages); // Tính trang kết thúc

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
              <div
                key={post._id}
                className={`post-item ${postStatusMap[post._id] === 'Đang liên hệ' ? 'overlay' : ''}`}
              >
                {/* Hiển thị chữ "Đang liên hệ" */}
                {postStatusMap[post._id] === 'Đang liên hệ' && (
                  <div className="contacting-label">Đang liên hệ</div>
                )}

                <div>
                  <div className="main-image">
                    <a
                      href={`http://localhost:3000/view-post/${post._id}`}
                      style={{
                        pointerEvents:
                          postStatusMap[post._id] === 'Đang liên hệ'
                            ? 'none'
                            : 'auto',
                      }}
                    >
                      <img
                        src={currentImages[post._id] || post.images[0]} // Sử dụng ảnh lớn của từng bài đăng
                        alt="Main"
                        width="300"
                        height="300"
                        style={{ margin: '10px' }}
                      />
                    </a>
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
                  <strong style={{ fontWeight: '750' }}>Địa chỉ:</strong>{' '}
                  {post.address},{post.district},{post.province}
                </p>
                <p className="area">
                  <strong style={{ fontWeight: '750' }}>Diện tích:</strong>{' '}
                  {post.area} m²
                </p>
                <p className="price">
                  <strong style={{ fontWeight: '750' }}>Giá:</strong>{' '}
                  {post.price} triệu/tháng
                </p>

                <button className="phone">
                  <div className="icon-phone">
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                  <div onClick={() => handleRevealClick(post._id)}>
                    {revealedPostId === post._id ? post.contact : 'Hiện số'}
                  </div>
                </button>
              </div>
            ))}
            <div className="paginate-post">
              <nav>
                <ul className="pagination-post">
                  <li className="page-item-post">
                    <button
                      className="page-link-post"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                  </li>
                  {/* Các nút trang */}
                  {Array.from(
                    { length: endPage - startPage + 1 },
                    (_, index) => startPage + index
                  ).map((page) => (
                    <li
                      key={page}
                      className={`page-item-post ${currentPage === page ? 'active' : ''}`}
                    >
                      <button
                        className="page-link-post"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    </li>
                  ))}
                  <li className="page-item-post">
                    <button
                      className="page-link-post"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostList;
