import React, { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Products.css"; // Import the CSS file for styling
import pro1 from "./assets/product1.jpg";
import pro2 from "./assets/product2.png";
import pro3 from "./assets/product3.png";
import pro4 from "./assets/product4.png";

const Products = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserName(userSnap.data().name);
        } else {
          console.log("No user data found!");
        }
      } else {
        console.log("No user is logged in");
      }
    };

    fetchUserName();
  }, []);

  const handleLogout = () => {
    auth.signOut()
      .then(() => navigate("/"))
      .catch((error) => console.error("Error signing out: ", error));
  };

  return (
    <div>
      {/* Ribbon with Welcome message */}
      <div className="ribbon">
        <span className="welcome-message">Welcome, {userName || "User"} 👦🏻</span>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      {/* Dummy Product List */}
      <div className="products123">
        <div className="product-card123">
          <img src= {pro1} alt="Product 1" />
          <h3>Product 1</h3>
          <p>₹1000</p>
          <button onClick={() => navigate('/product-detail1')}>View Details</button>
        </div>
        <div className="product-card123">
          <img src={pro2} alt="Product 2" />
          <h3>Product 2</h3>
          <p>₹3000</p>
          <button onClick={() => navigate('/product-detail2')}>View Details</button>
        </div>
        <div className="product-card123">
          <img src={pro3} alt="Product 3" />
          <h3>Product 3</h3>
          <p>₹2000</p>
          <button onClick={() => navigate('/product-detail3')}>View Details</button>
        </div>
        <div className="product-card123">
          <img src={pro4} alt="Product 4" />
          <h3>Product 4</h3>
          <p>₹2500</p>
          <button onClick={() => navigate('/product-detail4')}>View Details</button>
        </div>
      </div>
    </div>
  );
};

export default Products;
