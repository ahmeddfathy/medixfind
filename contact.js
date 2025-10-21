// Select Arrow Animation
const selectElement = document.getElementById('subject');
const selectWrapper = document.querySelector('.select-wrapper');

if (selectElement && selectWrapper) {
    let isOpen = false;
    
    selectElement.addEventListener('mousedown', function() {
        isOpen = !isOpen;
        if (isOpen) {
            selectWrapper.classList.add('select-open');
        }
    });
    
    selectElement.addEventListener('blur', function() {
        isOpen = false;
        selectWrapper.classList.remove('select-open');
    });
    
    selectElement.addEventListener('change', function() {
        isOpen = false;
        selectWrapper.classList.remove('select-open');
    });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;
        
        // Simulate sending (replace with actual API call)
        setTimeout(() => {
            // Show success message
            showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Log form data (for development)
            console.log('Form submitted:', formData);
        }, 2000);
    });
}

// Show notification function
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 20px 30px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        font-weight: 600;
        max-width: 400px;
    `;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Form validation
const inputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

inputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() === '' && this.hasAttribute('required')) {
            this.style.borderColor = '#dc3545';
        } else {
            this.style.borderColor = '';
        }
    });
    
    input.addEventListener('input', function() {
        if (this.style.borderColor === 'rgb(220, 53, 69)') {
            this.style.borderColor = '';
        }
    });
});

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        e.target.value = value;
    });
}

// Review Form Submission
const reviewForm = document.getElementById('reviewForm');

if (reviewForm) {
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const reviewData = {
            name: document.getElementById('reviewerName').value,
            rating: document.getElementById('reviewRating').value,
            text: document.getElementById('reviewText').value
        };
        
        // Show loading state
        const submitBtn = reviewForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;
        
        // Simulate sending (replace with actual API call)
        setTimeout(() => {
            // Create star rating HTML
            let stars = '';
            for (let i = 0; i < 5; i++) {
                stars += i < reviewData.rating ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
            }
            
            // Create new review card
            const newReviewCard = document.createElement('div');
            newReviewCard.className = 'review-card';
            newReviewCard.style.opacity = '0';
            newReviewCard.innerHTML = `
                <div class="review-header">
                    <div class="reviewer-info">
                        <div class="reviewer-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                        <div>
                            <h4>${reviewData.name}</h4>
                            <p class="review-date">الآن</p>
                        </div>
                    </div>
                    <div class="review-rating">
                        ${stars}
                    </div>
                </div>
                <p class="review-text">${reviewData.text}</p>
            `;
            
            // Add to reviews grid
            const reviewsGrid = document.querySelector('.reviews-grid');
            reviewsGrid.insertBefore(newReviewCard, reviewsGrid.firstChild);
            
            // Animate in
            setTimeout(() => {
                newReviewCard.style.transition = 'opacity 0.5s ease';
                newReviewCard.style.opacity = '1';
            }, 10);
            
            // Show success message
            showNotification('تم إرسال تقييمك بنجاح! شكراً لك 🌟', 'success');
            
            // Reset form
            reviewForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Log review data (for development)
            console.log('Review submitted:', reviewData);
        }, 2000);
    });
}
