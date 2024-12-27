import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';

function Layout_Home({ children }) {
  return (
    <div className="layout-home">
      <Header /> 
      <main className="home-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout_Home;
