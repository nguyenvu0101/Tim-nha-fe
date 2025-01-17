import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import Home from './pages/Home/Home.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import HomeUser from './pages/HomeUser/HomeUser.jsx';
import Post from './components/Post/Post.jsx';
import EditPost from './components/EditPost/EditPost.jsx';
import PostList from './components/PostList/PostList.jsx'
import ViewPost from './components/ViewPost/ViewPost.jsx'
import InformationUser from './components/InformationUser/InformationUser.jsx';
import AdminDashboard from './Admin/Admin.jsx';
import { PostContext, PostProvider } from './PostContext.jsx';
import PaymentPage from './components/Payment/Payment.jsx';
import PaymentVip from './components/Payment/vipPayment.jsx';
import SelectMembership from './components/SelectMembership/SelectMembership.jsx';

function App() {
  return (
    <PostProvider>
      <Router>
        <div className="App">
          <Routes>
            
            <Route
              path="/select-membership/:id"
              element={<SelectMembership />}
            />
            <Route path="/payment/:id/vip" element={<PaymentVip />} />
            <Route path="/payment/:id/normal" element={<PaymentPage />} />
            <Route path="/admin/:id" element={<AdminDashboard />} />
            <Route path="/view-post/:postid" element={<ViewPost />} />
            <Route path="/edit-post/:postid" element={<EditPost />} />
            <Route path="/information/:id" element={<InformationUser />} />
            <Route path="/post-list" element={<PostList />} />
            <Route path="/post" element={<Post />} />
            <Route path="/home/:id" element={<HomeUser />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </PostProvider>
  );
}

export default App;
