document.addEventListener("DOMContentLoaded", () => {
  const homeBtn = document.getElementById("homeBtn")
  const cartBtn = document.getElementById("cartBtn")
  const homeScreen = document.getElementById("homeScreen")
  const cartScreen = document.getElementById("cartScreen")
  const cartItemsContainer = document.querySelector(".cart-items")
  const cartTotal = document.querySelector(".cart-total")
  const checkoutBtn = document.getElementById("checkoutBtn")

  let cart = []

  function activateButton(btn) {
    homeBtn.classList.remove("active")
    cartBtn.classList.remove("active")
    btn.classList.add("active")
  }

  homeBtn.addEventListener("click", () => {
    homeScreen.style.display = "block"
    cartScreen.style.display = "none"
    activateButton(homeBtn)
  })

  cartBtn.addEventListener("click", () => {
    homeScreen.style.display = "none"
    cartScreen.style.display = "block"
    activateButton(cartBtn)
  })

  // Добавление товаров в корзину
  const addButtons = document.querySelectorAll("#homeScreen button")
  addButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".card")
      const title = card.querySelector(".title").textContent
      const priceText = card.querySelector(".price").textContent
      const price = parseInt(priceText.replace(/\D/g, ""))
      const imgSrc = card.querySelector("img").src

      cart.push({ title, price, imgSrc })
      renderCart()
    })
  })

  // Отрисовка корзины
  function renderCart() {
    cartItemsContainer.innerHTML = ""
    let total = 0

    cart.forEach((item, index) => {
      total += item.price
      const div = document.createElement("div")
      div.classList.add("cart-item")
      div.innerHTML = `
        <img src="${item.imgSrc}" alt="${item.title}">
        <div class="item-info">
          <div>${item.title}</div>
          <div>${item.price} ₽</div>
        </div>
        <button class="remove-btn">×</button>
      `
      cartItemsContainer.appendChild(div)

      // Удаление товара
      div.querySelector(".remove-btn").addEventListener("click", () => {
        cart.splice(index, 1)
        renderCart()
      })
    })

    cartTotal.textContent = `Итого: ${total} ₽`
  }

  // Кнопка оформить заказ
  checkoutBtn.addEventListener("click", () => {
    if(cart.length === 0) {
      alert("Корзина пуста!")
      return
    }
    let total = cart.reduce((sum, item) => sum + item.price, 0)
    alert(`Вы оформили заказ на сумму: ${total} ₽`)
    cart = []
    renderCart()
  })
})
