import React, { useState } from 'react';
import axios from 'axios';
import './SelectMembership.css'
const SelectMembership = () => {
  const [loading, setLoading] = useState(false);
    const userId = localStorage.getItem('id');
  const handleSelection = async (membershipType) => {
    setLoading(true);

    try {
      // Gửi yêu cầu API để cập nhật gói thành viên
      const response = await axios.put(
        'http://localhost:3003/user/update-membership',
        {
          userId,
          membershipType,
        }
      );

      console.log(response.data.message); // Log thông báo từ API
    } catch (error) {
      console.error('Lỗi khi cập nhật gói thành viên:', error);
      alert('Có lỗi xảy ra, vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="select-membership-container">
      <h2>Chọn Gói Thành Viên</h2>
      <div className="membership-option" onClick={() => handleSelection(1)}>
        <a
          href={`http://localhost:3000/post/${userId}`}
          className="membership-link"
        >
          <h3>Cơ Bản</h3>
          <p>Đăng 1 bài viết</p>
          <p>Miễn phí</p>
        </a>
      </div>
      <div className="membership-option" onClick={() => handleSelection(2)}>
        <a
          href={`http://localhost:3000/payment/${userId}`}
          className="membership-link"
        >
          <h3>Thành Viên Thường</h3>
          <p>Đăng tối đa 5 bài viết</p>
          <p>70.000 VNĐ</p>
        </a>
      </div>
      <div className="membership-option" onClick={() => handleSelection(3)}>
        <a
          href={`http://localhost:3000/payment/${userId}`}
          className="membership-link"
        >
          <h3>Thành Viên VIP</h3>
          <p>Đăng tối đa 20 bài</p>
          <p>200.000 VNĐ</p>
        </a>
      </div>
      {loading && <p>Đang xử lý...</p>}
    </div>
  );
};

export default SelectMembership;
