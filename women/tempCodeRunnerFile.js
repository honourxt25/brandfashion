function createCard(image,title,price,id){
    let div = document.createElement("div");
    div.classList.add("outfits1");

    div.innerHTML = `
    <div class="outfits1" onclick="redirectToProduct('${id}')">
        <img src="${image}" class="img-fluid" alt="product_image">
       <button class="saveun" id="saveUnsave">
           </button>
        <img src="save.png" alt="" class="save">
        <div class="box2">
        <div class="title">
        <p>${title}</p>
        </div>
        <div class="price">
        <h2 class="price1">₹${price}</h2>
        </div>
        </div>
        </div>
    `;