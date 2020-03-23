const toCurrency = (price) => new Intl.NumberFormat(
  'eu-EU',
  {
    currency: 'EUR',
    style: 'currency',
  },
).format(price);

document.querySelectorAll('.price').forEach((el) => {
  el.textContent = toCurrency(el.textContent);
});


const $cart = document.querySelector('#cart');
if ($cart) {
  $cart.addEventListener('click', (event) => {
    if (event.target.classList.contains('js-remove')) {
      const { id } = event.target.dataset;

      fetch(`/cart/remove/${id}`,
        {
          method: 'delete',
        })
        .then((res) => res.json())
        .then((cart) => {
          if (cart.courses.length) {
            const cartHtml = cart.courses.map((el) => `
              <tr>
                <td>${el.title}</td>
                <td>${el.price}</td>
                <td>${el.count}</td>
                <td>
                  <button class="btn btn-small js-remove" data-id="${el.id}">Delete</button>
                </td>
              </tr>`).join('');
            $cart.querySelector('tbody').innerHTML = cartHtml;
            $cart.querySelector('.price').textContent = toCurrency(cart.price);
          } else {
            $cart.innerHTML = '<p>Shopping cart is empty</p>';
          }
        });
    }
  });
}
