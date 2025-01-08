import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]); // Lưu trữ dữ liệu từ API
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [postsPerPage] = useState(6); // Số bài đăng mỗi trang

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

    return (
    console.log('a')
  );
};

export default PostList;
