// Function to get URL parameters
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to create star rating HTML
function createStarRating(rating) {
    const fullStars = Math.floor(rating);
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            starsHtml += '<i class="fas fa-star"></i>';
        } else {
            starsHtml += '<i class="far fa-star"></i>';
        }
    }
    return starsHtml;
}

// Function to load product details
async function loadProductDetails() {
    try {
        const productId = getUrlParam('product');
        if (!productId) {
            throw new Error('Product ID not found');
        }

        const response = await fetch('/data/products.json');
        const products = await response.json();
        const product = products[productId];

        if (!product) {
            throw new Error('Product not found');
        }

        // Update product details
        document.querySelector('.product-title').textContent = product.name;
        document.querySelector('.product-price').textContent = `${product.price} FCFA`;
        document.querySelector('.product-description').textContent = product.description;
        document.querySelector('.product-rating').innerHTML = createStarRating(product.rating);
        document.querySelector('.review-count').textContent = `(${product.reviews} avis)`;
        document.querySelector('.product-image').src = product.image;
        document.querySelector('.product-image').alt = product.name;

        // Update features list
        const featuresList = document.querySelector('.features-list');
        featuresList.innerHTML = product.features.map(feature => 
            `<li><i class="fas fa-check"></i> ${feature}</li>`
        ).join('');

        // Update origin information
        document.querySelector('.origin-country').textContent = product.origin.country;
        document.querySelector('.origin-processing').textContent = product.origin.processing;

        // Load related products
        loadRelatedProducts(products, product.related);

    } catch (error) {
        console.error('Error loading product details:', error);
        document.querySelector('.product-detail').innerHTML = '<p>Désolé, produit non trouvé.</p>';
    }
}

// Function to load related products
function loadRelatedProducts(products, relatedIds) {
    const relatedContainer = document.querySelector('.related-products');
    relatedContainer.innerHTML = '';

    relatedIds.forEach(id => {
        const relatedProduct = products[id];
        if (relatedProduct) {
            const productCard = document.createElement('div');
            productCard.className = 'related-product-card';
            productCard.innerHTML = `
                <a href="product-detail.html?product=${relatedProduct.id}" class="product-link">
                    <img src="${relatedProduct.image}" alt="${relatedProduct.name}" class="related-product-img">
                    <h3>${relatedProduct.name}</h3>
                    <p class="price">${relatedProduct.price} FCFA</p>
                </a>
            `;
            relatedContainer.appendChild(productCard);
        }
    });
}

// Load product details when page loads
document.addEventListener('DOMContentLoaded', loadProductDetails);

// Cart functionality
function addToCart(productId, quantity = 1) {
    let cart = JSON.parse(localStorage.getItem('cart') || '{}');
    cart[productId] = (cart[productId] || 0) + quantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', updateCartUI);
