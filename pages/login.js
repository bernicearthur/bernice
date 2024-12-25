import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Here you would typically make an API call to authenticate
      // For demo purposes, we'll use a simple check
      if (email === 'bernice.arthur@example.com' && password === 'admin') {
        // Redirect to CMS dashboard for Bernice
        router.push('/dashboard');
      } else {
        // For demo purposes, consider any other valid email as a member
        if (email.includes('@') && password.length >= 6) {
          // Redirect to home page for members
          router.push('/');
        } else {
          throw new Error('Invalid credentials');
        }
      }
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-main">
      <Navbar />
      
      <motion.div 
        className="max-w-md mx-auto px-4 py-12 my-16"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="card p-8 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-3xl font-bold text-center text-primary mb-8">Welcome Back</h2>
          
          {error && (
            <motion.div 
              className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-main"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-secondary mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-main"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              className="w-full bg-accent hover:bg-accent-hover text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </motion.button>

            <div className="text-center mt-4">
              <span className="text-secondary">Don't have an account? </span>
              <Link 
                href="/register" 
                className="text-accent hover:text-accent-hover font-medium transition-colors duration-300"
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}
