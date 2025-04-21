const menu = document.getElementById("menu");
const cartPopup = document.getElementById("cart-popup");
const cartButton = document.getElementById("cart-button");
const closeCartButton = document.getElementById("close-cart");
const sendWhatsApp = document.getElementById("send-whatsapp");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

let cart = [];

// Sample categories and products
let categories = {
  Lanches: [
    { name: "X-Burguer", price: 15 },
    { name: "X-Salada", price: 17 }
  ],
  Bebidas: [
    { name: "Refrigerante", price: 6 },
    { name: "Água", price: 3 }
  ]
};

function renderMenu() {
  menu.innerHTML = "";
  for (let cat in categories) {
    const section = document.createElement("section");
    section.innerHTML = `<h2>${cat}</h2>`;
    categories[cat].forEach(prod => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `<strong>${prod.name}</strong> - R$ ${prod.price.toFixed(2)} 
        <button onclick='addToCart("${prod.name}", ${prod.price})'>Adicionar</button>`;
      section.appendChild(div);
    });
    menu.appendChild(section);
  }
}

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  updateCart();
}

function updateCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.qty;
    const div = document.createElement("div");
    div.innerHTML = `
      ${item.name} x ${item.qty} - R$ ${(item.price * item.qty).toFixed(2)}
      <button onclick='removeFromCart(${index})'>Remover</button>
    `;
    cartItemsContainer.appendChild(div);
  });
  cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
  cartCount.textContent = cart.reduce((acc, cur) => acc + cur.qty, 0);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

cartButton.onclick = () => {
  cartPopup.classList.toggle("visible");
};

closeCartButton.onclick = () => {
  cartPopup.classList.remove("visible");
};

sendWhatsApp.onclick = () => {
  const name = document.getElementById("client-name").value;
  const notes = document.getElementById("order-notes").value;
  let msg = `Pedido de ${name || "Cliente"}:%0A`;
  cart.forEach(item => {
    msg += `- ${item.name} x ${item.qty} = R$ ${(item.price * item.qty).toFixed(2)}%0A`;
  });
  msg += `%0ATotal: R$ ${cart.reduce((acc, cur) => acc + cur.price * cur.qty, 0).toFixed(2)}%0A`;
  if (notes) msg += `%0AObservações: ${notes}`;
  window.open(`https://wa.me/5599999999999?text=${msg}`, "_blank");
};

renderMenu();
