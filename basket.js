'use strict';
const basketCartIconWrap = document.querySelector('.cartIconWrap span');
const basketTotal = document.querySelector('.basketTotal');
const basketTotalValue = document.querySelector('.basketTotalValue');
const baskets = document.querySelector('.basket');

document.querySelector('.cartIconWrap').addEventListener('click', () => {
  baskets.classList.toggle('hidden');
});

const basket = {};

document.querySelector('.featuredItems').addEventListener('click', event => {
  if (!event.target.closest('.addToCart')) {
    return;
  }

  const featuredItems = event.target.closest('.featuredItem');
  const id = +featuredItems.dataset.id;
  const name = featuredItems.dataset.name;
  const price = +featuredItems.dataset.price;
  addToCart(id, name, price);
});

function addToCart(id, name, price) {
  if (!(id in basket)) {
    basket[id] = {id: id, name: name, price: price, count: 0};
  }
  basket[id].count++;
  basketCartIconWrap.textContent = getTotalBasketCount().toString();
  basketTotalValue.textContent = getTotalBasketPrice().toFixed(2);
  renderBasket(id);
}

function getTotalBasketCount() {
  return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}

function getTotalBasketPrice() {
  return Object
    .values(basket)
    .reduce((acc, product) => acc + product.price * product.count, 0);
}

function renderBasket(productId) {
  const basketsRow = baskets
    .querySelector(`.basketRow[data-id="${productId}"]`);
  if (!basketsRow) {
    renderNewBasket(productId);
    return;
  }

  const product = basket[productId];
  basketsRow.querySelector('.productCount').textContent = product.count;
  basketsRow
    .querySelector('.productTotalRow')
    .textContent = (product.price * product.count).toFixed(2);
}

function renderNewBasket(productId) {
  const productRow = `
    <div class="basketRow" data-id="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
  basketTotal.insertAdjacentHTML("beforebegin", productRow);
}

