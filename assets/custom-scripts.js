document.addEventListener('DOMContentLoaded', function() {
  const stickyBar = document.getElementById('sticky-atc-bar');
  const productForm = document.querySelector('.product-form');

  if (!stickyBar || !productForm) {
    return; // No hacer nada si los elementos no existen
  }

  const showBarThreshold = productForm.offsetTop + productForm.offsetHeight;

  function toggleStickyBar() {
    if (window.scrollY > showBarThreshold) {
      stickyBar.classList.add('visible');
    } else {
      stickyBar.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleStickyBar, { passive: true });
});

// --- 5. Lógica para "Comprados Juntos Frecuentemente" ---
document.addEventListener('DOMContentLoaded', function() {
  const fbtContainer = document.getElementById('frequently-bought-together');
  if (!fbtContainer) return;

  const mainProductPrice = {{ product.price }};
  const checkboxes = fbtContainer.querySelectorAll('.fbt-checkbox');
  const totalPriceEl = document.getElementById('fbt-total-price');
  const addAllButton = document.getElementById('fbt-add-all-to-cart');

  function updateTotalPrice() {
    let newTotal = mainProductPrice;
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        newTotal += parseInt(checkbox.dataset.price, 10);
      }
    });
    totalPriceEl.textContent = Shopify.formatMoney(newTotal, "{{ shop.money_format }}");
  }

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateTotalPrice);
  });

  addAllButton.addEventListener('click', function() {
    let itemsToAdd = [{
      id: {{ product.selected_or_first_available_variant.id }},
      quantity: 1
    }];

    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        itemsToAdd.push({
          id: parseInt(checkbox.dataset.variantId, 10),
          quantity: 1
        });
      }
    });
    
    let formData = { 'items': itemsToAdd };
    
    fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      window.location.href = '/cart'; // Redirigir al carrito
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });

  updateTotalPrice(); // Calcular el precio inicial
});

// Agregar este script para manejar los clicks en toda la tarjeta
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todas las tarjetas de producto
    const productCards = document.querySelectorAll('.card-wrapper');
    
    productCards.forEach(card => {
        // Encontrar el enlace del producto dentro de la tarjeta
        const productLink = card.querySelector('.card__heading a');
        if (productLink) {
            const productUrl = productLink.href;
            
            // Crear un overlay clickeable para toda la tarjeta
            const overlayLink = document.createElement('a');
            overlayLink.href = productUrl;
            overlayLink.style.position = 'absolute';
            overlayLink.style.top = '0';
            overlayLink.style.left = '0';
            overlayLink.style.width = '100%';
            overlayLink.style.height = '100%';
            overlayLink.style.zIndex = '5';
            overlayLink.style.opacity = '0';
            overlayLink.style.cursor = 'pointer';
            
            card.style.position = 'relative';
            card.appendChild(overlayLink);
            
            // Prevenir doble clic en elementos internos
            card.querySelectorAll('.quick-add__submit, button, .card__badge').forEach(element => {
                element.addEventListener('click', function(e) {
                    e.stopPropagation();
                });
            });
        }
    });
});
