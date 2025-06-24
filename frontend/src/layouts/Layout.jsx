
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="container py-4">{children}</main>
      <Footer />
    </>
  );
}

export default Layout;