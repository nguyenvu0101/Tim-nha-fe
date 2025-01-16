import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './InformationUser.css';
import { useNavigate } from 'react-router-dom';
import DeletePost from '../DeletePost/DeletePost';
import EditPost from '../EditPost/EditPost';
import { PostContext } from '../../PostContext';
const InformationUser = () => {
  const [selectedSection, setSelectedSection] = useState('userInfo'); // Lưu trạng thái của section
  const [userInfo, setUserInfo] = useState({}); // Lưu thông tin người dùng
  const [posts, setPosts] = useState([]); // Lưu bài viết
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [currentPassword, setCurrentPassword] = useState(''); // Mật khẩu hiện tại
  const [newPassword, setNewPassword] = useState(''); // Mật khẩu mới
  const [confirmPassword, setConfirmPassword] = useState(''); // Xác nhận mật khẩu
  const [message, setMessage] = useState(''); // Thông báo
  const [isAdmin, setIsAdmin] = useState(false); // Trạng thái admin
  const [show, setShow] = useState(false); // Trạng thái để hiển thị modal
  const [deletepost, setDeletePost] = useState('');
 const { postStatusMap, updatePostStatus } = useContext(PostContext); 

 
  const navigate = useNavigate();
  const id = localStorage.getItem('id');
  const token = localStorage.getItem('token');

  const statusClick = (postId) => {
    // Lấy trạng thái hiện tại của bài đăng
    const currentStatus = postStatusMap[postId] || 'Còn trống';
    const newStatus = currentStatus === 'Còn trống' ? 'Đang liên hệ' : 'Còn trống';

    updatePostStatus(postId, newStatus);
  };

  const handleDeleteClick = (postid) => {
    setShow(true);
    setDeletePost(postid);
    console.log(postid);
  };

  // Hàm đóng modal
  const closeModal = () => {
    setShow(false);
  };

  // Hàm xử lý xác nhận xoá
  const handleDeleteConfirm = async (id, idpost) => {
    try {
      // Gọi API để xóa bài viết
      const response = await axios.delete(
        `http://localhost:3003/post/delete/${id}/${idpost}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        console.log('Đã xóa bài viết');
        // Cập nhật lại danh sách bài viết sau khi xóa
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== idpost)
        );
      } else {
        console.error('Không thể xóa bài viết');
      }
    } catch (error) {
      console.error('Lỗi khi gọi API xóa:', error);
    } finally {
      // Đóng modal sau khi hoàn tất
      setShow(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Lấy bài viết
        const postsResponse = await axios.get(
          'http://localhost:3003/post/list'
        );
        setPosts(postsResponse.data); // Lưu bài viết vào state
        console.log(postsResponse.data);
        // Lấy thông tin người dùng
        console.log(id); // Kiểm tra dữ liệu bài viết
        const userResponse = await axios.get(
          `http://localhost:3003/user/info/${id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setUserInfo(userResponse.data);
        setIsAdmin(userResponse.data.isAdmin);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Gọi hàm fetchData khi component mount
  }, [id, token]); // Chạy lại khi `id` hoặc `token` thay đổi

  // Lọc các bài viết có userId trùng với id của người dùng
  const userPosts = posts.filter((post) => post.userId === String(id));

  const handleButtonClick = (section) => {
    setSelectedSection(section);
  };
  const handleClick = () => {
    navigate(`/home/${id}`); // Điều hướng đến đường dẫn mong muốn
  };
const handleStatisticsClick = () => {
  navigate(`/admin/${id}`); // Điều hướng đến trang thống kê
};
  // Xử lý đổi mật khẩu
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Mật khẩu mới và xác nhận mật khẩu không trùng khớp.');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3003/user/update/${id}`,
        { currentPassword, newPassword },
        {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setMessage(response.data.message || 'Đổi mật khẩu thành công!');
      window.location.reload();
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.'
      );
    }
  };

  return (
    <div className="information-user-container">
      <div className="left-section">
        <button className="information-user-bt" onClick={handleClick}>
          Trang Chủ
        </button>
        <button
          className="information-user-bt1"
          onClick={() => handleButtonClick('userInfo')}
        >
          Xem thông tin
        </button>
        <button
          className="information-user-bt2"
          onClick={() => handleButtonClick('posts')}
        >
          Xem danh sách bài đăng
        </button>
        <button
          className="information-user-bt3"
          onClick={() => handleButtonClick('changepw')}
        >
          Đổi mật khẩu
        </button>
        {isAdmin && (
          <button
            className="information-user-bt4"
            onClick={handleStatisticsClick}
          >
            Thống Kê
          </button>
        )}
      </div>

      <div className="right-section">
        {selectedSection === 'userInfo' && (
          <div className="user-info">
            <h3>Thông Tin Cá Nhân</h3>
            <p>
              <strong>Tên Tài Khoản :</strong> {userInfo.username}
            </p>
            <p>
              <strong>Email:</strong> {userInfo.email}
            </p>
            {/* Hiển thị thêm thông tin nếu có */}
          </div>
        )}

        {selectedSection === 'posts' && (
          <div className="posts-list">
            <h3>Danh Sách Bài Đăng</h3>
            <ul>
              {userPosts.map((post, index) => (
                <li className="bai-post" key={post._id}>
                  <div>
                    <h4>
                      <a href={`http://localhost:3000/view-post/${post._id}`}>
                        {index + 1}. {post.address}
                      </a>
                    </h4>
                  </div>
                  <div className="sua-xoa">
                    <>
                      <button
                        className="status-bai-viet"
                        onClick={() => statusClick(post._id)}
                      >
                        <a className="status-post">
                          {postStatusMap[post._id] || 'Còn trống'}
                        </a>
                      </button>
                    </>
                    <>
                      <button className="sua-bai-viet">
                        <a
                          className="edit-post"
                          href={`http://localhost:3000/edit-post/${post._id}`}
                        >
                          Sửa
                        </a>
                      </button>
                    </>

                    <>
                      <button
                        className="xoa-bai-viet"
                        onClick={() => handleDeleteClick(post._id)}
                      >
                        Xóa
                      </button>
                      <DeletePost
                        showmodal={show}
                        Close={closeModal}
                        Confirm={() => handleDeleteConfirm(id, post._id)}
                      />
                    </>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {selectedSection === 'changepw' && (
          <div className="change-password">
            <h3>Đổi Mật Khẩu</h3>
            <form onSubmit={handleChangePassword}>
              {message && <p className="message">{message}</p>}
              <div className="form-group">
                <label>Mật khẩu hiện tại:</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Mật khẩu mới:</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Xác nhận mật khẩu:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="change-password-button">
                Đổi Mật Khẩu
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default InformationUser;
