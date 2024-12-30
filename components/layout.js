import Navbar from './navbar';
import Footer from './footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-main text-primary relative">
      <Navbar />
      <main className="flex-1 container-padding pb-0">
        {children}
      </main>
      <Footer />
    </div>
  );
}
