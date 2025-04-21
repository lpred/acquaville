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
  const cartItemsList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");
  const menuItems = document.getElementById("menu-items");
  const clienteNome = document.getElementById("cliente-nome");
  const observacoes = document.getElementById("observacoes");
  const finalizarPedido = document.getElementById("finalizar-pedido");

  let cart = [];

  const menu = [
    { id: 1, name: "Refrigerante", price: 5.00 },
    { id: 2, name: "Pizza Margherita", price: 30.00 },
    { id: 3, name: "Batata Frita", price: 15.00 },
    { id: 4, name: "Suco Natural", price: 8.00 },
  ];

  const renderMenu = () => {
    menu.forEach(item => {
      const div = document.createElement("div");
      div.className = "menu-item";
      div.innerHTML = `<h3>${item.name}</h3><p>R$ ${item.price.toFixed(2)}</p>`;
      div.addEventListener("click", () => addToCart(item));
      menuItems.appendChild(div);
    });
  };

  const addToCart = (item) => {
    cart.push(item);
    updateCart();
  };

  const updateCart = () => {
    cartItemsList.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
      total += item.price;
      const li = document.createElement("li");
      li.innerHTML = `${item.name} - R$ ${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">Remover</button>`;
      cartItemsList.appendChild(li);
    });
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;
  };

  window.removeFromCart = (index) => {
    cart.splice(index, 1);
    updateCart();
  };

  cartButton.addEventListener("click", () => cartPopup.classList.toggle("hidden"));
  closeCart.addEventListener("click", () => cartPopup.classList.add("hidden"));

  finalizarPedido.addEventListener("click", () => {
    if (!clienteNome.value) {
      alert("Por favor, informe seu nome.");
      return;
    }
    if (cart.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const mensagem = `Pedido de ${clienteNome.value} (Mesa ${mesaSelect.value}):\n\n` +
      cart.map(item => `${item.name}: R$ ${item.price.toFixed(2)}`).join("\n") +
      `\n\nTotal: R$ ${total.toFixed(2)}\nObservações: ${observacoes.value || "Nenhuma"}`;
    const encodedMessage = encodeURIComponent(mensagem);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=SEU_NUMERO&text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  });

  renderMenu();
});