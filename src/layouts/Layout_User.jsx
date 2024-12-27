import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import Navbar from '../components/Navbar/Navbar.jsx';
function Layout_User({ children }) {
  return (
    <div className="layout-user">
      <Navbar />
      <main className="home-user-content">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout_User;
