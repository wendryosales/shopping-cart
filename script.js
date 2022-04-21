const sectionItems = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');
const sectionCart = document.querySelector('.cart');
const price = document.querySelector('.total-price');
const inputSearch = document.querySelector('.search');

// sum of items in cart
const sumTotalAmount = () => {
  const items = document.querySelectorAll('.cart__item');
  let result = 0;
  items.forEach((element) => {
    const valueText = element.innerText;
    const indexOF = valueText.indexOf('$') + 1;
    const captureValue = valueText.substr(indexOF);
    const valueNumber = Number(captureValue);
    result += valueNumber;
  });
  return result.toFixed(2);
};
const uptTotalCheck = () => {
  price.innerHTML = `Valor Total: R$ ${sumTotalAmount()}`;
};

// save the item of cart in local storage

const uptLocalStorage = () => {
  const products = sectionCart.firstElementChild.innerHTML;
  saveCartItems(products);
};

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// remove o item do carrinho
function cartItemClickListener(event) {
  event.target.parentElement.removeChild(event.target);
  uptLocalStorage();
  uptTotalCheck();
}

function createCartItemElement({ sku, name, salePrice, image }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `${name}

  R$${salePrice}`;
  li.appendChild(createProductImageElement(image));
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// coloca o item no carrinho
const addCartShopping = async (event) => {
  const id = getSkuFromProductItem(event.target.parentElement);
  const data = await fetchItem(id);
  const param = { sku: id, name: data.title, salePrice: data.price, image: data.secure_thumbnail };
  const result = createCartItemElement(param);
  cartItems.appendChild(result);
  uptLocalStorage();
  uptTotalCheck();
};

function createProductItemElement({ sku, name, image, prices }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('span', 'item__price', `R$${prices}`));
  const classe = 'item__add effect effect2';
  section.appendChild(createCustomElement('button', classe, 'Adicionar ao carrinho!'));
  return section;
}

// chama todos elementos pesquisados na página e adiciona o event
const appendSectionItem = async (product) => {
  const data = await fetchProducts(product);
  data.results.forEach((element) => {
  const img = `https://http2.mlstatic.com/D_NQ_NP_${element.thumbnail_id}-O.webp`;
  const priceSale = element.price.toFixed(2);
  const param = { sku: element.id, name: element.title, image: img, prices: priceSale };
  const results = createProductItemElement(param);
  sectionItems.appendChild(results);
  });
  const btn = document.querySelectorAll('.item__add');
  btn.forEach((element) => element.addEventListener('click', addCartShopping));
};

function loadItems() {
  const productsOnCart = getSavedCartItems();
  cartItems.innerHTML = productsOnCart;
  const liChildren = document.querySelectorAll('.cart__item');
  liChildren.forEach((element) => {
    element.addEventListener('click', cartItemClickListener);
  });
  uptTotalCheck();
}

const removeAllItemsCart = () => {
  cartItems.innerHTML = '';
  uptTotalCheck();
  uptLocalStorage();
};

function eventRemoveItemsCart() {
  const btn = document.querySelector('.empty-cart');
  btn.addEventListener('click', removeAllItemsCart);
}

const removeLoadScreen = () => {
  sectionItems.innerHTML = '';
};

const loadScreen = () => {
  const valueSearch = localStorage.getItem('search');
  setTimeout(() => {
    removeLoadScreen();
    if (valueSearch === null) {
      appendSectionItem('computador');
    } appendSectionItem(valueSearch);
  }, 1000);
};

const addloadScreen = () => {
  const load = createCustomElement('div', 'loading', 'carregando...');
  sectionItems.appendChild(load);
};

const searchItem = () => {
  localStorage.setItem('search', inputSearch.value);
  removeLoadScreen();
  appendSectionItem(inputSearch.value);
  inputSearch.value = '';
};

// keycode do enter é o 13

const seachItemWithEnter = (event) => {
  const key = event.keyCode;
  if (key === 13) {
    localStorage.setItem('search', inputSearch.value);
    removeLoadScreen();
    appendSectionItem(inputSearch.value);
    inputSearch.value = '';
  }
};

const loadEventSearch = () => {
  const icon = document.querySelector('.search-icon');
  icon.addEventListener('click', searchItem);
  inputSearch.addEventListener('keyup', seachItemWithEnter);
};

window.onload = () => {
  addloadScreen();
  loadScreen();
  getSavedCartItems();
  loadItems();
  eventRemoveItemsCart();
  loadEventSearch();
 };
