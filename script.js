// ===== Variables Globales =====
let data = null;
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ===== Inicialización =====
document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    initializeApp();
    updateCartCount();
});

// ===== Carga de Datos desde JSON =====
async function loadData() {
    try {
        const response = await fetch('data.json');
        data = await response.json();
        console.log('Datos cargados:', data);
    } catch (error) {
        console.error('Error al cargar datos:', error);
        showError('No se pudieron cargar los datos. Por favor, recarga la página.');
    }
}

// ===== Inicialización de la Aplicación =====
function initializeApp() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Menú móvil
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Inicializar según la página
    if (currentPage === 'index.html' || currentPage === '') {
        initHomePage();
    } else if (currentPage === 'productos.html') {
        initProductsPage();
    } else if (currentPage === 'contacto.html') {
        initContactPage();
    } else if (currentPage === 'carrito.html') {
        initCartPage();
    }
}

// ===== Página de Inicio =====
function initHomePage() {
    loadCategories();
    loadFeaturedProducts();
    loadFooterCategories();
}

// Cargar categorías
function loadCategories() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    if (!categoriesGrid || !data) return;

    categoriesGrid.innerHTML = '';
    
    data.categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card fade-in';
        categoryCard.innerHTML = `
            <i class="${category.icon}"></i>
            <h3>${category.name}</h3>
            <p>${category.description}</p>
        `;
        categoryCard.addEventListener('click', () => {
            window.location.href = `productos.html?category=${category.id}`;
        });
        categoriesGrid.appendChild(categoryCard);
    });
}

// Cargar productos destacados
function loadFeaturedProducts() {
    const featuredProducts = document.getElementById('featuredProducts');
    if (!featuredProducts || !data) return;

    featuredProducts.innerHTML = '';
    
    const featured = data.products.filter(p => p.featured).slice(0, 6);
    
    featured.forEach(product => {
        const productCard = createProductCard(product);
        featuredProducts.appendChild(productCard);
    });
}

// Cargar categorías en el footer
function loadFooterCategories() {
    const footerCategories = document.getElementById('footerCategories');
    if (!footerCategories || !data) return;

    footerCategories.innerHTML = '';
    
    data.categories.slice(0, 4).forEach(category => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="productos.html?category=${category.id}">${category.name}</a>`;
        footerCategories.appendChild(li);
    });
}

// ===== Página de Productos =====
function initProductsPage() {
    loadAllProducts();
    setupFilters();
    loadFooterCategories();
}

// Cargar todos los productos
function loadAllProducts(filterCategory = null, searchTerm = '') {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid || !data) return;

    productsGrid.innerHTML = '';
    
    let filteredProducts = data.products;
    
    // Filtrar por categoría
    if (filterCategory) {
        filteredProducts = filteredProducts.filter(p => p.category === parseInt(filterCategory));
    }
    
    // Filtrar por búsqueda
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    // Mostrar productos
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <i class="fas fa-box-open"></i>
                <h3>No se encontraron productos</h3>
                <p>Intenta con otros filtros o búsqueda</p>
            </div>
        `;
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Configurar filtros
function setupFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('searchInput');
    
    // Cargar categorías en filtros
    if (categoryFilter && data) {
        categoryFilter.innerHTML = '<option value="">Todas las categorías</option>';
        data.categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.name;
            categoryFilter.appendChild(option);
        });
        
        // Verificar parámetro de URL
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        if (categoryParam) {
            categoryFilter.value = categoryParam;
        }
        
        categoryFilter.addEventListener('change', applyFilters);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
    
    // Aplicar filtros iniciales
    applyFilters();
}

// Aplicar filtros
function applyFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('searchInput');
    
    const category = categoryFilter ? categoryFilter.value : null;
    const search = searchInput ? searchInput.value : '';
    
    loadAllProducts(category, search);
}

// ===== Crear Tarjeta de Producto =====
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card fade-in';
    
    const stockStatus = product.stock > 5 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-stock';
    const stockText = product.stock > 5 ? 'En stock' : product.stock > 0 ? `Solo ${product.stock} disponibles` : 'Agotado';
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-meta">
                <span class="product-badge">${product.condition}</span>
                <span class="product-badge">${product.year}</span>
            </div>
            <div class="product-details">
                <span class="product-price">${product.currency}${product.price.toLocaleString()}</span>
                <span class="product-stock ${stockStatus}">${stockText}</span>
            </div>
            <button class="btn-add-cart" onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
                <i class="fas fa-shopping-cart"></i> ${product.stock === 0 ? 'Agotado' : 'Agregar al carrito'}
            </button>
        </div>
    `;
    
    return card;
}

// ===== Carrito de Compras =====
function addToCart(productId) {
    const product = data.products.find(p => p.id === productId);
    if (!product) return;
    
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
        if (cartItem.quantity < product.stock) {
            cartItem.quantity++;
        } else {
            showNotification('No hay más stock disponible', 'warning');
            return;
        }
    } else {
        cart.push({
            id: product.id,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    showNotification('Producto agregado al carrito', 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    
    if (window.location.pathname.includes('carrito.html')) {
        initCartPage();
    }
}

function updateQuantity(productId, change) {
    const cartItem = cart.find(item => item.id === productId);
    if (!cartItem) return;
    
    const product = data.products.find(p => p.id === productId);
    const newQuantity = cartItem.quantity + change;
    
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }
    
    if (newQuantity > product.stock) {
        showNotification('No hay más stock disponible', 'warning');
        return;
    }
    
    cartItem.quantity = newQuantity;
    saveCart();
    initCartPage();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// ===== Página del Carrito =====
function initCartPage() {
    if (!data) return;
    
    const cartItemsContainer = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-shopping-cart"></i>
                <h3>Tu carrito está vacío</h3>
                <p>Agrega productos para comenzar tu compra</p>
                <a href="productos.html" class="btn-primary">Ver Productos</a>
            </div>
        `;
        if (cartSummary) cartSummary.style.display = 'none';
        return;
    }
    
    let subtotal = 0;
    
    cart.forEach(item => {
        const product = data.products.find(p => p.id === item.id);
        if (!product) return;
        
        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item fade-in';
        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="cart-item-image">
            <div class="cart-item-info">
                <h3 class="cart-item-name">${product.name}</h3>
                <p>${product.condition} - ${product.year}</p>
                <p class="cart-item-price">${product.currency}${product.price.toLocaleString()} c/u</p>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${product.id}, -1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${product.id}, 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <button class="btn-remove" onclick="removeFromCart(${product.id})">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </div>
            <div class="cart-item-total">
                <strong>${product.currency}${itemTotal.toLocaleString()}</strong>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Actualizar resumen
    if (cartSummary) {
        const tax = subtotal * 0.19; // 19% IVA
        const shipping = subtotal > 1000 ? 0 : 50;
        const total = subtotal + tax + shipping;
        
        cartSummary.innerHTML = `
            <h3>Resumen del Pedido</h3>
            <div class="summary-line">
                <span>Subtotal:</span>
                <span>$${subtotal.toLocaleString()}</span>
            </div>
            <div class="summary-line">
                <span>IVA (19%):</span>
                <span>$${tax.toLocaleString()}</span>
            </div>
            <div class="summary-line">
                <span>Envío:</span>
                <span>${shipping === 0 ? 'Gratis' : '$' + shipping}</span>
            </div>
            <div class="summary-line summary-total">
                <span>Total:</span>
                <span>$${total.toLocaleString()}</span>
            </div>
            <button class="btn-primary" onclick="checkout()">
                <i class="fas fa-credit-card"></i> Proceder al Pago
            </button>
        `;
    }
    
    loadFooterCategories();
}

function checkout() {
    showNotification('Funcionalidad de pago en desarrollo', 'info');
}

// ===== Página de Contacto =====
function initContactPage() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    loadFooterCategories();
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    console.log('Formulario enviado:', formData);
    showNotification('Mensaje enviado correctamente. Te contactaremos pronto.', 'success');
    
    e.target.reset();
}

// ===== Menú Móvil =====
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('active');
}

// ===== Notificaciones =====
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#00ff88' : type === 'warning' ? '#ffaa00' : '#00d4ff'};
        color: #1a1a2e;
        border-radius: 8px;
        font-weight: bold;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #ff4444;
        color: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        z-index: 10000;
        max-width: 500px;
    `;
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
        <h3>Error</h3>
        <p>${message}</p>
        <button onclick="location.reload()" class="btn-primary" style="margin-top: 1rem;">
            Recargar Página
        </button>
    `;
    
    document.body.appendChild(errorDiv);
}

// ===== Estilos adicionales para animaciones =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
