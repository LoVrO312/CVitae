import React, { useEffect } from 'react'; 
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { EditProfile } from './pages/EditProfile';
import { Authenticate } from './pages/Authenticate';
import { NotFound } from './pages/NotFound';
import { UserProvider } from './context/UserContext';
import PrivateRoute from './components/PrivateRoute';


function App() {

  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_WS_URL);

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "profileUpdated") {
            window.location.reload();
        }
    };

      return () => ws.close();
    }, []);

  return (
    <Router>
      <UserProvider>
      <Main />
      </UserProvider>
    </Router>
  );
}

function Main() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/authenticate';

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/edit-profile" element={
          <PrivateRoute adminOnly={true}>
            <EditProfile />
          </PrivateRoute>
          } />
        <Route path="/authenticate" element={<Authenticate />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;