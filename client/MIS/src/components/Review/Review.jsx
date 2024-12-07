import  { useState } from "react";

const ReviewPage = () => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [submittedReviews, setSubmittedReviews] = useState([]);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || description.trim() === "") {
      alert("Please provide a rating and a description.");
      return;
    }

    const newReview = {
      rating,
      description,
    };

    setSubmittedReviews([newReview, ...submittedReviews]);
    setRating(0);
    setDescription("");
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Leave a Review</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Rating</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingChange(star)}
                className={`text-2xl ${
                  star <= rating ? "text-yellow-500" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit Review
        </button>
      </form>

      <div className="mt-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Submitted Reviews</h2>
        {submittedReviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet.</p>
        ) : (
          submittedReviews.map((review, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
              <div className="flex items-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-xl ${
                      star <= review.rating
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-800">{review.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
