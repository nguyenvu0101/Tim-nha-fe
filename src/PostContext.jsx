import React, { createContext, useState, useEffect } from 'react';

// Tạo Context
export const PostContext = createContext();

// Tạo Provider
export const PostProvider = ({ children }) => {
  const [postStatusMap, setPostStatusMap] = useState({});
  const [likedPosts, setLikedPosts] = useState(() => {
    // Khôi phục trạng thái từ localStorage khi ứng dụng khởi động
    const storedLikes = localStorage.getItem('likedPosts');
    return storedLikes ? JSON.parse(storedLikes) : {};
  });
  // Hàm toggle trạng thái yêu thích
  const toggleLike = (postId) => {
    setLikedPosts((prev) => {
      const updatedLikes = { ...prev };
      if (updatedLikes[postId]) {
        delete updatedLikes[postId]; // Xóa bài đăng khỏi danh sách yêu thích
      } else {
        updatedLikes[postId] = true; // Thêm bài đăng vào danh sách yêu thích
      }
      // Lưu trạng thái mới vào localStorage
      localStorage.setItem('likedPosts', JSON.stringify(updatedLikes));
      return updatedLikes;
    });
  };

  useEffect(() => {
    // Đồng bộ lại trạng thái vào localStorage khi `likedPosts` thay đổi
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  }, [likedPosts]);

  useEffect(() => {
    const savedPostStatus = localStorage.getItem('postStatusMap');
    if (savedPostStatus) {
      setPostStatusMap(JSON.parse(savedPostStatus));
    }
  }, []);

  useEffect(() => {
    // Lưu trạng thái bài đăng vào localStorage khi có sự thay đổi
    localStorage.setItem('postStatusMap', JSON.stringify(postStatusMap));
  }, [postStatusMap]);

  const updatePostStatus = (postId, status) => {
    setPostStatusMap((prevState) => ({
      ...prevState,
      [postId]: status,
    }));
  };

  return (
    <PostContext.Provider
      value={{
        postStatusMap,
        updatePostStatus,
        likedPosts,
        toggleLike,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
