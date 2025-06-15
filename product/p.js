function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function toggleMenu() {
  let navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
}
let s;
let p = [];
let i = 0;
let swipei;
let timeoutId;

function swipe() {
  i = (i + 1) % p.length;
 while (!p[i]) 
  {
    i = (i + 1) % p.length;
  }
  document.getElementById("pics").src = p[i];
}
setInterval(swipe, 3000);

function opentab(add) {
  window.open(add, "_blank");
}

function op(add) {
  clearInterval(swipei);
  document.getElementById("pics").src = add;
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
      swipei = setInterval(swipe, 3000);
  }, 5000);
}

function changebg(n) {
  let b = document.getElementsByClassName("s");
  for (let i = 0; i < b.length; i++) {
      b[i].style.background = i === n - 1 ? (b[i].style.background === "red" ? "white" : "red") : "white";
      if( b[i].style.background === "red") {
        s = b[i].innerHTML;
      }
  }
}

async function addToCart() {
  const productId = getProductIdFromURL(); // Get product ID from URL
  console.log('productId: ', productId);

  if (!productId) {
      alert("Invalid product. Please try again.");
      return;
  }

  try {
    const response = await fetch(`${CONFIG.BACKEND_URL}/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: productId, quantity: 1, size: s}),
        credentials: "include", // To send cookies if needed
    });

      const result = await response.json();

      if (response.ok) {
          alert("Product added to cart successfully!");
          window.location.href ="../../checkout.html"
      } else {
          alert(`Error: ${result.message || "Could not add to cart."}`);
      }
  } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart. Please try again.");
  }
}

async function addToWishlist() {
  const productId = getProductIdFromURL(); // Assuming same helper as addToCart()
  console.log('productId: ', productId);

  if (!productId) {
    alert("Invalid product. Please try again.");
    return;
  }

  try {
    const response = await fetch(`${CONFIG.BACKEND_URL}/wishlist/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Needed for HttpOnly cookie auth
      body: JSON.stringify({ productId }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Added to wishlist!");
    } else {
      alert(`Error: ${result.message || "Could not add to wishlist."}`);
    }
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    alert("Something went wrong. Try again.");
  }
}

function discount(price, oldp) {
  let d = Math.round(((oldp - price) / oldp) * 100);
  if (d < 0) {
    d = 0;
  }
  return d;
}

function page(pic1, pic2, pic3, pic4, pic5, pic6, pic7, title, price, description,oldp,d) {
  let div = document.createElement("div");
  div.classList.add("container");

  div.innerHTML = `
    <div class="container">
      <div class="left">
        <img class="i" id="pics" src="${pic1}" onclick="opentab(this.src)" alt=""/>
        <img id="p1" class="small" src="${pic1}" onclick="op(this.src)" alt="" />
        <img id="p2" class="small" src="${pic2}" onclick="op(this.src)" alt="" />
        <img id="p3" class="small" src="${pic3}" onclick="op(this.src)" alt="" />
        <img id="p4" class="small" src="${pic4}" onclick="op(this.src)" alt="" />
        <img id="p5" class="small" src="${pic5}" onclick="op(this.src)" alt="" />
        <img id="p6" class="small" src="${pic6}" onclick="op(this.src)" alt="" />
        <img id="p7" class="small" src="${pic7}" onclick="op(this.src)" alt="" />
      </div>
      <div class="right">
        <h1 class="title">${title}</h1>
       
        <span style="font-style: italic; font-size: 30px; color: yellow ; position:relative; top:3%;">${d}% OFF  </span>
        <div class="price"><s style="font-style: italic; font-size: 30px; color: red">₹${oldp}</s> ₹${price}</div>
        <div class="size">
          <div class="s" onclick="changebg(1)">S</div>
          <div class="s" onclick="changebg(2)">M</div>
          <div class="s" onclick="changebg(3)">L</div>
          <div class="s" onclick="changebg(4)">XL</div>
          <div class="s" onclick="changebg(5)">XXL</div>
          <div class="s" onclick="changebg(6)">XXXL</div>
        </div>
        <div class="butt">
          <button type="button" class="btn btn-success" onclick="addToWishlist()">Save</button>
          <a href="../../checkout.html"><button type="button" class="btn btn-warning btn-buy">Buy Now</button></a>
          <button type="button" class="btn btn-primary" onclick="addToCart()">Add to Cart</button>

        </div>
        <br>
        <div class="product-d">
          <h1>Product Description:-</h1>
          <p>${description}</p>
        </div>
      </div>
    </div>`;

  document.querySelector(".box").appendChild(div);

  // Populate p array after images are created
  p = [pic1, pic2, pic3, pic4, pic5, pic6, pic7];

  // Start image swipe only if multiple images exist
  if (p.length > 1) {
      swipei = setInterval(swipe, 3000);
  }
}

async function fetchProductDetails() {
  console.log("Fetching product details...");

  const productId = getProductIdFromURL();
  console.log("Extracted Product ID:", productId);

  if (!productId) {
      document.querySelector(".container").innerHTML = "<h2>Product not found!</h2>";
      return;
  }

  try {
      const response = await fetch(`${CONFIG.BACKEND_URL}/products`);
      const products = await response.json();
      console.log("Fetched Products:", products);

      const product = products.find(p => p._id === productId);

      if (product) {
          console.log("Found Product:", product);
      
          page(product.image1, product.image2, product.image3, product.image4, product.image5, product.image6, product.image7, product.name, product.price, product.description,product.oldp,discount(product.price,product.oldp));
      } else {
          console.error("Product not found!");
          document.querySelector(".container").innerHTML = "<h2>Product not found.</h2>";
      }
  } catch (error) {
      console.error("Error fetching product details:", error);
      document.querySelector(".container").innerHTML = "<h2>Error loading product.</h2>";
  }
}

// Fetch the product after the page loads
fetchProductDetails();


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
              <a href="../../login/login.html">
                  <img src="../logos/people.svg" width="24"> Login
                  <a href="../checkout.html"><img src="../logos/cart.svg" width="24"></a>
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
