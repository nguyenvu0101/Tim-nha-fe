import React, { createContext, useState, useEffect } from 'react';

// Tạo Context
export const PostContext = createContext();

// Tạo Provider
export const PostProvider = ({ children }) => {
  const [postStatusMap, setPostStatusMap] = useState({});

  // Lưu trạng thái vào localStorage mỗi khi có sự thay đổi
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
    <PostContext.Provider value={{ postStatusMap, updatePostStatus }}>
      {children}
    </PostContext.Provider>
  );
};
