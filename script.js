let totalFortune = 274700000000;
let spentAmount = 0;
let cart = {};

let totalItems = {
    Concert: 15000000,
    Influence: 6000000,
    MacBook: 7699,
    Optimus: 20000,
    Satellite: 290000000,
    iPhone: 1868,
    
}

function updateCart(item, price, action) {
    let quantityElement = document.getElementById(`${item}-quantity`);
    let quantity = parseInt(quantityElement.value);
    
    if (action === 'increment') {
        quantity++;
        spentAmount += price;
        cart[item] = (cart[item] || 0) + 1;
    } else if (action === 'decrement' && quantity > 0) {
        quantity--;
        spentAmount -= price;
        cart[item] = Math.max((cart[item] || 0) - 1, 0);
    }

    quantityElement.value = quantity;
    updateFortuneDisplay();
    updateCartModal();
}

function manualUpdate(item, price) {
    let quantityElement = document.getElementById(`${item}-quantity`);
    let newQuantity = parseInt(quantityElement.value) || 0;
    let oldQuantity = cart[item] || 0;

    spentAmount += (newQuantity - oldQuantity) * price;
    cart[item] = newQuantity;

    updateFortuneDisplay();
    updateCartModal();
}

function updateFortuneDisplay() {
    document.getElementById("spent-amount").textContent = spentAmount;
    let spentPercentage = ((spentAmount / totalFortune) * 100).toFixed(12);
    document.getElementById("spent-percentage").textContent = spentPercentage;
}

function toggleCart() {
    const cartModal = document.getElementById("cart-modal");
    cartModal.style.display = cartModal.style.display === "flex" ? "none" : "flex";
    updateCartModal();
}

function updateCartModal() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    let total = 0;
    console.log('cart',cart)
    for (let item in cart) {
        if (cart[item] > 0) {
            let row = `<tr>
                <td>${item}</td>
                <td>${cart[item]}</td>
                <td>$${cart[item] * totalItems[item]}</td>
            </tr>`;
            cartItems.innerHTML += row;
            total += cart[item];
        }
    }

    if (total === 0) {
        cartItems.innerHTML = "<tr><td colspan='3'>No items in cart.</td></tr>";
    }

    let spentPercentage = ((spentAmount / totalFortune) * 100).toFixed(12);
    document.getElementById("modal-spent-amount").textContent = spentAmount;
    document.getElementById("modal-spent-percentage").textContent = spentPercentage;
    document.getElementById("remaining-fortune").textContent = totalFortune - spentAmount;
}

// Handle ESC key to close the cart modal
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        toggleCart();
    }
});