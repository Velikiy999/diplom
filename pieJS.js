function closeProductModal() {
    document.getElementById("product-modal").style.display = "none";
}

function showButton(card) {
    card.querySelector('.view-button').style.opacity = 1;
}

function hideButton(card) {
    card.querySelector('.view-button').style.opacity = 0;
}


    const monitorCards = document.querySelectorAll('.tovar-card');


function addToCart(product) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    const existingItem = cartItems.find(item => item.title === product.title);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function showProductDetails(button) {
    const card = button.closest('.tovar-card');
    const imageSrc = card.getAttribute('data-image');
    const title = card.querySelector('.tovar-title').textContent;
    const price = card.getAttribute('data-price');

    document.getElementById("modal-image").src = imageSrc;
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-price").textContent = "Ціна: $" + price;
    document.getElementById("product-modal").style.display = "flex";

    const product = { title, price: parseFloat(price), imageSrc };

    const buyButton = document.querySelector(".buy-button");
    buyButton.replaceWith(buyButton.cloneNode(true));
    document.querySelector(".buy-button").addEventListener("click", function() {
        addToCart(product);
    });
}
