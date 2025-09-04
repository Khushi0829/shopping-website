import React, { useState } from "react";
import "./AuthModal.css";

const AuthModal = ({ onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>{isLogin ? "Login" : "Register"}</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLogin();
          }}
        >
          {!isLogin && (
            <>
              <input type="text" placeholder="Full Name" required />
              <input type="tel" placeholder="Phone Number" required />
            </>
          )}
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>

        <p>
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)} className="switch-link">
            {isLogin ? "Register here" : "Login here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
