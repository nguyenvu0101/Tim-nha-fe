import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Admin.css';
import axios from 'axios';

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [visitCount, setVisitCount] = useState(35); // Giả lập số lượt truy cập
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const token = localStorage.getItem('token');
  useEffect(() => {
    // Gọi API lấy thông tin người dùng và bài đăng
    const fetchData = async () => {
      try {
        // Gọi API lấy thông tin người dùng
        const usersResponse = await axios.get(
          'http://localhost:3003/user/allUser',
          {
            headers: {
              authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setUsers(usersResponse.data);

        // Gọi API lấy thông tin bài đăng
        const postsResponse = await axios.get(
          'http://localhost:3003/post/list'
        );
        setPosts(postsResponse.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };

    fetchData(); // Gọi hàm fetchData khi component mount
  }, [token]);

  // Tính số lượng bài đăng của mỗi user
  const getPostCountByUser = (userId) => {
    return posts.filter((post) => post.userId === userId).length;
  };

  return (
    <Container>
      <h1 className="mt-4 mb-4">Thống Kê</h1>

      {/* Dashboard Cards */}
      <Row>
        <Col md={4}>
          <Card
            className="text-white bg-primary mb-4"
            style={{ height: '100px' }}
          >
            <Card.Body className="d-flex justify-content-between align-items-center">
              <h5>Người dùng</h5>
              <h1>{users.length}</h1>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card
            className="text-white bg-success mb-4"
            style={{ height: '100px' }}
          >
            <Card.Body className="d-flex justify-content-between align-items-center">
              <h5>Bài đăng</h5>
              <h1>{posts.length}</h1>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card
            className="text-white bg-warning mb-4"
            style={{ height: '100px' }}
          >
            <Card.Body className="d-flex justify-content-between align-items-center">
              <h5>Lượt truy cập</h5>
              <h1>{visitCount}</h1>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* User Table */}
      <h2 className="mt-5">Danh sách người dùng</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Số lượng bài đăng</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? 'Admin' : 'Người dùng'}</td>
              <td>{getPostCountByUser(user._id)}</td>{' '}
              {/* Hiển thị số lượng bài đăng của user */}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminDashboard;
