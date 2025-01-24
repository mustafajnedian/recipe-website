document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('feedback-form');
  const responseMessage = document.getElementById('response-message');

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
});