import React, { useState } from 'react';
import axios from 'axios';
import './Payment.css';
function Payment() {
  const [amount, setAmount] = useState('');
  const [orderInfo, setOrderInfo] = useState('');
  const [paymentUrl, setPaymentUrl] = useState('');

  const handlePayment = async () => {
     if (!orderInfo || orderInfo.trim() === '') {
       alert('Thông tin đơn hàng không được để trống!');
       return; // Dừng hàm nếu thông tin đơn hàng trống
    }
    console.log(orderInfo);
    console.log(amount);
    try {
      const response = await axios.post(
        'http://localhost:3003/payment/create-payment',
        {
          amount,
          orderInfo,
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
          placeholder="Nhập số tiền"
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
      <button className='button-payment' onClick={handlePayment}>Thanh toán</button>
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

export default Payment;
