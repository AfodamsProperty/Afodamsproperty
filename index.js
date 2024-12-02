// Set the date to count down to
var countDownDate = new Date("2024-12-31T23:59:59").getTime();

// Update the countdown every second
var countdown = setInterval(function () {
  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Calculate the days, hours, minutes, and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor(
    (distance % (1000 * 160 * 60 * 24)) / (1000 * 60 * 60)
  );
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the countdown
  document.getElementById("day").innerHTML = padNumber(days);
  document.getElementById("hour").innerHTML = padNumber(hours);
  document.getElementById("minute").innerHTML = padNumber(minutes);
  document.getElementById("second").innerHTML = padNumber(seconds);

  // If the countdown is finished, display a message
  if (distance < 0) {
    clearInterval(countdown);
    document.getElementById("countdown").innerHTML = "Countdown Finished";
  }
}, 1000);

// Function to pad single-digit numbers with a leading zero
function padNumber(number) {
  return (number < 10 ? "0" : "") + number;
}

// Function to fetch and update the countdown timer
// Function to fetch countdown data from the backend
function fetchCountdown() {
  fetch("http://localhost:5000/submit-email") // Use the backend's IP address and port
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
      console.log("Success:", data); // Log response from backend

      // Update countdown values on the page
      document.getElementById("days").textContent = data.days;
      document.getElementById("hours").textContent = data.hours;
      document.getElementById("minutes").textContent = data.minutes;
      document.getElementById("seconds").textContent = data.seconds;
    })
    .catch(error => {
      console.error("Error fetching countdown:", error); // Log any error
    });
}

// Call the function immediately and refresh every minute
fetchCountdown();
setInterval(fetchCountdown, 60000); // Refresh every 60 seconds

// Handle the form submission to submit an email
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get the form data
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phonenumber: document.getElementById("phonenumber").value,
    };

    // Send a POST request to the backend to submit the email
    fetch("http://localhost:5000/submit-email", {
      // Use the backend's IP address and endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Send form data as JSON
    })
      .then(response => {
        if (response.ok) {
          return response.json(); // If successful, parse the response
        } else {
          throw new Error("Failed to submit form"); // Handle failed submission
        }
      })
      .then(data => {
        alert("Form submitted successfully!"); // User feedback on success
      })
      .catch(error => {
        console.error("Error submitting form:", error); // Log error on failure
        alert("Something went wrong, please try again."); // Alert user on failure
      });
  });
