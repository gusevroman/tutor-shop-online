const toCurrency = (price) => new Intl.NumberFormat(
  'eu-EU',
  {
    currency: 'EUR',
    style: 'currency',
  },
).format(price);

const toDate = (date) => new Intl.DateTimeFormat(
  'eu-EU',
  {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  },
).format(date);

document.querySelectorAll('.price').forEach((node) => {
  node.textContent = toCurrency(node.textContent);
});

document.querySelectorAll('.date').forEach((node) => {
  node.textContent = toDate(node.textContenT);
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
