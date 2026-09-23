import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL


function Login(){

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

   const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
        const response = await fetch(
            `${API_URL}/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            }
        );

        const data = await response.json();

        console.log("LOGIN STATUS:", response.status);
        console.log("LOGIN RESPONSE:", data);

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        // Save JWT
        localStorage.setItem("token", data.token);

        navigate("/dashboard");

    } catch (error) {
        console.error("LOGIN ERROR:", error);
        setError(error.message);
    } finally {
        setLoading(false);
    }
};

    return(
        <div className="auth-container">
            <div className="auth-card">
                <h1>Welcome Back</h1>
                <p className="subtitle">
                    Login to your account
                </p>


                {error && (
                    <div className='error'> 
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                     <div className="form-group">
                        <label> email</label>
                        <input type="email" name='email' value={formData.email} onChange={handleChange} required/>
                    </div>

                     <div className="form-group">
                        <label> Password</label>
                        <input type="password" name='password' value={formData.password} onChange={handleChange} minLength="6" required />
                    </div>

                    <button type='submit' disabled={loading}>
                        {loading ? "Logging in...": "Login"}
                    </button>
                </form>

                <p className='switch-auth'>
                    Sign Up" {" "} 
                    <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    )

}

export default Login;