export const getCartUserId = () => {
  let cartId = localStorage.getItem('cartUserId');
  if (!cartId) {
    cartId = 'anon_' + Date.now();
    localStorage.setItem('cartUserId', cartId);
  }
  return cartId;
};
