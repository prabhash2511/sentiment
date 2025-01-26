// Login.js
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom"; // Ensure this is imported
import './form.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/products"); // Redirect after successful login
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (



  //   <!-- From Uiverse.io by nathann09 --> 

  //   <form class="form">
  //      <p class="form-title">Sign in to your account</p>
  //       <div class="input-container">
  //         <input type="email" placeholder="Enter email">
  //         <span>
  //         </span>
  //     </div>

  //     <div class="input-container">
  //         <input type="password" placeholder="Enter password">
  //       </div>
  //        <button type="submit" class="submit">
  //       Sign in
  //     </button>

  //     <p class="signup-link">
  //       No account?
  //       <a href="">Sign up</a>
  //     </p>
  //  </form>

















    <div class="cont123" >
      
      {/* <h2>Login</h2> */}

      <form class="form" onSubmit={handleLogin}>
      <p class="form-title">Login</p>

  

      <div class="input-container">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <span>
        </span>
        </div>

        <div class="input-container">
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>



        <button class="submit" type="submit">Login</button>
        {error && <p>{error}</p>}

        <p>
        Don't have an account? <a href="/register">Register</a>
      </p>

      </form>
      
      
      
    </div>



  );
};

export default Login;
