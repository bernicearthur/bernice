import Navbar from './navbar';
import Footer from './footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-main text-primary">
      <Navbar />
      <main className="flex-1 container-padding">
        {children}
      </main>
      <Footer />
    </div>
  );
}
