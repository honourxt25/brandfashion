// document.addEventListener("DOMContentLoaded", async function () {
//   try {
//       const response = await fetch(`${CONFIG.BACKEND_URL}/cart`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//       });

//       const cartData = await response.json(); // Convert response to JSON

//       const cartItemsContainer = document.getElementById("cart-items");
//       const cartTotal = document.getElementById("cart-total");
//       const cartCount = document.getElementById("cart-count");

//       cartItemsContainer.innerHTML = ""; // Clear existing items
//       let totalAmount = cartData.cartTotal;

//       console.log("cartData: ", cartData);
//       cartData?.cart.forEach(({ productId: item }) => {
//           console.log("item: ", item);

//           const li = document.createElement("li");
//           li.className = "list-group-item d-flex justify-content-between lh-sm";
//           li.innerHTML = `
//               <div>
//                   <h6 class="my-0">${item.name}</h6>
//                   <small class="text-body-secondary">${item.description}</small>
//               </div>
//               <span class="text-body-secondary">$${item.price}</span>
//           `;
//           cartItemsContainer.appendChild(li);
//       });

//       // Update total and item count
//       cartTotal.textContent = `$${totalAmount}`;
//       cartCount.textContent = cartData.cart.length;

//   } catch (error) {
//       console.error("Error fetching cart data:", error);
//   }
// });

// // **Place Order Functionality**
// document.getElementById("checkout-form").addEventListener("submit", async function (event) {
//   event.preventDefault(); // Prevent form submission reload

//   const billingDetails = {
//       firstName: document.getElementById("firstName").value,
//       lastName: document.getElementById("lastName").value,
//       address: document.getElementById("address").value,
//       country: document.getElementById("country").value,
//       state: document.getElementById("state").value,
//       zip: document.getElementById("zip").value,
//   };

//   try {
//       const response = await fetch(`${CONFIG.BACKEND_URL}/cart/place-order`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//           body: JSON.stringify({ billingDetails }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//           alert("Order placed successfully!");
//           window.location.reload()
//           // window.location.href = "./orders.html"; // Redirect to order history
//       } else {
//           alert("Failed to place order: " + (data.message || "Unknown error"));
//       }
//   } catch (error) {
//       console.error("Error placing order:", error);
//       alert("Something went wrong while placing your order.");
//   }
// });


// document.addEventListener("DOMContentLoaded", async function () {
//   try {
//       const response = await fetch(`${CONFIG.BACKEND_URL}/cart`, {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//       });

//       const cartData = await response.json(); // Convert response to JSON
//       const cartItemsContainer = document.getElementById("cart-items");
//       const cartTotal = document.getElementById("cart-total");
//       const cartCount = document.getElementById("cart-count");

//       cartItemsContainer.innerHTML = ""; // Clear existing items
//       let totalAmount = cartData.cartTotal || 0;

//       console.log("cartData: ", cartData);
//       cartData?.cart.forEach(({ productId: item, quantity }) => {
//           console.log("item: ", item);

//           const li = document.createElement("li");
//           li.className = "list-group-item d-flex justify-content-between lh-sm";
//           li.innerHTML = `
//               <div>
//                   <h6 class="my-0">${item.name} (x${quantity})</h6>
//                   <small class="text-body-secondary">${item.description}</small>
//               </div>
//               <span class="text-body-secondary">$${(item.price * quantity).toFixed(2)}</span>
//           `;
//           cartItemsContainer.appendChild(li);
//       });

//       // Update total and item count
//       cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
//       cartCount.textContent = cartData.cart.length;

//   } catch (error) {
//       console.error("Error fetching cart data:", error);
//   }
// });

// // **Place Order Functionality**
// document.getElementById("checkout-form").addEventListener("submit", async function (event) {
//   event.preventDefault(); // Prevent form submission reload

//   const billingDetails = {
//       firstName: document.getElementById("firstName").value,
//       lastName: document.getElementById("lastName").value,
//       email: document.getElementById("email").value,
//       address: document.getElementById("address").value,
//       country: document.getElementById("country").value,
//       state: document.getElementById("state").value,
//       zip: document.getElementById("zip").value,
//   };

//   try {
//       const response = await fetch(`${CONFIG.BACKEND_URL}/cart/place-order`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//           body: JSON.stringify({ billingDetails, cart: JSON.parse(localStorage.getItem("cart")) || [] }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//           alert("Order placed successfully!");

//           // Clear cart from frontend and backend
//           localStorage.removeItem("cart");
//           await fetch(`${CONFIG.BACKEND_URL}/cart/clear`, { method: "POST", credentials: "include" });

//           window.location.href = "./orders.html"; // Redirect to order history
//       } else {
//           alert("Failed to place order: " + (data.message || "Unknown error"));
//       }
//   } catch (error) {
//       console.error("Error placing order:", error);
//       alert("Something went wrong while placing your order.");
//   }
// });


document.addEventListener("DOMContentLoaded", async function () {
  try {
      const response = await fetch(`${CONFIG.BACKEND_URL}/cart`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
      });

      const cartData = await response.json();
      console.log('cartData: ', cartData);

      const cartItemsContainer = document.getElementById("cart-items");
      const cartTotal = document.getElementById("cart-total");
      const cartCount = document.getElementById("cart-count");

      cartItemsContainer.innerHTML = "";
      let totalAmount = cartData.cartTotal;

      console.log("cartData: ", cartData);
      cartData?.cart.forEach(({ productId: item }) => {
          console.log("item: ", item);

          const li = document.createElement("li");
          li.className = "list-group-item d-flex justify-content-between lh-sm";
          li.innerHTML = `
              <div>
                  <h6 class="my-0">${item.name}</h6>
                  <small class="text-body-secondary">${item.description}</small>
              </div>
              <span class="text-body-secondary">₹${item.price}</span>
          `;
          cartItemsContainer.appendChild(li);
      });

      cartTotal.textContent = `₹${totalAmount}`;
      cartCount.textContent = cartData.cart.length;

  } catch (error) {
      console.error("Error fetching cart data:", error);
  }
});

// **Place Order Functionality**
document.getElementById("checkout-form").addEventListener("submit", async function (event) {
  // Check if form is valid
  if (!this.checkValidity()) {
    event.preventDefault(); // Prevent submission if form is invalid
    event.stopPropagation(); // Stop further processing
    this.classList.add("was-validated"); // Add Bootstrap validation styles
    return;
}

event.preventDefault();

  const billingDetails = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      // email: document.getElementById("email").value,
      address: document.getElementById("address").value,
      country: document.getElementById("country").value,
      state: document.getElementById("state").value,
      zip: document.getElementById("zip").value,
  };

  try {
      const response = await fetch(`${CONFIG.BACKEND_URL}/cart/place-order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ billingDetails }),
      });

      const data = await response.json();
      if (response.ok) {
          alert("Order placed successfully!\nYour oder will be delivered in 2 days.");

          // Clear cart UI
          document.getElementById("cart-items").innerHTML = "";
          document.getElementById("cart-total").textContent = "$0";
          document.getElementById("cart-count").textContent = "0";

          window.location.reload();
      } else {
          alert("Failed to place order: " + (data.message || "Unknown error"));
      }
  } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong while placing your order.");
  }
});
