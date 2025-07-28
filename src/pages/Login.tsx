import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockApi } from "../services/api";
import "../styles/Login.scss";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await mockApi.login(formData.email, formData.password);

      // Store token in localStorage
      localStorage.setItem("auth_token", response?.token);
      localStorage.setItem("user", JSON.stringify(response?.user));

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Left Section - Logo and Illustration */}
      <div className="login-left">
        <div className="logo-section">
          <div className="logo">
            <img src="/logo.svg" alt="Lendsqr" className="logo-img" />
          </div>
        </div>
        <div className="illustration-section">
          <div className="pablo-sign-in"></div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="login-right">
        <div className="login-form-container">
          {/* Mobile Logo */}
          <div className="mobile-logo">
            <img src="/logo.svg" alt="Lendsqr" className="mobile-logo-img" />
          </div>

          <div className="welcome-section">
            <h1 className="welcome-title">Welcome!</h1>
            <p className="welcome-subtitle">Enter details to login.</p>
            <div className="reviewer-notice">
              <p>
                <strong>For Reviewers:</strong> Use{" "}
                <code>admin@lendsqr.com</code> / <code>password</code>
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label
                htmlFor="email"
                className="form-label"
                style={{ display: "none" }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Email"
                required
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="password"
                className="form-label"
                style={{ display: "none" }}
              >
                Password
              </label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-input password-input"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  SHOW
                </button>
              </div>
            </div>

            <div className="form-group">
              <a href="#" className="forgot-password">
                FORGOT PASSWORD?
              </a>
            </div>

            <button
              type="submit"
              className={`login-button ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "LOGGING IN..." : "LOG IN"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
