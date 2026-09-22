import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/users/profile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          localStorage.removeItem("token");
          throw new Error(data.message || "Authentication failed");
        }

        setUser(data.user);
      } catch (error) {
        setError(error.message);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    getProfile();

  }, [navigate]);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try{
        await fetch (
            `${API_URL}/auth/logout`,
            {
                method: "POST",
                headers: {
                    Authorizaiton:  `Bearer ${token}`
                }
            }
        );

    }catch(error){
    console.error("Logout error:", error)
  }

  localStorage.removeItem("token");

  navigate("/login");

  if (loading) {
    return <div className="loading">Loading dashboard.....</div>;
  }


  return (
    <div className="dashboard">
      <header>
        <div>
          <h1>User Dashboard</h1>
          <p>Welcome back!</p>
        </div>

        <button className="logout-button" onSubmit={handleLogout}>Logout</button>
      </header>

      <main>
        {error && <div className="error">{error}</div>}

        {user && (
          <>
            <div className="welcome-card">
              <h2>Hello, {user.name}</h2>

              <p>Welcome to your Dashboard</p>
            </div>

            <div className="profile-card">
              <h2>Profile Information</h2>
              <div className="profile-item">
                <strong>Name:</strong>
                <span>{user.name}</span>
              </div>

              <div className="profile-item">
                <strong>Email:</strong>
                <span>{user.email}</span>
              </div>

              <div className="profile-item">
                <strong>Role:</strong>
                <span>{user.role}</span>
              </div>

              <div className="profile-item">
                <strong>User ID:</strong>
                <span>{user._id}</span>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
}

export default Dashboard;
