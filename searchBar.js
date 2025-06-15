document.querySelector('.hamburger').addEventListener('click', function() {
  document.querySelector('.nav-links').classList.toggle('active');
});
function searchProducts() {
    let query = document.getElementById("search").value;
    if (query.trim() !== "") {
      alert("Searching for: " + query);
    }
  }
