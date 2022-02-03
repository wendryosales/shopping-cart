const sectionItems = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');
const sectionCart = document.querySelector('.cart');

// link para imagem melhor 
// https://http2.mlstatic.com/D_NQ_NP_ [ 877740-MLB46839461389_072021] -O.webp
// [ thumnail id ]

// salva o item do carrinho no local storage

const uptLocalStorage = () => {
  const products = sectionCart.firstElementChild.innerText;
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
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// coloca o item no carrinho
const addCartShopping = async (event) => {
  const id = getSkuFromProductItem(event.target.parentElement);
  const data = await fetchItem(id);
  const param = { sku: id, name: data.title, salePrice: data.price };
  const result = createCartItemElement(param);
  cartItems.appendChild(result);
  uptLocalStorage();
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}

// chama todos elementos pesquisados na página e adiciona o event
const appendSectionItem = async (product) => {
  const data = await fetchProducts(product);
  data.results.forEach((element) => {
  const param = { sku: element.id, name: element.title, image: element.thumbnail };
  const results = createProductItemElement(param);
  sectionItems.appendChild(results);
  });
  const btn = document.querySelectorAll('.item__add');
  btn.forEach((element) => element.addEventListener('click', addCartShopping));
};

window.onload = () => { 
  appendSectionItem('computador');
 };
