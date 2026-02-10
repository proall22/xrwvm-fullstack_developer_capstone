import React, { useState } from "react";
import "./Register.css";
import user_icon from "../assets/person.png"
import email_icon from "../assets/email.png"
import password_icon from "../assets/password.png"
import close_icon from "../assets/close.png"

const Register = () => {
  // State variables for form inputs
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect to home
  const gohome = () => {
    window.location.href = window.location.origin;
  }

  // Handle form submission
  const register = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic validation
    if (!userName || !password || !email || !firstName || !lastName) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    let register_url = window.location.origin + "/djangoapp/register";

    try {
      // Send POST request to register endpoint
      const res = await fetch(register_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "userName": userName,
          "password": password,
          "firstName": firstName,
          "lastName": lastName,
          "email": email
        }),
      });
      
      const json = await res.json();
      
      if (json.status === "Authenticated") {
        // Save username in session and reload home
        sessionStorage.setItem('username', json.userName);
        alert("Registration successful! Welcome " + firstName + "!");
        window.location.href = window.location.origin;
      } else if (json.error) {
        setError(json.error);
        alert(json.error);
      }
    } catch (error) {
      setError("Registration failed. Please try again.");
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register_container" style={{
      width: "50%", 
      margin: "50px auto", 
      padding: "30px", 
      backgroundColor: "white", 
      borderRadius: "10px", 
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
    }}>
      <div className="header" style={{
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "space-between",
        marginBottom: "20px",
        alignItems: "center"
      }}>
        <span className="text" style={{
          flexGrow: "1", 
          fontSize: "28px", 
          fontWeight: "bold",
          color: "#007bff"
        }}>
          Create Account
        </span>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <a href="/" onClick={() => { gohome() }} style={{ textDecoration: "none" }}>
            <img style={{ width: "24px", height: "24px" }} src={close_icon} alt="Close" />
          </a>
        </div>
      </div>
      
      {error && (
        <div style={{
          backgroundColor: "#f8d7da",
          color: "#721c24",
          padding: "10px",
          borderRadius: "5px",
          marginBottom: "20px",
          textAlign: "center"
        }}>
          {error}
        </div>
      )}
      
      <form onSubmit={register}>
        <div className="inputs" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div className="input-field" style={{ display: "flex", alignItems: "center" }}>
            <img src={user_icon} className="img_icon" alt='Username' style={{ width: "24px", marginRight: "10px" }} />
            <input 
              type="text" 
              name="username" 
              placeholder="Username *" 
              className="input_field"
              style={{
                flex: "1",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "16px"
              }}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          
          <div className="input-field" style={{ display: "flex", alignItems: "center" }}>
            <img src={user_icon} className="img_icon" alt='First Name' style={{ width: "24px", marginRight: "10px" }} />
            <input 
              type="text" 
              name="first_name" 
              placeholder="First Name *" 
              className="input_field"
              style={{
                flex: "1",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "16px"
              }}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          
          <div className="input-field" style={{ display: "flex", alignItems: "center" }}>
            <img src={user_icon} className="img_icon" alt='Last Name' style={{ width: "24px", marginRight: "10px" }} />
            <input 
              type="text" 
              name="last_name" 
              placeholder="Last Name *" 
              className="input_field"
              style={{
                flex: "1",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "16px"
              }}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          
          <div className="input-field" style={{ display: "flex", alignItems: "center" }}>
            <img src={email_icon} className="img_icon" alt='Email' style={{ width: "24px", marginRight: "10px" }} />
            <input 
              type="email" 
              name="email" 
              placeholder="Email *" 
              className="input_field"
              style={{
                flex: "1",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "16px"
              }}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="input-field" style={{ display: "flex", alignItems: "center" }}>
            <img src={password_icon} className="img_icon" alt='Password' style={{ width: "24px", marginRight: "10px" }} />
            <input 
              name="psw" 
              type="password" 
              placeholder="Password * (min. 6 characters)" 
              className="input_field"
              style={{
                flex: "1",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "16px"
              }}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>
        </div>
        
        <div className="submit_panel" style={{ marginTop: "30px" }}>
          <button 
            className="submit" 
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: loading ? "#6c757d" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background-color 0.3s"
            }}
            onMouseOver={(e) => {
              if (!loading) e.target.style.backgroundColor = "#0056b3";
            }}
            onMouseOut={(e) => {
              if (!loading) e.target.style.backgroundColor = "#007bff";
            }}
          >
            {loading ? "Creating Account..." : "Register Now"}
          </button>
        </div>
        
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p style={{ color: "#666" }}>
            Already have an account?{" "}
            <a href="/login" style={{ color: "#007bff", textDecoration: "none", fontWeight: "bold" }}>
              Login here
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;