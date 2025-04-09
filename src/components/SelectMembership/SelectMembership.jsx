import React, { useState ,useContext} from 'react';
import axios from 'axios';
import './SelectMembership.css'
import { PostContext } from '../../PostContext';
import { Header } from 'antd/es/layout/layout';
import { useNavigate } from 'react-router-dom';
const SelectMembership = () => {
  const [loading, setLoading] = useState(false);
  const { setMembershipLevel } = useContext(PostContext);
  const userId = localStorage.getItem('id');
  const token = localStorage.getItem('token');
const navigate = useNavigate();
  const handleSelection = async (membershipLevel) => {
    // setLoading(true);

    // try {
    //   // Gửi yêu cầu API để cập nhật gói thành viên
    //   const response = await axios.put(
    //     'http://localhost:3003/user/update-membership',
    //     {
    //       userId,
    //       membershipType,
    //     }
    //   );
    //   console.log('oke');
    //   console.log(response.data.message); // Log thông báo từ API
    // } catch (error) {
    //   console.error('Lỗi khi cập nhật gói thành viên:', error);
    //   alert('Có lỗi xảy ra, vui lòng thử lại!');
    // } finally {
    //   setLoading(false);
    // }
     setMembershipLevel(membershipLevel);
    console.log(membershipLevel);
  };
  const existMember = async () => {
   setLoading(true);
   try {
    //  // Lấy thông tin thành viên từ database
     const userResponse = await axios.get(
       `http://localhost:3003/user/info/${userId}`,
       {
         headers: {
           authorization: `Bearer ${token}`,
           'Content-Type': 'application/json',
         },
       }
     );
     console.log(userResponse.data);
     const userMembership = userResponse.data.membership;

     // Lấy số lượng bài đăng của người dùng
     const postsResponse = await axios.get(
       'http://localhost:3003/post/list'
     );
     const postCount = postsResponse.data.filter(
       (post) => post.userId === userId
     ).length;

     console.log(postsResponse.data.length);
     console.log(postCount);
     // Kiểm tra quyền đăng bài
     if (
       (userMembership === 0 && postCount < 1) ||
       (userMembership === 1 && postCount < 5) ||
       (userMembership === 2 && postCount < 20)
     ) {
       alert('Bạn có thể tiếp tục đăng bài.');
       navigate('/post');
     } else {
       alert('Bạn đã đạt đến giới hạn đăng bài đăng tối đa cho phép.');
     }
   } catch (error) {
     console.error('Lỗi khi kiểm tra thành viên:', error);
     alert('Có lỗi xảy ra khi kiểm tra thành viên.', error);
   } finally {
     setLoading(false);
   }
  };
  return (
    <div className="select-membership-container">
      <h2>Chọn Gói Thành Viên</h2>
      <div className="membership-option" onClick={() => handleSelection(0)}>
        <a href={'http://localhost:3000/post'} className="membership-link">
          <h3>Cơ Bản</h3>
          <p>Đăng 1 bài viết</p>
          <p>Miễn phí</p>
        </a>
      </div>
      <div className="membership-option" onClick={() => handleSelection(1)}>
        <a
          href={`http://localhost:3000/payment/${userId}/normal`}
          className="membership-link"
        >
          <h3>Thành Viên Thường</h3>
          <p>Đăng tối đa 5 bài viết</p>
          <p>70.000 VNĐ</p>
        </a>
      </div>
      <div className="membership-option" onClick={() => handleSelection(2)}>
        <a
          href={`http://localhost:3000/payment/${userId}/vip`}
          className="membership-link"
        >
          <h3>Thành Viên VIP</h3>
          <p>Đăng tối đa 20 bài</p>
          <p>200.000 VNĐ</p>
        </a>
      </div>
      <div className="membership-option" onClick={() => existMember()}>
        <h5>Đã đăng kí thành viên</h5>
      </div>
      {loading && <p>Đang xử lý...</p>}
    
    </div>
  );
};

export default SelectMembership;
