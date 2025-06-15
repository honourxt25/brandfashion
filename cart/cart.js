function empty(){
    let div=document.createElement("div");
    div.classList.add("empty");
    div.innerHTML=`  <img src="../logos/big_cart.svg">
    <p>Your cart is empty. Add some items to view.</p>
    <div class="cart-actions">
      <button class="cart-btn" onclick="window.location.href='../index.html'">Continue Shopping</button>
    </div>`;
    document.querySelector(".cartempty").appendChild(div);
}
// console.log("From Cart");
// async function fetchCart() {
//   try {
//     const response = await fetch(`${CONFIG.BACKEND_URL}/cart`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         // body: JSON.stringify({ email, password }),
//         credentials: "include",
//     });

//     const data = await response.json();
//     console.log('data: ', data);

//     // console.log('response: ', response);
//     if (response.ok) {
//         // localStorage.setItem("username", data.name);
//         // localStorage.setItem("userid", data.userId);
//         // alert("Login successful!");
//         // window.location.href = "../index.html";
//     } else {
//         // alert(data.msg || "Invalid email or password.");
//     }
// } catch (error) {
//     console.error("Error:", error);
//     alert("Something went wrong. Please try again.");
// }
// }
//  fetchCart();

document.addEventListener("DOMContentLoaded", () => {
  const loginContainer = document.querySelector("nav div:last-child"); // Get login div

  // Function to update navbar dynamically
  function updateNavbar() {
      const username = localStorage.getItem("username"); // Get stored username
      const accessToken = getCookie("accessToken"); // Check if cookie exists

      if (username || accessToken) {
          loginContainer.innerHTML = `
              <a href="#" id="logoutBtn">
                  <img src="../logos/people.svg" width="24"> ${username || "User"} | Logout
              </a>
              <a href="../checkout.html"><img src="../logos/cart.svg" width="24"></a>
          `;
          document.getElementById("logoutBtn").addEventListener("click", logoutUser);
      } else {
          loginContainer.innerHTML = `
              <a href="./login/login.html">
                  <img src="./logos/people.svg" width="24"> Login
              </a>
          `;
      }
  }

  // Logout function
  async function logoutUser() {
      try{
        const response = await fetch(`${CONFIG.BACKEND_URL}/auth/logout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
      });

      const data = await response.json();
      console.log('data: ', data);

      if (response.ok) {
          localStorage.removeItem("username");
          localStorage.removeItem("userid");
          window.location.reload(); // Refresh page
      } else {
          alert(data.msg || "Error 😬.");
      }
      }
      catch(err) {
        console.log('err: ', err);
      }
  }

  // Function to get cookies
  function getCookie(name) {
      const cookies = document.cookie.split("; ");
      for (let cookie of cookies) {
          const [key, value] = cookie.split("=");
          if (key === name) return value;
      }
      return null;
  }

  updateNavbar(); // Call function on page load
});
