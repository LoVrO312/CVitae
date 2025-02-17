import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../api/authApi';

export function Authenticate() {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      // login logic
      try { 
        const response = await login(formData.email, formData.password);
        setMessage(response.message);
        localStorage.setItem('token', response.token);
        navigate('/');
      } catch (error) {
        if (error instanceof Error) {
          setMessage(error.message);
        } else {
          setMessage('An unknown error occurred');
        }
      }
    }
    // register logic
    else {
      if (formData.password !== formData.confirmPassword) {
        setMessage('Passwords do not match');
        return;
      }
      try {
        const response = await register(formData.email, formData.password, formData.confirmPassword);
        setMessage(response.message);
        localStorage.setItem('token', response.token);
        navigate('/');
      } catch (error) {
        if (error instanceof Error) {
          setMessage(error.message);
        } else {
          setMessage('An unknown error occurred');
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8">{isLogin ? 'Login' : 'Register'}</h1>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Confirm Password */}
            {!isLogin && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            >
              {isLogin ? 'Login' : 'Register'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-indigo-600 hover:text-indigo-700"
              >
                {isLogin ? 'Register' : 'Login'}
              </button>
            </p>
          </div>

          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </div>
      </div>
    </div>
  );
}
