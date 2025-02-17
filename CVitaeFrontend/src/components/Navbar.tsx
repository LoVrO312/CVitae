import React from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/authenticate");
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
  ];

  if (user && user.role === "admin") {
    navigation.push({ name: 'Edit Profile', href: '/edit-profile' });
  }

  const token = localStorage.getItem("token");

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Code2 className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">CVitae</span>
            </Link>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  location.pathname === item.href
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                {item.name}
              </Link>
            ))}
            {token ? (
              <button
                onClick={handleSignOut}
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Sign out
              </button>
            ) : (
              <Link
                to="/authenticate"
                className={`${
                  location.pathname === "/authenticate"
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Sign in
              </Link>
            )}
          </div>

          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  location.pathname === item.href
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {token ? (
              <button
                onClick={() => {
                  handleSignOut();
                  setIsOpen(false);
                }}
                className="w-full text-left border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Sign out
              </button>
            ) : (
              <Link
                to="/authenticate"
                className={`${
                  location.pathname === "/authenticate"
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                onClick={() => setIsOpen(false)}
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}