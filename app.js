let cartIcon = document.querySelector('#Cart-icon');
let cart = document.getElementsByClassName('cart')[0]; // Get the first element
let cartCloseIcon = document.getElementById('close-cart'); // Remove the #

// open cart
cartIcon.onclick = () => {
    if (cart) { // Check if cart exists
        cart.classList.add('active');
    }
};

// close cart
cartCloseIcon.onclick = () => {
    if (cart) { // Check if cart exists
        cart.classList.remove('active');
    }
};

// cart working js
if (document.readyState == "loading") {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
// creating the function
function ready() {
    //remove item from cart
    let removeCartButtons = document.getElementsByClassName('cart-remove')
    for (let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    //Quantity changes
    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for (let i = 0; i < quantityInputs.length; i++) {
        const input = quantityInputs[i];
        input.addEventListener("change", quantityChanged)
    }

    // Add To Cart
    const addCart = document.getElementsByClassName('add-cart')
    for (let i = 0; i < addCart.length; i++) {
        const button = addCart[i];
        button.addEventListener("click", addCartClicked)

    }

    //Add To Cart
    function addCartClicked(e) {
        let button = e.target;
        let shopProduct = button.parentElement;

        const title = shopProduct.getElementsByClassName('product-title')[0].innerText;
        const price = shopProduct.getElementsByClassName('price')[0].innerText;
        const productImg = shopProduct.querySelector('img').src;
        addProductToCart(title, price, productImg)
    }

    function addProductToCart(title, price, productImg) {
        const cartItems = document.getElementsByClassName('cart-content')[0]; // Get the first cart-content element
        const cartItemsNames = cartItems.getElementsByClassName('cart-product-title');

        // Check if item already exists in cart
        for (let i = 0; i < cartItemsNames.length; i++) {
            if (cartItemsNames[i].innerText === title) {
                alert('You have already added this item to the cart');
                return; // Exit the function if item exists
            }
        }

        // If the item doesn't exist, add it to the cart
        const cartShopBox = document.createElement('div');
        cartShopBox.classList.add('cart-box');

        const cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bxs-trash-alt cart-remove'></i>`;

        cartShopBox.innerHTML = cartBoxContent;
        cartItems.append(cartShopBox);

        // Add event listeners to the newly added cart item
        cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
        cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);

        updateTotal(); // Update the total price after adding an item
    }

    // ... (Your existing code) ...

    // Buy Button Functionality
    const buyButton = document.getElementsByClassName('btn-buy')[0]; // Assuming you have a button with class 'btn-buy'
    if (buyButton) {
        buyButton.addEventListener('click', () => {
            let cartContent = document.getElementsByClassName('cart-content')[0];
            let cartBoxes = cartContent.getElementsByClassName('cart-box');
            let cartItems = []; // Array to store cart item details

            if (cartBoxes.length === 0) {
                alert('Your cart is empty!');
                return;
            }

            // Collect cart item information
            for (let i = 0; i < cartBoxes.length; i++) {
                let cartBox = cartBoxes[i];
                let title = cartBox.getElementsByClassName('cart-product-title')[0].innerText;
                let price = parseFloat(cartBox.getElementsByClassName('cart-price')[0].innerText.replace("$", ""));
                let quantity = cartBox.getElementsByClassName('cart-quantity')[0].value;

                cartItems.push({ title, price, quantity });
            }

            // log the cart items to the console
            console.log("Items to purchase:", cartItems);
            alert('Thank you for your purchase!');

            // Optionally clear the cart after purchase
            cartContent.innerHTML = ''; 
            updateTotal();
        });
    }
}
//Remove/items from cart
function removeCartItem(e) {
    e.target.parentElement.remove()
    updateTotal()
}
//Quantity Changes
function quantityChanged(e) {
    const input = e.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateTotal()
}

//update Total 
function updateTotal() {
    let cartContent = document.getElementsByClassName('cart-content')[0]
    let cartBoxes = cartContent.getElementsByClassName('cart-box')

    let total = 0;
    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName('cart-price')[0]
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]

        const price = parseFloat(priceElement.innerText.replace("$", ""))
        const quantity = quantityElement.value;
        total += (price * quantity);
    }
    document.getElementsByClassName('total-price')[0].innerText = `$${total.toFixed(2)}`
}

