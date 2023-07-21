import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <>
      <Navbar />

      <div style={{ minHeight: "80vh" }}> {children} </div>

      <Footer />
    </>
  );
}

export default Layout;
