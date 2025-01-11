import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import Home from './pages/Home/Home.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import HomeUser from './pages/HomeUser/HomeUser.jsx';
import Post from './components/Post/Post.jsx';
import PostList from './components/PostList/PostList.jsx'
import InformationUser from './components/InformationUser/InformationUser.jsx';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
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
  );
}

export default App;
