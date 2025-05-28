// Search Overlay Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchIcon = document.querySelector('.search-icon');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearch = document.querySelector('.close-search');
    const searchInput = document.querySelector('.search-input');

    // Open search overlay
    searchIcon.addEventListener('click', function(e) {
        e.preventDefault();
        searchOverlay.classList.add('active');
        searchInput.focus();
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    // Close search overlay
    closeSearch.addEventListener('click', function() {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Cart badge update (example)
    const cartIcon = document.querySelector('.cart-icon');
    // Add this class to show the badge
    // cartIcon.classList.add('has-items');
});

// Mobile menu functionality
const menuToggle = document.querySelector('.menu-toggle');
const navClose = document.querySelector('.nav-close');
const nav = document.querySelector('nav');
const body = document.body;

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.add('active');
        body.style.overflow = 'hidden';
    });
}

if (navClose && nav) {
    navClose.addEventListener('click', () => {
        nav.classList.remove('active');
        body.style.overflow = '';
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (nav && nav.classList.contains('active')) {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
            nav.classList.remove('active');
            body.style.overflow = '';
        }
    }
});

// Shopping Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart in localStorage if it doesn't exist
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }

    // Quantity controls
    document.querySelectorAll('.quantity-controls').forEach(controls => {
        const minusBtn = controls.querySelector('.minus');
        const plusBtn = controls.querySelector('.plus');
        const input = controls.querySelector('.qty-input');

        minusBtn.addEventListener('click', () => {
            let value = parseInt(input.value);
            if (value > 1) {
                input.value = value - 1;
            }
        });

        plusBtn.addEventListener('click', () => {
            let value = parseInt(input.value);
            input.value = value + 1;
        });

        input.addEventListener('change', () => {
            let value = parseInt(input.value);
            if (value < 1 || isNaN(value)) {
                input.value = 1;
            }
        });
    });

    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const product = {
                id: Date.now(), // Temporary ID until we have real product IDs
                name: productCard.querySelector('h3').textContent,
                price: productCard.querySelector('.current-price').textContent,
                quantity: parseInt(productCard.querySelector('.qty-input').value),
                image: productCard.querySelector('.product-img').src
            };

            addToCart(product);
            updateCartBadge();
            showAddToCartFeedback(button);
        });
    });

    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCartBadge() {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const cartIcon = document.querySelector('.cart-icon');
        if (cart.length > 0) {
            cartIcon.classList.add('has-items');
        } else {
            cartIcon.classList.remove('has-items');
        }
    }

    function showAddToCartFeedback(button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="bi bi-check"></i> Ajouté';
        button.style.backgroundColor = '#28a745';
        button.disabled = true;

        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.backgroundColor = '';
            button.disabled = false;
        }, 2000);
    }

    // Initialize cart badge on page load
    updateCartBadge();
});
