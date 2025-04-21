document.addEventListener("DOMContentLoaded", () => {
  const mesaSelect = document.getElementById("mesa");
  const cartMesaSelect = document.getElementById("cart-mesa");
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
  const testarPedido = document.getElementById("testar-pedido");

  let cart = [];

  const menu = [
    {
      category: "Executivos",
      items: [
        { id: 1, name: "Executivo Adulto", price: 38.00 },
        { id: 2, name: "Executivo Kids", price: 28.00 },
      ],
    },
    {
      category: "Petiscos",
      items: [
        { id: 3, name: "Carne de Sol com Fritas", price: 50.00 },
        { id: 4, name: "Calabresa Toscana", price: 50.00 },
      ],
    },
  ];

  const populateMesaSelect = (selectElement) => {
    for (let i = 1; i <= 20; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = `Mesa ${i}`;
      selectElement.appendChild(option);
    }
  };

  const renderMenu = () => {
    menu.forEach(category => {
      const categoryDiv = document.createElement("div");
      categoryDiv.className = "category";
      categoryDiv.innerHTML = `<h3>${category.category}</h3>`;
      const itemsDiv = document.createElement("div");
      itemsDiv.className = "category-items";
      category.items.forEach(item => {
        const div = document.createElement("div");
        div.className = "menu-item";
        div.innerHTML = `<div><h4>${item.name}</h4><p>R$ ${item.price.toFixed(2)}</p></div><button><i class="fas fa-plus"></i></button>`;
        div.querySelector("button").addEventListener("click", () => addToCart(item));
        itemsDiv.appendChild(div);
      });
      categoryDiv.appendChild(itemsDiv);
      menuItems.appendChild(categoryDiv);
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
      li.innerHTML = `${item.name} - R$ ${item.price.toFixed(2)} <button onclick="removeFromCart(${index})"><i class="fas fa-trash"></i></button>`;
      cartItemsList.appendChild(li);
    });
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;
  };

  window.removeFromCart = (index) => {
    cart.splice(index, 1);
    updateCart();
  };

  const generateOrderMessage = () => {
    if (!clienteNome.value) {
      alert("Por favor, informe seu nome.");
      return null;
    }
    if (cart.length === 0) {
      alert("Seu carrinho está vazio!");
      return null;
    }
    const mesa = cartMesaSelect.value || mesaSelect.value;
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    return `Pedido de ${clienteNome.value} (Mesa ${mesa}):\n\n` +
      cart.map(item => `${item.name}: R$ ${item.price.toFixed(2)}`).join("\n") +
      `\n\nTotal: R$ ${total.toFixed(2)}\nObservações: ${observacoes.value || "Nenhuma"}`;
  };

  cartButton.addEventListener("click", () => cartPopup.classList.toggle("hidden"));
  closeCart.addEventListener("click", () => cartPopup.classList.add("hidden"));

  finalizarPedido.addEventListener("click", () => {
    const mensagem = generateOrderMessage();
    if (mensagem) {
      const encodedMessage = encodeURIComponent(mensagem);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=SEU_NUMERO&text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");
    }
  });

  testarPedido.addEventListener("click", () => {
    const mensagem = generateOrderMessage();
    if (mensagem) {
      alert("Mensagem de teste:\n\n" + mensagem);
    }
  });

  populateMesaSelect(mesaSelect);
  populateMesaSelect(cartMesaSelect);
  renderMenu();
});