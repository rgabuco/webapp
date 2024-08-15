$(document).ready(function () {
    // Initialize and create dummy data
    createDummyData();

    // Check if a user is logged in
    const isLoggedIn = localStorage.getItem('userLoggedin');
    if (isLoggedIn) {
        // Display the 'Write a Review' form if the user is logged in
        $('#reviews').append(`
            <div id="write-review">
                <h3>Write a Review</h3>
                <form id="review-form">
                    <div>
                        <label for="review-content">Your Review:</label>
                        <textarea id="review-content" name="review-content" rows="4" required></textarea>
                    </div>
                    <div>
                        <label for="review-rating">Rating:</label>
                        <select id="review-rating" name="review-rating" required>
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                        </select>
                    </div>
                    <button type="submit">Submit Review</button>
                </form>
            </div>
        `);

        // Handle form submission
        $('#review-form').on('submit', function (event) {
            event.preventDefault();

            const reviewContent = $('#review-content').val();
            const reviewRating = $('#review-rating').val();
            const userName = localStorage.getItem('userLoggedinName');

            // Append the new review to the reviews section
            $('.reviews-grid').append(`
                <div class="review">
                    <div class="review-content">
                        <h3>${userName}</h3>
                        <div class="review-rating">
                            ${'&#9733;'.repeat(reviewRating)}
                        </div>
                        <p>"${reviewContent}"</p>
                    </div>
                </div>
            `);

            // Optionally, save the review to localStorage or send it to a server
            // Code to handle saving the review

            // Clear the form
            $('#review-form')[0].reset();
        });
    }
});
