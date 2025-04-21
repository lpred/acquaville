document.addEventListener("DOMContentLoaded", () => {
  const mesaSelect = document.getElementById("mesa");
  for (let i = 1; i <= 20; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `Mesa ${i}`;
    mesaSelect.appendChild(option);
  }

  const cartButton = document.getElementById("cart-button");
  const cartPopup = document.getElementById("cart-popup");
  const closeCart = document.getElementById("fechar-carrinho");
  cartButton.addEventListener("click", () => cartPopup.classList.toggle("hidden"));
  closeCart.addEventListener("click", () => cartPopup.classList.add("hidden"));
});