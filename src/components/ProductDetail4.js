import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import Sentiment from "sentiment";
import pro4 from "./assets/product4.png";
import "./ProductDetail1.css";

const ProductDetail1 = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [sentimentCounts, setSentimentCounts] = useState({
    positive: 0,
    neutral: 0,
    negative: 0,
  });
  const sentiment = new Sentiment();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "product4Reviews"),
      (snapshot) => {
        const reviewsData = snapshot.docs.map((doc) => doc.data());
        setReviews(reviewsData);
        updateSentimentCounts(reviewsData);
      }
    );

    return () => unsubscribe();
  }, []);

  const updateSentimentCounts = (reviewsData) => {
    const counts = { positive: 0, neutral: 0, negative: 0 };
    reviewsData.forEach((review) => {
      const result = sentiment.analyze(review.text);
      if (result.score > 0) counts.positive += 1;
      else if (result.score < 0) counts.negative += 1;
      else counts.neutral += 1;
    });
    setSentimentCounts(counts);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (reviewText.trim() === "") return;

    try {
      await addDoc(collection(db, "product4Reviews"), { text: reviewText });
      setReviewText("");
    } catch (error) {
      console.error("Error adding review: ", error);
    }
  };

  const overallSentiment = () => {
    const total =
      sentimentCounts.positive +
      sentimentCounts.neutral +
      sentimentCounts.negative;
    if (total === 0) return "No reviews yet";
    if (
      sentimentCounts.positive >= sentimentCounts.neutral &&
      sentimentCounts.positive >= sentimentCounts.negative
    )
      return "Overall Positive";
    if (
      sentimentCounts.negative >= sentimentCounts.positive &&
      sentimentCounts.negative >= sentimentCounts.neutral
    )
      return "Overall Negative";
    return "Overall Neutral";
  };

  return (
    <div className="product-detail-container">
      <div className="product-card12">
        <img
          src={pro4}
          alt="Product 4"
          className="product-image"
        />
        <h2 className="product-name">Product 4</h2>
        <p className="product-price">Price: ₹2500</p>
      </div>

      <hr className="separator-line" />

      <div className="reviews-section12">
        <div className="review-header12">
          <h3>Reviews</h3>
          <br></br>
          <div className="sentiment-summary12">
            <span className="overall-sentiment12">{overallSentiment()}</span>
            <span className="sentiment-counts">
              Positive: <span className="positive">{sentimentCounts.positive}</span>, Neutral: <span className="neutral">{sentimentCounts.neutral}</span>, Negative: <span className="negative">{sentimentCounts.negative}</span>
            </span>
          </div>
        </div>

        <ul className="reviews-list">
          {reviews.map((review, index) => {
            const result = sentiment.analyze(review.text);
            const sentimentClass =
              result.score > 0
                ? "positive"
                : result.score < 0
                ? "negative"
                : "neutral";

            return (
              <li key={index} className="review-item" >

                <span>{review.text}</span>
                
                <span className={`sentiment-tag ${sentimentClass}`}>
                  {result.score > 0
                    ? "Positive"
                    : result.score < 0
                    ? "Negative"
                    : "Neutral"}
                </span>
              </li>
            );
          })}
        </ul>

        <form onSubmit={handleReviewSubmit} className="review-form">
          <input
            type="text"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here..."
            className="review-input"
          />
          <button type="submit" className="submit-review-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetail1;
