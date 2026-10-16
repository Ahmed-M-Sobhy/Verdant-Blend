let cart = [];

function addToCart(title, price, img) {
  cart.push({ title, price, img });
  updateCartUI();
  openCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function updateCartUI() {
  // Update badge count
  document.getElementById("cartCount").innerText = cart.length;

  const container = document.getElementById("cartItemsContainer");
  const totalPriceElement = document.getElementById("cartTotalPrice");

  if (cart.length === 0) {
    container.innerHTML =
      '<p class="empty-cart-msg">Your cart is currently empty.</p>';
    totalPriceElement.innerText = "$0.00";
    return;
  }

  let total = 0;
  let html = "";

  cart.forEach((item, index) => {
    total += item.price;
    html += `
          <div class="cart-item">
            <img src="${item.img}" class="cart-item-img" alt="${item.title}">
            <div class="cart-item-info">
              <h4>${item.title}</h4>
              <span>$${item.price.toFixed(2)}</span>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${index})">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        `;
  });

  container.innerHTML = html;
  totalPriceElement.innerText = "$" + total.toFixed(2);
}

function openCart() {
  document.getElementById("cartOverlay").classList.add("open");
}

function closeCart() {
  document.getElementById("cartOverlay").classList.remove("open");
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert(
    "Thank you for your order! Your total is " +
      document.getElementById("cartTotalPrice").innerText,
  );
  cart = [];
  updateCartUI();
  closeCart();
}

// Close cart when clicking outside drawer
document.getElementById("cartOverlay").addEventListener("click", function (e) {
  if (e.target === this) {
    closeCart();
  }
});
