// Main Chart Configuration
const mainCtx = document.getElementById('mainChart').getContext('2d');

const gradient1 = mainCtx.createLinearGradient(0, 0, 0, 300);
gradient1.addColorStop(0, 'rgba(251, 191, 36, 0.3)');
gradient1.addColorStop(1, 'rgba(251, 191, 36, 0)');

const gradient2 = mainCtx.createLinearGradient(0, 0, 0, 300);
gradient2.addColorStop(0, 'rgba(239, 68, 68, 0.3)');
gradient2.addColorStop(1, 'rgba(239, 68, 68, 0)');

const gradient3 = mainCtx.createLinearGradient(0, 0, 0, 300);
gradient3.addColorStop(0, 'rgba(124, 58, 237, 0.3)');
gradient3.addColorStop(1, 'rgba(124, 58, 237, 0)');

const mainChart = new Chart(mainCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [15, 18, 14, 20, 16, 18],
                borderColor: '#FBBF24',
                backgroundColor: gradient1,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointBackgroundColor: '#FBBF24',
            },
            {
                label: 'Dataset 2',
                data: [12, 16, 13, 17, 14, 15],
                borderColor: '#EF4444',
                backgroundColor: gradient2,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointBackgroundColor: '#EF4444',
            },
            {
                label: 'Dataset 3',
                data: [18, 22, 19, 25, 21, 20],
                borderColor: '#7C3AED',
                backgroundColor: gradient3,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointBackgroundColor: '#7C3AED',
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                cornerRadius: 8,
                titleColor: '#fff',
                bodyColor: '#fff',
                displayColors: true,
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 30,
                ticks: {
                    stepSize: 5,
                    callback: function(value) {
                        return value;
                    },
                    color: '#9CA3AF',
                    font: {
                        size: 12
                    }
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                    drawBorder: false
                }
            },
            x: {
                ticks: {
                    color: '#9CA3AF',
                    font: {
                        size: 12
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            }
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    }
});

// Donut Chart Configuration
const donutCtx = document.getElementById('donutChart').getContext('2d');

const donutChart = new Chart(donutCtx, {
    type: 'doughnut',
    data: {
        labels: ['Sale', 'Distribute', 'Return'],
        datasets: [{
            data: [50, 30, 20],
            backgroundColor: [
                '#7C3AED',
                '#FBBF24',
                '#EF4444'
            ],
            borderWidth: 0,
            cutout: '75%'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                cornerRadius: 8,
                titleColor: '#fff',
                bodyColor: '#fff',
                callbacks: {
                    label: function(context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += context.parsed + '%';
                        return label;
                    }
                }
            }
        }
    }
});

// Add interactivity to buttons
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

document.querySelectorAll('.order-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.order-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

// Add hover effect to nav items
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});

// Animate numbers on page load
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate card numbers on load
window.addEventListener('load', () => {
    const cards = document.querySelectorAll('.card-content h3');
    cards.forEach(card => {
        const finalValue = parseInt(card.textContent);
        card.textContent = '0+';
        setTimeout(() => {
            animateValue(card, 0, finalValue, 1500);
        }, 300);
    });
});

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update time periodically
function updateTime() {
    const now = new Date();
    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);
    const dateElements = document.querySelectorAll('.date-range');
    dateElements.forEach(elem => {
        if (!elem.dataset.static) {
            // Keep the arrow, just update dates
            elem.innerHTML = `${dateString} <i class="fas fa-arrow-right"></i> ${dateString}`;
        }
    });
}

// Call once on load
updateTime();

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');

if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
}

// Icon buttons interactions
const iconButtons = document.querySelectorAll('.icon-btn');
iconButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const icon = this.querySelector('i').classList[1];
        
        if (icon === 'fa-envelope') {
            console.log('Messages clicked');
            // Add messages panel functionality here
        } else if (icon === 'fa-bell') {
            console.log('Notifications clicked');
            // Add notifications panel functionality here
        }
    });
});

// User profile dropdown
const userProfileNav = document.querySelector('.user-profile-nav');
if (userProfileNav) {
    userProfileNav.addEventListener('click', function(e) {
        e.stopPropagation();
        console.log('User profile clicked');
        // Add dropdown menu functionality here
    });
}

// Search input focus effect
const searchInput = document.querySelector('.search-input');
if (searchInput) {
    searchInput.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });

    searchInput.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });

    // Search functionality
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        console.log('Searching for:', searchTerm);
        // Add search functionality here
    });
}

// Console welcome message
console.log('%c Dashboard Loaded Successfully! ', 'background: #7C3AED; color: white; font-size: 16px; padding: 10px; border-radius: 5px;');

