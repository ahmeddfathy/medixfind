// ==================== Pharmacies Data ====================
const pharmaciesData = [
    {
        id: 'pharmacy1',
        name: 'صيدلية النهضة',
        description: 'صيدلية متميزة توفر جميع أنواع الأدوية بأسعار مناسبة',
        address: 'شارع سعد زغلول - بني سويف',
        location: 'بني سويف',
        phone: '01001234567',
        rating: 4.8,
        isOpen: true,
        image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=500&q=80'
    },
    {
        id: 'pharmacy2',
        name: 'صيدلية الحياة',
        description: 'خدمة سريعة ومنتجات عالية الجودة',
        address: 'ميدان المحطة - ببا',
        location: 'ببا',
        phone: '01112345678',
        rating: 4.5,
        isOpen: true,
        image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&q=80'
    },
    {
        id: 'pharmacy3',
        name: 'صيدلية الشفاء',
        description: 'صيدلية موثوقة مع خدمة على مدار الساعة',
        address: 'شارع البنك - الفشن',
        location: 'الفشن',
        phone: '01223456789',
        rating: 4.7,
        isOpen: true,
        image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500&q=80'
    },
    {
        id: 'pharmacy4',
        name: 'صيدلية العز',
        description: 'صيدلية شاملة توفر جميع أنواع الأدوية',
        address: 'شارع المديرية - إهناسيا',
        location: 'إهناسيا',
        phone: '01334567890',
        rating: 4.3,
        isOpen: false,
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&q=80'
    },
    {
        id: 'pharmacy5',
        name: 'صيدلية السلام',
        description: 'صيدلية معتمدة مع خدمات متميزة',
        address: 'الشارع الرئيسي - الواسطى',
        location: 'الواسطى',
        phone: '01445678901',
        rating: 4.6,
        isOpen: true,
        image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500&q=80'
    },
    {
        id: 'pharmacy6',
        name: 'صيدلية المستقبل',
        description: 'صيدلية حديثة بأحدث التقنيات',
        address: 'شارع الجمهورية - بني سويف',
        location: 'بني سويف',
        phone: '01556789012',
        rating: 4.9,
        isOpen: true,
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80'
    },
    {
        id: 'pharmacy7',
        name: 'صيدلية الأمل',
        description: 'صيدلية شاملة في خدمة المجتمع',
        address: 'شارع المحافظة - ناصر',
        location: 'ناصر',
        phone: '01667890123',
        rating: 4.4,
        isOpen: false,
        image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=500&q=80'
    },
    {
        id: 'pharmacy8',
        name: 'صيدلية النور',
        description: 'صيدلية موثوقة بخدمات مميزة',
        address: 'شارع البنك - سمسطا',
        location: 'سمسطا',
        phone: '01778901234',
        rating: 4.2,
        isOpen: true,
        image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&q=80'
    },
    {
        id: 'pharmacy9',
        name: 'صيدلية الرحمة',
        description: 'صيدلية متكاملة بأفضل الأسعار',
        address: 'شارع الثورة - بني سويف',
        location: 'بني سويف',
        phone: '01889012345',
        rating: 4.8,
        isOpen: true,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80'
    },
    {
        id: 'pharmacy10',
        name: 'صيدلية الأمان',
        description: 'صيدلية معروفة بخدماتها الممتازة',
        address: 'شارع المديرية - ببا',
        location: 'ببا',
        phone: '01990123456',
        rating: 4.5,
        isOpen: true,
        image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&q=80'
    },
    {
        id: 'pharmacy11',
        name: 'صيدلية الهدى',
        description: 'صيدلية حديثة بأسعار تنافسية',
        address: 'شارع السوق - الفشن',
        location: 'الفشن',
        phone: '01001112233',
        rating: 4.7,
        isOpen: false,
        image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500&q=80'
    },
    {
        id: 'pharmacy12',
        name: 'صيدلية الوفاء',
        description: 'صيدلية شاملة توفر أفضل الخدمات',
        address: 'شارع المحطة - بني سويف',
        location: 'بني سويف',
        phone: '01112223344',
        rating: 4.6,
        isOpen: true,
        image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=500&q=80'
    }
];

// ==================== Display Pharmacies ====================
function displayPharmacies(pharmacies) {
    const grid = document.getElementById('pharmaciesGrid');
    const resultsCount = document.getElementById('resultsCount');
    
    if (!grid || !resultsCount) return;
    
    resultsCount.textContent = pharmacies.length;
    
    if (pharmacies.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="fas fa-search"></i>
                <h3>لا توجد صيدليات مطابقة</h3>
                <p>جرب تعديل معايير البحث أو الفلتر</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = pharmacies.map(pharmacy => `
        <div class="pharmacy-card" data-location="${pharmacy.location}" data-rating="${pharmacy.rating}" data-open="${pharmacy.isOpen}">
            <div class="pharmacy-image">
                <img src="${pharmacy.image}" alt="${pharmacy.name}">
                <div class="pharmacy-status ${pharmacy.isOpen ? 'open' : 'closed'}">
                    ${pharmacy.isOpen ? 'مفتوح' : 'مغلق'}
                </div>
            </div>
            <div class="pharmacy-info">
                <div class="pharmacy-header">
                    <h3 class="pharmacy-name">${pharmacy.name}</h3>
                    <div class="pharmacy-rating">
                        <i class="fas fa-star"></i>
                        <span>${pharmacy.rating}</span>
                    </div>
                </div>
                <p class="pharmacy-description">${pharmacy.description}</p>
                <div class="pharmacy-details">
                    <div class="detail-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${pharmacy.address}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-city"></i>
                        <span>${pharmacy.location}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-phone"></i>
                        <span>${pharmacy.phone}</span>
                    </div>
                </div>
                <div class="pharmacy-actions">
                    <button class="btn btn-primary" onclick="contactPharmacy('${pharmacy.name}', '${pharmacy.phone}')">
                        <i class="fas fa-phone"></i> اتصل الآن
                    </button>
                    <button class="btn btn-secondary" onclick="viewPharmacyDetails('${pharmacy.id}')">
                        <i class="fas fa-info-circle"></i> التفاصيل
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ==================== Filter Pharmacies ====================
function filterPharmacies() {
    const searchTerm = document.getElementById('pharmacySearch').value.toLowerCase();
    const locationFilter = document.getElementById('locationFilter').value;
    const availabilityFilter = document.querySelector('input[name="availability"]:checked').value;
    const ratingFilter = document.querySelector('input[name="rating"]:checked').value;
    
    let filtered = pharmaciesData.filter(pharmacy => {
        // Search filter
        const matchesSearch = pharmacy.name.toLowerCase().includes(searchTerm) ||
                            pharmacy.address.toLowerCase().includes(searchTerm) ||
                            pharmacy.location.toLowerCase().includes(searchTerm);
        
        // Location filter
        const matchesLocation = !locationFilter || pharmacy.location === locationFilter;
        
        // Availability filter
        const matchesAvailability = availabilityFilter === 'all' || pharmacy.isOpen;
        
        // Rating filter
        const matchesRating = ratingFilter === 'all' || pharmacy.rating >= 4.0;
        
        return matchesSearch && matchesLocation && matchesAvailability && matchesRating;
    });
    
    displayPharmacies(filtered);
}

// ==================== Contact Pharmacy ====================
function contactPharmacy(pharmacyName, phoneNumber) {
    const confirmCall = confirm(`هل تريد الاتصال بـ ${pharmacyName}؟\nرقم الهاتف: ${phoneNumber}`);
    if (confirmCall) {
        window.location.href = `tel:${phoneNumber}`;
    }
}

// ==================== View Pharmacy Details ====================
function viewPharmacyDetails(pharmacyId) {
    const pharmacy = pharmaciesData.find(p => p.id === pharmacyId);
    if (pharmacy) {
        alert(`تفاصيل ${pharmacy.name}\n\nالعنوان: ${pharmacy.address}\nالمدينة: ${pharmacy.location}\nالتقييم: ${pharmacy.rating} نجوم\nالحالة: ${pharmacy.isOpen ? 'مفتوح' : 'مغلق'}\nالهاتف: ${pharmacy.phone}\n\n${pharmacy.description}`);
    }
}

// ==================== Event Listeners ====================
document.addEventListener('DOMContentLoaded', function() {
    // Display all pharmacies initially
    displayPharmacies(pharmaciesData);
    
    // Search input
    const searchInput = document.getElementById('pharmacySearch');
    if (searchInput) {
        searchInput.addEventListener('input', filterPharmacies);
    }
    
    // Location filter
    const locationFilter = document.getElementById('locationFilter');
    if (locationFilter) {
        locationFilter.addEventListener('change', filterPharmacies);
    }
    
    // Availability filter
    const availabilityRadios = document.querySelectorAll('input[name="availability"]');
    availabilityRadios.forEach(radio => {
        radio.addEventListener('change', filterPharmacies);
    });
    
    // Rating filter
    const ratingRadios = document.querySelectorAll('input[name="rating"]');
    ratingRadios.forEach(radio => {
        radio.addEventListener('change', filterPharmacies);
    });
    
    // Add smooth scroll animation
    window.addEventListener('scroll', function() {
        const cards = document.querySelectorAll('.pharmacy-card');
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (cardTop < windowHeight - 100) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    });
});

// ==================== Initialize Cards Animation ====================
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.pharmacy-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
