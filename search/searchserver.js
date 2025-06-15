
const BACKEND_URL = "https://edge-clothing.onrender.com"; 


function redirectToProduct(productId) {
    console.log("Redirecting to product page with ID:", productId);
    window.open(`../product/p.html?id=${productId}`, '_blank'); 
}
function displayProducts(products) {
    const container = document.getElementById("results-container");
   
    if (!container) {
        console.error("Error: Results container element not found in search.html");
        return;
    }

    container.innerHTML = ""; 

    if (!products || products.length === 0) {
        container.innerHTML = "<p>No products found matching your query.</p>";
        return;
    }

    
    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product-item");
        let imageHTML = '';
        if (product.image1) { 
            imageHTML = `<img  onclick="redirectToProduct('${product._id}')" src="${product.image1}" alt="${product.name}">`;
        }

        productElement.innerHTML = `
            ${imageHTML}
            <h2  onclick="redirectToProduct('${product._id}')">${product.name || 'No Title'}</h2>
          
            <p  onclick="redirectToProduct('${product._id}')"><strong>Price:</strong> ₹${product.price !== undefined ? product.price.toFixed(2) : 'N/A'}</p>
             <p  onclick="redirectToProduct('${product._id}')"><small>Attire: ${product.attire_type || 'N/A'}, Type: ${product.clothing_type || 'N/A'}</small></p>
             <div style="clear:both;"  onclick="redirectToProduct('${product._id}')"></div> 
        `;
     

        container.appendChild(productElement);
    });
}

window.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q"); 

    const resultsTitle = document.querySelector('h1'); 
    if (query) {
        if (resultsTitle) {
             resultsTitle.textContent = `Search Results for "${query}"`; 
        }
        const container = document.getElementById("results-container");
        if (container) container.innerHTML = `<p>Searching for "${query}"...</p>`; 

        try {
           
            const response = await fetch(`${BACKEND_URL}/search?q=${encodeURIComponent(query)}`);

            if (!response.ok) {
                
                 let errorMsg = `Search failed: Server returned status ${response.status}`;
                 try {
                     const errorData = await response.json();
                     errorMsg += ` - ${errorData.error || 'Unknown server error'}`;
                 } catch (e) {}
                 throw new Error(errorMsg);
            }

            const products = await response.json();
            displayProducts(products);         

        } catch (error) {
            console.error("Error fetching search results:", error);
            const container = document.getElementById("results-container");
             if (container) {
          
                container.innerHTML = `<p>Sorry, couldn't load search results. ${error.message}</p>`;
             }
        }
    } else {
        if (resultsTitle) {
            resultsTitle.textContent = `Search Results`;
        }
        const container = document.getElementById("results-container");
        if (container) {
            container.innerHTML = "<p>Please enter a search term in the navigation bar.</p>";
        }
        console.log("No search query (q) found in URL.");
    }
});
