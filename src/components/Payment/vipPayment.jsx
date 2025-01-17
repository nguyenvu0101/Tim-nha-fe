import React, { useState , useContext } from 'react';
import axios from 'axios';
import './Payment.css';
import { PostContext } from '../../PostContext';
function PaymentVip() {
  const [amount, setAmount] = useState('200000');
  const [orderInfo, setOrderInfo] = useState('');
    const [paymentUrl, setPaymentUrl] = useState('');
     const userId = localStorage.getItem('id');
    const { membershipLevel } = useContext(PostContext);
  const handlePayment = async () => {
    if (!orderInfo || orderInfo.trim() === '') {
      alert('Thông tin đơn hàng không được để trống!');
      return; // Dừng hàm nếu thông tin đơn hàng trống
    }
    console.log(orderInfo);
      console.log(amount);
      console.log(membershipLevel);
      console.log(userId);
    try {
      const response = await axios.post(
        'http://localhost:3003/payment/create-payment',
        {
          amount,
          orderInfo,
          userId,
          membershipLevel,
        }
      );
      console.log(response.data);
      if (response.data.payUrl) {
        setPaymentUrl(response.data.payUrl);
        window.location.href = response.data.payUrl;
      } else {
        alert('Thanh toán thất bại');
      }
    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra!');
    }
  };

  return (
    <div className="payment-container" style={{ padding: '20px' }}>
      <h1>Thanh toán MoMo</h1>
      <div className="price-don-hang">
        <label className="payment-label-1">Số tiền:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          readOnly // Ngăn người dùng sửa giá trị (nếu cần)
          style={{ cursor: 'not-allowed' }} // Hiển thị con trỏ không thể chỉnh sửa
        />
      </div>
      <div className="infor-don-hang">
        <label className="payment-label-2">Thông tin đơn hàng:</label>
        <input
          type="text"
          value={orderInfo}
          onChange={(e) => setOrderInfo(e.target.value)}
          placeholder="Nhập tên tài khoản hoặc email"
        />
      </div>
      <button className="button-payment" onClick={handlePayment}>
        Thanh toán
      </button>
      {paymentUrl && (
        <div className="url-thanh-toan">
          <p>URL thanh toán:</p>
          <a href={paymentUrl} target="_blank" rel="noopener noreferrer">
            {paymentUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default PaymentVip;
