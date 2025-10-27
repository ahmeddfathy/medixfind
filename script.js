// ==================== Mobile Menu Toggle ====================
const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        mobileMenu.classList.remove('active');
    }
});

// ==================== FAQ Accordion ====================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// ==================== Cart System ====================
let cart = JSON.parse(localStorage.getItem('medexfind_cart')) || [];

function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}

// Add to cart function
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
    
    localStorage.setItem('medexfind_cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${name} تم إضافته للسلة`, 'success');
}

// Initialize cart count on load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});

// ==================== Medication Reminders ====================
let reminders = JSON.parse(localStorage.getItem('medicationReminders')) || [];

function updateReminderCount() {
    const reminderCountElement = document.querySelector('.cart-count');
    if (reminderCountElement) {
        reminderCountElement.textContent = reminders.length;
    }
}

// Initialize reminder count on load
updateReminderCount();

// Open reminder modal
function openReminderModal() {
    const remindersList = reminders.map((r, i) => 
        `<div style="padding: 10px; border-bottom: 1px solid #ddd;">
            <strong>${r.name}</strong><br>
            <small>الجرعة: ${r.dosage} - الوقت: ${r.time}</small>
            <button onclick="deleteReminder(${i})" style="float: left; color: red; border: none; background: none; cursor: pointer;">
                <i class="fas fa-trash"></i>
            </button>
        </div>`
    ).join('');
    
    const modalContent = `
        <div style="background: white; padding: 30px; border-radius: 16px; max-width: 500px; max-height: 80vh; overflow-y: auto;">
            <h2 style="color: #48cfcb; margin-bottom: 20px;">
                <i class="fas fa-bell"></i> تذكيرات الأدوية
            </h2>
            <div style="margin-bottom: 20px;">
                ${reminders.length > 0 ? remindersList : '<p style="text-align: center; color: #999;">لا توجد تذكيرات حتى الآن</p>'}
            </div>
            <div style="border-top: 2px solid #48cfcb; padding-top: 20px; margin-top: 20px;">
                <h3 style="margin-bottom: 15px;">إضافة تذكير جديد</h3>
                <input type="text" id="medicationName" placeholder="اسم الدواء" style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 8px;">
                <input type="text" id="medicationDosage" placeholder="الجرعة (مثال: 500 مجم)" style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 8px;">
                <input type="time" id="medicationTime" style="width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 8px;">
                <button onclick="addReminder()" style="width: 100%; padding: 12px; background: #48cfcb; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;">
                    إضافة التذكير
                </button>
            </div>
            <button onclick="closeModal()" style="margin-top: 15px; padding: 10px 20px; background: #f5f5f5; color: #424242; border: none; border-radius: 8px; cursor: pointer; width: 100%;">
                إغلاق
            </button>
        </div>
    `;
    
    showModal(modalContent);
}

function addReminder() {
    const name = document.getElementById('medicationName').value;
    const dosage = document.getElementById('medicationDosage').value;
    const time = document.getElementById('medicationTime').value;
    
    if (name && dosage && time) {
        reminders.push({ name, dosage, time });
        localStorage.setItem('medicationReminders', JSON.stringify(reminders));
        updateReminderCount();
        showNotification('تمت إضافة التذكير بنجاح');
        closeModal();
        setTimeout(() => openReminderModal(), 100);
    } else {
        showNotification('الرجاء ملء جميع الحقول');
    }
}

function deleteReminder(index) {
    reminders.splice(index, 1);
    localStorage.setItem('medicationReminders', JSON.stringify(reminders));
    updateReminderCount();
    showNotification('تم حذف التذكير');
    closeModal();
    setTimeout(() => openReminderModal(), 100);
}

function showModal(content) {
    const modal = document.createElement('div');
    modal.id = 'customModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        padding: 20px;
    `;
    modal.innerHTML = content;
    document.body.appendChild(modal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById('customModal');
    if (modal) {
        modal.remove();
    }
}

// ==================== Medicine & Pharmacy Functions ====================
function searchFromHero() {
    const searchTerm = document.getElementById('heroSearchInput').value;
    const location = document.getElementById('heroLocationFilter').value;
    
    if (searchTerm) {
        // Store search parameters
        sessionStorage.setItem('searchTerm', searchTerm);
        sessionStorage.setItem('searchLocation', location);
        
        // Redirect to medicines page
        window.location.href = 'medicines.html';
    } else {
        showNotification('الرجاء إدخال اسم الدواء');
    }
}

function viewMedicineDetails(medicineName) {
    showNotification(`عرض تفاصيل ${medicineName}`);
    // This would typically open a detailed view or modal
}

function contactPharmacy(pharmacyName) {
    const message = `أريد الاستفسار عن الأدوية المتوفرة لديكم في ${pharmacyName}`;
    const whatsappUrl = `https://wa.me/201122881051?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// ==================== Notifications ====================
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #28a745;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animations to style
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
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

// ==================== Search Functionality ====================
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', () => {
    const searchTerm = prompt('ابحث عن منتج:');
    if (searchTerm) {
        showNotification(`البحث عن: ${searchTerm}`);
        // Here you would implement actual search functionality
    }
});

// ==================== Account Button ====================
const accountBtn = document.querySelector('.account-btn');

accountBtn.addEventListener('click', () => {
    showNotification('يرجى تسجيل الدخول');
    // Here you would implement login/register functionality
});

// ==================== Cart/Reminder Button ====================
const cartBtn = document.querySelector('.cart-btn');

if (cartBtn) {
    cartBtn.addEventListener('click', () => {
        openReminderModal();
    });
}

// ==================== Smooth Scroll ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            mobileMenu.classList.remove('active');
        }
    });
});

// ==================== Header Scroll Effect ====================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// ==================== Image Loading Animation ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'scale(1)';
        }
    });
}, observerOptions);

// Observe all product cards and category cards
document.querySelectorAll('.product-card, .category-card, .review-card').forEach(card => {
    // تحقق إذا كان الكارد داخل كاروسيل
    const isInCarousel = card.closest('.categories-carousel, .products-carousel, .reviews-carousel');
    
    card.style.opacity = '0';
    // إذا كان داخل كاروسيل، استخدم scale فقط، وإلا استخدم translateY
    if (isInCarousel) {
        card.style.transform = 'scale(0.95)';
    } else {
    card.style.transform = 'translateY(30px)';
    }
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// ==================== Medicine/Pharmacy Quick View ====================
// Medicine and pharmacy card clicks are handled inline in HTML

// ==================== Category Cards Click ====================
const categoryCards = document.querySelectorAll('.category-card');

categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const categoryName = card.querySelector('h3').textContent;
        window.location.href = 'medicines.html';
    });
});

// ==================== Dynamic Year in Footer ====================
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = footerYear.innerHTML.replace('2025', currentYear);
}

// ==================== Loading State ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ==================== Swiper Carousel - نفس موقع أركان ====================
function initSwiper(selector, prevBtn, nextBtn, spaceBetween = 30) {
    const container = document.querySelector(selector);
    if (!container) {
        console.warn('Carousel not found:', selector);
        return;
    }
    
    // التحقق من وجود عناصر
    const items = Array.from(container.children);
    if (items.length === 0) {
        console.warn('No items in carousel:', selector);
        return;
    }
    
    console.log('🔧 Initializing Swiper:', selector, '- Items:', items.length);
    
    // إنشاء wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'swiper-wrapper';
    
    // نقل كل عنصر داخل slide
    items.forEach(item => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.appendChild(item);
        wrapper.appendChild(slide);
    });
    
    // إضافة wrapper للـ container (بعد مسح المحتوى القديم)
    container.innerHTML = '';
    container.appendChild(wrapper);
    container.classList.add('swiper');
    
    // إنشاء Swiper - نفس موقع أركان بالظبط
    return new Swiper(selector, {
        direction: 'horizontal',
        rtl: true,
        slidesPerView: 'auto',
        spaceBetween: spaceBetween,
        freeMode: {
            enabled: true,
            sticky: false,
            momentumBounce: false
        },
        mousewheel: {
            enabled: true,
            forceToAxis: true,
            releaseOnEdges: true
        },
        navigation: {
            nextEl: nextBtn,
            prevEl: prevBtn,
        },
        grabCursor: true,
        speed: 400,
        resistance: true,
        resistanceRatio: 0.85,
        on: {
            init: function() {
                console.log('✅ Swiper ready:', selector);
            }
        }
    });
}

// تهيئة الكاروسيلات بعد تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
    if (typeof Swiper === 'undefined') {
        console.error('❌ Swiper library not loaded!');
        return;
    }
    
    console.log('🚀 Starting Swiper initialization...');
    
    setTimeout(() => {
        initSwiper('.categories-carousel', '#categoriesPrev', '#categoriesNext', 20);
        initSwiper('#featuredCarousel', '#featuredPrev', '#featuredNext', 30);
        initSwiper('#consoleCarousel', '#consolePrev', '#consoleNext', 30);
        initSwiper('#tablesSetCarousel', '#productsPrev', '#productsNext', 30);
        initSwiper('#chairsCarousel', '#chairsPrev', '#chairsNext', 30);
        initSwiper('.reviews-carousel', '#reviewsPrev', '#reviewsNext', 30);
    }, 100);
});

// ==================== Console Welcome Message ====================
console.log('%c💊 MedExFind', 'font-size: 24px; font-weight: bold; color: #48cfcb;');
console.log('%cمرحباً بك في نظام البحث عن الأدوية!', 'font-size: 16px; color: #666;');
console.log('%cللاستفسارات: 01122881051', 'font-size: 14px; color: #229799;');

