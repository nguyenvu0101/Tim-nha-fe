import React from 'react';
import './DeletePost.css';
const DeletePost = ({ showmodal, Close, Confirm }) => {
  if (!showmodal) return null;
  const id = localStorage.getItem('id');
  return (
    <div className="xoa-bai">
      <div className="xoa-bai-dang">
        <h3>Bạn có chắc muốn xóa bài viết ?</h3>
        <div className="dong-y">
          <button onClick={Confirm}>
            <a href={`/information/${id}`}>Đồng ý</a>
          </button>
          <button onClick={Close}>Hủy</button>
        </div>
      </div>
    </div>
  );
};

export default DeletePost;
