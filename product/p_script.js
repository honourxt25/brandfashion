function toggleMenu() {
  let navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
}
// Cart
document.addEventListener("DOMContentLoaded", function () {
const cartList = document.querySelector(".list-group");
const totalPriceElement = cartList && cartList.querySelector("li:last-child strong");
let totalPrice = 20; // Default total from checkout.html

function addToCart(productName, price, description) {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "lh-sm");

    listItem.innerHTML = `
        <div>
            <h6 class="my-0">${productName}</h6>
            <small class="text-body-secondary">${description}</small>
        </div>
        <span class="text-body-secondary">$${price}</span>
    `;

    cartList.insertBefore(listItem, cartList.lastElementChild);
    totalPrice += price;
    totalPriceElement.textContent = `$${totalPrice}`;
}

// Example function call (You can replace this with real product buttons later)
// document.querySelector("#addProductBtn").addEventListener("click", function() {
//     addToCart("New Product", 15, "Awesome clothing item");
// });
});
// //
// function men() {
//     console.log("Redirecting to men");
//     window.location.href = `../men/men.html`;  // Correct path
// }

// let menIndex = 0;
// let womenIndex = 0;
// let shoeIndex = 0;

// function swipe(section, direction) {
//     const carousel = document.getElementById(`${section}-carousel`);
//     const items = carousel.querySelectorAll('.carousel-item');
//     const itemWidth = items[0].offsetWidth;

//     if (section === 'men') {
//         menIndex += direction;
//         if (menIndex < 0) menIndex = items.length - 1;
//         if (menIndex >= items.length) menIndex = 0;
//         carousel.style.transform = `translateX(-${menIndex * itemWidth}px)`;
//     } else if (section === 'women') {
//         womenIndex += direction;
//         if (womenIndex < 0) womenIndex = items.length - 1;
//         if (womenIndex >= items.length) womenIndex = 0;
//         carousel.style.transform = `translateX(-${womenIndex * itemWidth}px)`;
//     } else if (section === 'shoe') {
//       shoeIndex += direction;
//       if (shoeIndex < 0) shoeIndex = items.length - 1;
//       if (shoeIndex >= items.length) shoeIndex = 0;
//       carousel.style.transform = `translateX(-${shoeIndex * itemWidth}px)`;
//   }
// }
// function women() {
//     console.log("Redirecting to women");
//     window.location.href = `../women/women.html`;  // Correct path
// }


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
            <a href="../../checkout.html"><img src="../logos/cart.svg" width="24"></a>
            `;
        document.getElementById("logoutBtn").addEventListener("click", logoutUser);
    } else {
      loginContainer.innerHTML = `
      <a href="../login/login.html">
      <img src="../logos/people.svg" width="24"> Login
      </a>
      <a href="../../checkout.html"><img src="../logos/cart.svg" width="24"></a>`;
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
