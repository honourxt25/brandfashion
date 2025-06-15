document.getElementById("signupForm").addEventListener("submit", async function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
      const response = await fetch(`${CONFIG.BACKEND_URL}/auth/signup`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, email, password }),
          credentials: "include" // Ensures cookies are sent with the request
      });

      const data = await response.json();

      if (response.ok) {
          alert("Sign up successful! You can now log in.");
          window.location.href = "login.html";
      } else {
          alert(data.message || "Signup failed. Please try again.");
      }
  } catch (error) {
      alert("Error signing up. Please check your internet connection.");
  }
});

function signUpWithGoogle() {
  alert("Google Sign-Up feature coming soon!");
}

function signUpWithInstagram() {
  alert("Instagram Sign-Up feature coming soon!");
}
