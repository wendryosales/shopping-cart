const saveCartItems = (productInTheCart) => {
  localStorage.setItem('cartItems', productInTheCart);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
