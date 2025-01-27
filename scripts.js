document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('feedback-form');
  const responseMessage = document.getElementById('response-message');
  const searchBar = document.getElementById('search-bar');
  const recipeList = document.getElementById('recipe-list');
  const testimonialForm = document.getElementById('testimonial-form');
  const testimonialList = document.getElementById('testimonial-list');

  // Handle feedback form submission
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const feedback = document.getElementById('feedback').value;

    fetch('https://api.example.com/submit-feedback', { // Replace with your API endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ feedback: feedback })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      responseMessage.textContent = 'Thank you for your feedback!';
      form.reset();
    })
    .catch(error => {
      responseMessage.textContent = 'There was a problem submitting your feedback. Please try again later.';
      console.error('There was an error:', error);
    });
  });

  // Handle recipe search functionality
  searchBar.addEventListener('input', function(event) {
    const query = event.target.value.toLowerCase();
    const recipes = recipeList.getElementsByClassName('recipe');

    Array.from(recipes).forEach(recipe => {
      const title = recipe.getElementsByTagName('h2')[0].textContent.toLowerCase();
      if (title.includes(query)) {
        recipe.style.display = '';
      } else {
        recipe.style.display = 'none';
      }
    });
  });

  // Handle testimonial form submission
  testimonialForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const testimonial = document.getElementById('testimonial').value;

    // Create testimonial item and add to the list
    const testimonialItem = document.createElement('div');
    testimonialItem.classList.add('testimonial-item');
    testimonialItem.innerHTML = `<strong>${username}</strong><p>${testimonial}</p>`;
    testimonialList.appendChild(testimonialItem);

    // Clear form
    testimonialForm.reset();
  });
});
