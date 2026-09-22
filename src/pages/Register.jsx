import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL


function Register(){

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
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

        setMessage("");
        setError("");
        setLoading(true)

        try{
            const response = await fetch(
                `${API_URL}/auth/register`,
                {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    }, 
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.message)
            }
        
        setMessage("Registration successful");

        setFormData({
            name: "",
            email: "",
            password: ""
        });

        setTimeout(() => {
            navigate("/login")
        }, 1000)
        //Kingsley
        //kingsley@gmail.com
        //,,,,
        }catch(error){
            setError(error.message);
        }finally {
            setLoading(false)
        }
    }

    return(
        <div className="auth-container">
            <div className="auth-card">
                <h1>Create Account</h1>
                <p className="subtitle">
                    Register a new account
                </p>

                {message && (
                    <div className='success'> 
                        {message}
                    </div>
                )}

                {error && (
                    <div className='error'> 
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label> Name</label>
                        <input type="text" name="name"  value={formData.name} onChange={handleChange} required/>
                    </div>

                     <div className="form-group">
                        <label> email</label>
                        <input type="email" name='email' value={formData.email} onChange={handleChange} required/>
                    </div>

                     <div className="form-group">
                        <label> Password</label>
                        <input type="password" name='password' value={formData.password} onChange={handleChange} minLength="5" required />
                    </div>

                    <button type='submit' disabled={loading}>
                        {loading ? "Creating account": "Register"}
                    </button>
                </form>

                <p className='switch-auth'>
                    Already have and account" {" "} 
                    <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    )

}

export default Register;