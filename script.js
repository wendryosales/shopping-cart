const sectionItems = document.querySelector('.items');

// link para imagem melhor 
// https://http2.mlstatic.com/D_NQ_NP_ [ 877740-MLB46839461389_072021] -O.webp
// [ thumnail id ]

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

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

/* function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
} */

/* function cartItemClickListener(event) {
  // coloque seu código aqui
} */

/* function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
} */

const appendSectionItem = async (product) => {
  const data = await fetchProducts(product);
  console.log(data);
  data.forEach((element) => {
  const param = { sku: element.id, name: element.title, image: element.thumbnail };
  const results = createProductItemElement(param);
  sectionItems.appendChild(results);
  });
};
window.onload = () => { appendSectionItem('computador'); };
