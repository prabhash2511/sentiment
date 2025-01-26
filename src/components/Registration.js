import React, { useState } from "react";
import { auth, db } from "../firebaseConfig"; // Import auth and db
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"; // Functions for saving user data in Firestore
import './form.css';


const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
      });

      console.log("User registered successfully:", user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (









    <div class="cont123">

      {/* <h2>Register</h2> */}

      <form class="form" onSubmit={handleRegister}>
      <p class="form-title">Register</p>


      <div class="input-container">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        </div>


        <div class="input-container">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
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


        <button class="submit" type="submit">Register</button>
        <p>
        Already have an account? <a href="/login">Login here</a>
      </p>
      {error && <p>{error}</p>}

      </form>
     
    </div>


  );
};

export default Registration;
