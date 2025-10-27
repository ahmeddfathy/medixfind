// ==================== Cart Functionality ====================

// Cart data structure
let cart = JSON.parse(localStorage.getItem('medexfind_cart')) || [];

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
    updateCartCount();
});

// Add item to cart
function addToCart(name, price, image) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: Date.now(),
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartDisplay();
    updateCartCount();
    showNotification(`${name} تم إضافته للسلة`, 'success');
}

// Remove item from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartDisplay();
    updateCartCount();
    showNotification('تم حذف العنصر من السلة', 'info');
}

// Update item quantity
function updateQuantity(itemId, newQuantity) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(itemId);
        } else {
            item.quantity = newQuantity;
            saveCart();
            updateCartDisplay();
            updateCartCount();
        }
    }
}

// Clear entire cart
function clearCart() {
    if (cart.length === 0) {
        showNotification('السلة فارغة بالفعل', 'info');
        return;
    }
    
    if (confirm('هل أنت متأكد من مسح جميع العناصر من السلة؟')) {
        cart = [];
        saveCart();
        updateCartDisplay();
        updateCartCount();
        showNotification('تم مسح السلة بالكامل', 'success');
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('medexfind_cart', JSON.stringify(cart));
}

// Update cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCartDiv = document.getElementById('emptyCart');
    const itemsCountSpan = document.getElementById('itemsCount');
    const totalItemsSpan = document.getElementById('totalItems');
    const subtotalSpan = document.getElementById('subtotal');
    const totalAmountSpan = document.getElementById('totalAmount');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (cart.length === 0) {
        cartItemsContainer.style.display = 'none';
        emptyCartDiv.style.display = 'block';
        itemsCountSpan.textContent = '0 عنصر';
        totalItemsSpan.textContent = '0';
        subtotalSpan.textContent = '0 جنيه';
        totalAmountSpan.textContent = '0 جنيه';
        checkoutBtn.disabled = true;
        return;
    }
    
    cartItemsContainer.style.display = 'block';
    emptyCartDiv.style.display = 'none';
    
    // Calculate totals
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal; // No additional fees for free service
    
    // Update counters
    itemsCountSpan.textContent = `${totalItems} عنصر`;
    totalItemsSpan.textContent = totalItems;
    subtotalSpan.textContent = `${subtotal} جنيه`;
    totalAmountSpan.textContent = `${total} جنيه`;
    
    // Enable checkout button
    checkoutBtn.disabled = false;
    
    // Render cart items
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <h4 class="cart-item-name">${item.name}</h4>
                <span class="cart-item-category">دواء</span>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})" ${item.quantity <= 1 ? 'disabled' : ''}>
                    <i class="fas fa-minus"></i>
                </button>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="99" 
                       onchange="updateQuantity(${item.id}, parseInt(this.value))">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <div class="cart-item-price">
                <div class="price-amount">${item.price * item.quantity} جنيه</div>
                <div class="price-per-unit">${item.price} جنيه للوحدة</div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
                حذف
            </button>
        </div>
    `).join('');
}

// Update cart count in header
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('headerCartCount');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
    
    // Update cart count in main script if it exists
    if (typeof updateReminderCount === 'function') {
        updateReminderCount();
    }
}

// Proceed to checkout
function proceedToCheckout() {
    // Prepare order data
    const orderData = {
        items: cart.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            total: item.price * item.quantity
        })),
        totals: {
            items: cart.reduce((sum, item) => sum + item.quantity, 0),
            subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        },
        timestamp: new Date().toISOString()
    };
    
    // Show loading state
    const checkoutBtn = document.getElementById('checkoutBtn');
    const originalText = checkoutBtn.innerHTML;
    checkoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري المعالجة...';
    checkoutBtn.disabled = true;
    
    // Simulate order processing
    setTimeout(() => {
        // Save order to localStorage for demo purposes
        const orders = JSON.parse(localStorage.getItem('medexfind_orders')) || [];
        orders.push(orderData);
        localStorage.setItem('medexfind_orders', JSON.stringify(orders));
        
        // Clear cart after successful order
        cart = [];
        saveCart();
        updateCartDisplay();
        updateCartCount();
        
        // Show success message
        showOrderSuccessModal(orderData);
        
        // Reset button
        checkoutBtn.innerHTML = originalText;
        checkoutBtn.disabled = false;
        
    }, 2000);
}

// Show order success modal
function showOrderSuccessModal(orderData) {
    const modalContent = `
        <div class="order-success-modal">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>تم تأكيد الطلب بنجاح!</h2>
            <div class="order-details">
                <div class="detail-row">
                    <span>رقم الطلب:</span>
                    <span>#${Date.now().toString().slice(-6)}</span>
                </div>
                <div class="detail-row">
                    <span>عدد الأدوية:</span>
                    <span>${orderData.totals.items}</span>
                </div>
                <div class="detail-row">
                    <span>المجموع:</span>
                    <span>${orderData.totals.total} جنيه</span>
                </div>
            </div>
            <p class="success-message">
                تم حفظ طلبك بنجاح. يمكنك الآن التواصل مع الصيدليات مباشرة لطلب الأدوية.
            </p>
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="closeOrderModal()">
                    <i class="fas fa-home"></i>
                    العودة للرئيسية
                </button>
                <button class="btn btn-secondary" onclick="window.print()">
                    <i class="fas fa-print"></i>
                    طباعة الطلب
                </button>
            </div>
        </div>
    `;
    
    showModal(modalContent);
}

// Close order modal
function closeOrderModal() {
    closeModal();
    // Redirect to home page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
        max-width: 400px;
        font-size: 14px;
    `;
    
    const icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}


// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    .order-success-modal {
        text-align: center;
        padding: 40px;
        max-width: 500px;
        margin: 0 auto;
    }
    
    .success-icon {
        font-size: 80px;
        color: #28a745;
        margin-bottom: 20px;
    }
    
    .order-success-modal h2 {
        font-size: 28px;
        color: #424242;
        margin-bottom: 25px;
        font-weight: 700;
    }
    
    .order-details {
        background: #f8f9fa;
        border-radius: 12px;
        padding: 20px;
        margin-bottom: 25px;
    }
    
    .detail-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid #e9ecef;
    }
    
    .detail-row:last-child {
        border-bottom: none;
    }
    
    .detail-row span:first-child {
        color: #666;
        font-weight: 500;
    }
    
    .detail-row span:last-child {
        color: #424242;
        font-weight: 700;
    }
    
    .success-message {
        color: #666;
        line-height: 1.6;
        margin-bottom: 30px;
        font-size: 16px;
    }
    
    .modal-actions {
        display: flex;
        gap: 15px;
        justify-content: center;
        flex-wrap: wrap;
    }
    
    @media (max-width: 480px) {
        .modal-actions {
            flex-direction: column;
        }
        
        .modal-actions .btn {
            width: 100%;
        }
    }
`;
document.head.appendChild(style);
