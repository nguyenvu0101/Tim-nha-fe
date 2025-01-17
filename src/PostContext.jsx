import React, { createContext, useState, useEffect } from 'react';

// Tạo Context
export const PostContext = createContext();

// Tạo Provider
export const PostProvider = ({ children }) => {
  const userId = localStorage.getItem('id');
  const [postStatusMap, setPostStatusMap] = useState({});
  const generateSessionId = () => {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  };

  const [membershipLevel, setMembershipLevel] = useState(() => {
    // Khôi phục `membershipLevel` từ localStorage
    const storedLevel = localStorage.getItem('membershipLevel');
    return storedLevel ? JSON.parse(storedLevel) : null;
  });
   let sessionId = localStorage.getItem('sessionId');

   if (!userId && !sessionId) {
     sessionId = generateSessionId(); // Tạo sessionId mới
     localStorage.setItem('sessionId', sessionId); // Lưu vào localStorage
   }
  // Lấy trạng thái yêu thích của người dùng từ localStorage
  const [likedPosts, setLikedPosts] = useState(() => {
    const storedLikes = localStorage.getItem('likedPosts');
    const parsedLikes = storedLikes ? JSON.parse(storedLikes) : {};
     return parsedLikes[userId] || parsedLikes[sessionId] || {}; // Trả về likedPosts cho userId cụ thể
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

      // Cập nhật lại likedPosts trong localStorage
      const allLikedPosts =
        JSON.parse(localStorage.getItem('likedPosts')) || {};
      allLikedPosts[userId || sessionId] = updatedLikes; // Lưu danh sách yêu thích theo userId
      localStorage.setItem('likedPosts', JSON.stringify(allLikedPosts));

      return updatedLikes;
    });
  };

 useEffect(() => {
   // Đồng bộ lại trạng thái vào localStorage khi `likedPosts` thay đổi
   const allLikedPosts = JSON.parse(localStorage.getItem('likedPosts')) || {};
   allLikedPosts[userId || sessionId] = likedPosts;
   localStorage.setItem('likedPosts', JSON.stringify(allLikedPosts));
 }, [likedPosts, userId, sessionId]);


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
  useEffect(() => {
    // Lưu `membershipLevel` vào localStorage khi thay đổi
    if (membershipLevel !== null) {
      localStorage.setItem('membershipLevel', JSON.stringify(membershipLevel));
    }
  }, [membershipLevel]);
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
        membershipLevel,
        setMembershipLevel,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
