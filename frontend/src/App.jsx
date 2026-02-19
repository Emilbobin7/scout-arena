import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashboardLayout from './components/DashboardLayout';
import Overview from './pages/dashboard/Overview';
import MyProfile from './pages/dashboard/MyProfile';
import MyVideos from './pages/dashboard/MyVideos';
import Achievements from './pages/dashboard/Achievements';
import Analytics from './pages/dashboard/Analytics';
import Settings from './pages/dashboard/Settings';
import ScoutDashboard from './pages/scout/ScoutDashboard';
import ExploreAthletes from './pages/scout/ExploreAthletes';
import ScoutProfile from './pages/scout/ScoutProfile';
import ScoutLayout from './components/ScoutLayout';
import PublicProfile from './pages/PublicProfile';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

// New Social & Common pages
import Feed from './pages/Feed';
import Messages from './pages/Social/Messages';
import Notifications from './pages/Social/Notifications';
import NotFound from './pages/Common/NotFound';

// Layout component to validly use useLocation
const Layout = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/scout-dashboard') || location.pathname === '/feed';

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      {!isDashboard && <Navbar />}
      {children}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/signup" element={<Signup />} />

            {/* Feed - Protected */}
            <Route path="/feed" element={
              <PrivateRoute>
                <DashboardLayout>
                  <Feed />
                </DashboardLayout>
              </PrivateRoute>
            } />

            {/* Athlete Dashboard - Protected */}
            <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
              <Route index element={<Overview />} />
              <Route path="profile" element={<MyProfile />} />
              <Route path="videos" element={<MyVideos />} />
              <Route path="achievements" element={<Achievements />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
              <Route path="messages" element={<Messages />} />
              <Route path="notifications" element={<Notifications />} />
            </Route>

            {/* Scout Dashboard - Protected */}
            <Route
              path="/scout-dashboard"
              element={
                <PrivateRoute allowedRoles={['scout']}>
                  <ScoutLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<ScoutDashboard />} />
              <Route path="explore" element={<ExploreAthletes />} />
              <Route path="profile" element={<ScoutProfile />} />
              <Route path="messages" element={<Messages />} />
              <Route path="notifications" element={<Notifications />} />
            </Route>

            {/* Public Profile */}
            <Route path="/profile/:id" element={<PublicProfile />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
