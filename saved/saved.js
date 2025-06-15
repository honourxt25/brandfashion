//function saved(){
//  let div=document.createElement("div");
//  div.classList.add("save");
//  div.innerHTML=`

//  `;
// };

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
              <a href="../login/login.html">
                  <img src="../logos/people.svg" width="24"> Login
                  <a href="../checkout.html"><img src="../logos/cart.svg" width="24"></a>
              </a>
          `;
      }
  }


// saved("holaaa",800,"https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSIuwAixARZt7Pfw_19KPLdGzysOCWO9jQcEwEov_k0Zam4tx3yeCXa_qGVeFVUHvGaAt2DAKJtcKRiYQEiug7vCm50cBjqL8O8zh7i71M");
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

function saved(title,price,img,id){
  let div=document.createElement("div");
  div.classList.add("save");
  div.innerHTML=`

   <div class="container">

    <img class="img" src=${img} alt="">

  <div class="right">
    <div class="title">
     ${title}
    </div>
     <div class="price">
  <span style="font-style: italic;"> ₹${price}</span>
    </div>
  </div>
  <div class="butt">
    <button type="button" class="btn btn-light">ADD TO CART</button>
    <button type="button" class="btn btn-danger" onclick="removeFromWishlist('${id}')">REMOVE</button>
  </div>
  </div>`
  document.querySelector(".saved").append(div);

}

function renderWishlist(wishlist) {
  wishlist.forEach(element => {
    const { name, price, image1, _id } = element.productId
    saved(name, price, image1, _id)
  }
)
}

function removeFromWishlist(productId) {
  fetch(`${CONFIG.BACKEND_URL}/wishlist/remove`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ productId })
  }).then(res => res.json())
    .then(data => {
      console.log('data: ', data);
      if (data) {
        alert("Removed from wishlist");
        window.location.reload(); // Reload to refresh UI
      }
    }).catch(err => {
      console.error(err);
      alert("Could not remove item.");
    });
}

async function loadWishlist() {
  try {
    const response = await fetch(`${CONFIG.BACKEND_URL}/wishlist`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Needed for HttpOnly cookie auth
    });

    const result = await response.json();

    if (response.ok) {
      renderWishlist(result.wishlist); // You implement this function
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    alert("Failed to load wishlist.");
  }
}

loadWishlist();
