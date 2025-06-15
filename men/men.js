
let bgs=["men.png","edgebanner.png","banner1.png","banner2.png"];
let i=0;
function bannerScroll(){
i=(i+1)%bgs.length;

if(document.getElementById("banner")) {
  document.getElementById("banner").src=bgs[i];
}
};
setInterval(bannerScroll,2000);
function forw(){
    i=(i+1)%bgs.length;
    document.getElementById("banner").src=bgs[i];
    clearInterval

};

async function removeFromWishlist(productId) {
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
//   async function removeFromWishlist(id) {
//     const productId = id; // Assuming same helper as addToCart()
//     console.log('productId to remove: ', productId);
  
//     if (!productId) {
//       alert("Invalid product ID. Please try again.");
//       return;
//     }
  
//     try {
//       const response = await fetch(`${CONFIG.BACKEND_URL}/wishlist/remove`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include", // Needed for HttpOnly cookie auth
//         body: JSON.stringify({ productId }),
//       });
  
//       const result = await response.json();
  
//       if (response.ok) {
//         alert("Removed from wishlist!");
//         // You might want to update the UI here to reflect the removal
//         // For example, remove the product item from the displayed wishlist
//       } else {
//         alert(`Error: ${result.message || "Could not remove from wishlist."}`);
//       }
//     } catch (error) {
//       console.error("Error removing from wishlist:", error);
//       alert("Something went wrong. Try again.");
//     }
//   };
async function addToWishlist(id) {
    const productId = id; // Assuming same helper as addToCart()
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
  };

function back(){
    i=(i-1 + bgs.length)%bgs.length;
    document.getElementById("banner").src=bgs[i];

};
function save(id) {
    let img = document.getElementById('' + id);

    const filename = img.src.split('/').pop();
  
    if (filename === "heart.svg") {
      img.src = "../logos/heart-fill.svg";
      addToWishlist(id);

    } else {
      img.src = "../logos/heart.svg";
        removeFromWishlist(id);

    }
  }
// async function Wishlist(productId) {
//   const img = document.getElementById(`like-${productId}`);
//   const filename = img.src.split('/').pop();

//   const isLiked = filename === "heart-fill.svg";

//   try {
//     const response = await fetch(`${CONFIG.BACKEND_URL}/wishlist/${isLiked ? 'remove' : 'add'}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({ productId }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       // Toggle the icon
//       img.src = isLiked ? "../logos/heart.svg" : "../logos/heart-fill.svg";

//     } else {
//       alert(data.message || "Something went wrong.");
//     }
//   } catch (err) {
//     console.error("Wishlist toggle error:", err);
//     alert("Failed to update wishlist.");
//   }
// }



function redirectToProduct(productId) {
  console.log("Redirecting to product page with ID:", productId);
  window.open(`../product/p.html?id=${productId}`, '_blank');  // Correct path
}

function createCard(pic1, pic2, pic3, pic4, pic5, pic6, pic7, title, price, id) {
  const p = [pic1, pic2, pic3, pic4, pic5, pic6, pic7].filter(Boolean); // Clean array
  let index = 0;
  let intervalId;

  const div = document.createElement("div");
  div.classList.add("outfits1");

  const imageId = `image-${id}-${Math.random().toString(36).substring(2, 8)}`; // Unique ID

  div.innerHTML = `
      <div class="outfits1-in" >
      <div class="out"  >
          <img id="${imageId}" onclick="redirectToProduct('${id}')"  class="shirts" src="${p[0]}" alt="">

          </div>
       
          <div class="box2">
              <div class="title">${title}</div>
              <div class="price">
                  <div class="like-dislike">
                      <img src="../logos/heart.svg" onclick="save('${id}')"id="${id}" height="25"/>
                  </div>
                  <h2 class="price1">₹${price}</h2>
              </div>
          </div>
      </div>
  `;

  const imageEl = div.querySelector(`#${imageId}`);

  
  div.addEventListener("mouseenter", () => {
      if (p.length > 1) {
          intervalId = setInterval(() => {
              index = (index + 1) % p.length;
              imageEl.classList.add("fade-out");
              setTimeout(() => {
                  imageEl.src = p[index];
                  imageEl.classList.remove("fade-out");
                  imageEl.classList.add("fade-in");
              }, 150);
              setTimeout(() => imageEl.classList.remove("fade-in"), 300);
          }, 1500);
      }
  });

  // Reset on mouse leave
  div.addEventListener("mouseleave", () => {
      clearInterval(intervalId);
      index = 0;
      imageEl.src = p[0];
  });

  document.querySelector(".outfits").appendChild(div);

}


document.querySelector(".outfits").addEventListener("click", function (event) {
  if (event.target.classList.contains("saveun")) {
      let img = event.target.nextElementSibling;
      if (img && img.classList.contains("save")) {
          img.src = img.src.includes("save.png") ? "saved.png" : "save.png";
          img.style.width="13%";
          img.style.height="10%";
      }
  }
});






// createCard("men1.png","new black tshirt by EDGE|trending tshirts  new black tshirt by EDGE|trending tshirt",200);
// createCard("men2.png","new tshirt BY edge",1300);
// createCard("men2.png","new tshirt BY edge",1300);
// createCard("men2.png","new tshirt BY edge",1300);
// createCard("men2.png","new tshirt BY edge",1300);
// createCard("men2.png","new tshirt BY edge",1300);

async function fetchProducts() {
  try {
      const response = await fetch(`${CONFIG.BACKEND_URL}/products?category=M`);
      const products = await response.json();

      console.log("Fetched Products:", products);

      // Looping through products and creating cards
      products.forEach(product => {
          createCard(product.image1, product.image2, product.image3, product.image4, product.image5, product.image6, product.image7, product.name, product.price,product._id);
      });
  } catch (error) {
      console.error("Error fetching products:", error);
  }
}

fetchProducts();

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
//Toggle function for like
const image = document.getElementById('like');
const image1 = '../logos/heart.svg';
const image2 = '../logos/heart-fill.svg';

image.addEventListener('click', () => {
  image.src = (image.src.includes(image1)) ? image2 : image1;
});