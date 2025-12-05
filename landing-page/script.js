// Configuration
const CONFIG = {
    stripePublicKey: 'pk_test_YOUR_STRIPE_PUBLIC_KEY', // Replace with your actual Stripe public key
    apiEndpoint: '/api', // Your backend API endpoint
    analyticsId: 'GA_MEASUREMENT_ID' // Replace with your Google Analytics ID
};

// Initialize Stripe
const stripe = Stripe(CONFIG.stripePublicKey);

// Pricing configuration
const PRICING = {
    starter: {
        priceId: 'price_starter_id', // Replace with actual Stripe Price ID
        amount: 99,
        name: 'Starter Package'
    },
    professional: {
        priceId: 'price_professional_id', // Replace with actual Stripe Price ID
        amount: 199,
        name: 'Professional Package'
    },
    enterprise: {
        priceId: 'price_enterprise_id', // Replace with actual Stripe Price ID
        amount: 499,
        name: 'Enterprise Package'
    }
};

// Analytics tracking
function trackEvent(eventName, eventParams = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventParams);
    }
    console.log('Event tracked:', eventName, eventParams);
}

// Navigation
function scrollToPricing() {
    document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
    trackEvent('click_get_started');
}

function openDemo() {
    const modal = document.getElementById('demo-modal');
    modal.classList.add('active');
    trackEvent('open_demo');
}

function closeDemo() {
    const modal = document.getElementById('demo-modal');
    modal.classList.remove('active');
}

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
}

// Use Cases Tabs
function showUseCase(caseId) {
    // Remove active class from all tabs and use cases
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.use-case').forEach(uc => uc.classList.remove('active'));
    
    // Add active class to selected
    event.target.classList.add('active');
    document.getElementById(caseId).classList.add('active');
    
    trackEvent('view_use_case', { case: caseId });
}

// FAQ Accordion
function toggleFaq(button) {
    const faqItem = button.parentElement;
    const wasActive = faqItem.classList.contains('active');
    
    // Close all FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked FAQ if it wasn't active
    if (!wasActive) {
        faqItem.classList.add('active');
        trackEvent('open_faq', { question: button.querySelector('span').textContent });
    }
}

// Email Capture
async function submitEmail(event) {
    event.preventDefault();
    
    const emailInput = document.getElementById('email-input');
    const email = emailInput.value;
    
    try {
        const response = await fetch(`${CONFIG.apiEndpoint}/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        
        if (response.ok) {
            alert('✅ Success! Check your email for confirmation.');
            emailInput.value = '';
            trackEvent('email_subscribe', { email });
        } else {
            throw new Error('Subscription failed');
        }
    } catch (error) {
        console.error('Email subscription error:', error);
        alert('❌ Something went wrong. Please try again.');
    }
}

// Stripe Checkout
async function checkout(packageType) {
    const packageInfo = PRICING[packageType];
    
    if (!packageInfo) {
        console.error('Invalid package type:', packageType);
        return;
    }
    
    // Track checkout initiation
    trackEvent('begin_checkout', {
        package: packageType,
        value: packageInfo.amount,
        currency: 'USD'
    });
    
    // For enterprise, redirect to contact form
    if (packageType === 'enterprise') {
        window.location.href = '/contact?package=enterprise';
        return;
    }
    
    try {
        // Call your backend to create a Checkout Session
        const response = await fetch(`${CONFIG.apiEndpoint}/create-checkout-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                priceId: packageInfo.priceId,
                packageType: packageType,
                successUrl: `${window.location.origin}/success?package=${packageType}`,
                cancelUrl: `${window.location.origin}/pricing`
            })
        });
        
        const session = await response.json();
        
        // Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        });
        
        if (result.error) {
            alert(result.error.message);
            trackEvent('checkout_error', { error: result.error.message });
        }
    } catch (error) {
        console.error('Checkout error:', error);
        alert('Unable to process checkout. Please try again or contact support.');
        trackEvent('checkout_error', { error: error.message });
    }
}

// Animate stats on scroll
function animateStats() {
    const statBars = document.querySelectorAll('.stat-bar-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.getAttribute('data-value') + '%';
            }
        });
    }, { threshold: 0.5 });
    
    statBars.forEach(bar => observer.observe(bar));
}

// Animate demo chat
function animateDemoChat() {
    setTimeout(() => {
        const aiMessage = document.querySelector('.demo-chat .ai');
        if (aiMessage) {
            aiMessage.classList.remove('typing');
            aiMessage.innerHTML = `
                <strong>Profit Margin Calculation:</strong><br><br>
                Revenue: $100,000<br>
                Costs: $65,000<br>
                Profit: $35,000<br><br>
                <strong>Profit Margin: 35%</strong><br><br>
                This is a healthy margin. For context, most service businesses 
                aim for 20-40% profit margins. You're in the upper range!
            `;
            trackEvent('demo_animation_complete');
        }
    }, 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Animate stats when visible
    animateStats();
    
    // Animate demo chat
    animateDemoChat();
    
    // Track page load
    trackEvent('page_load', {
        referrer: document.referrer,
        userAgent: navigator.userAgent
    });
    
    // Close modal on outside click
    document.getElementById('demo-modal').addEventListener('click', (e) => {
        if (e.target.id === 'demo-modal') {
            closeDemo();
        }
    });
    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent > maxScroll) {
            maxScroll = Math.floor(scrollPercent / 25) * 25; // Track in 25% increments
            if (maxScroll % 25 === 0) {
                trackEvent('scroll_depth', { depth: maxScroll });
            }
        }
    });
    
    // Track time on page
    const startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeOnPage = Math.floor((Date.now() - startTime) / 1000);
        trackEvent('time_on_page', { seconds: timeOnPage });
    });
    
    // Check if coming from successful payment
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        const packageType = urlParams.get('package');
        showSuccessMessage(packageType);
    }
});

// Success message for completed purchases
function showSuccessMessage(packageType) {
    const message = `
        <div style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); 
                    background: linear-gradient(135deg, #b026ff, #00f3ff); 
                    padding: 20px 40px; border-radius: 12px; z-index: 9999;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
            <h3 style="margin: 0 0 10px 0;">🎉 Purchase Successful!</h3>
            <p style="margin: 0;">Check your email for download instructions.</p>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', message);
    
    trackEvent('purchase_complete', {
        package: packageType,
        transaction_id: Date.now()
    });
    
    // Remove message after 5 seconds
    setTimeout(() => {
        document.querySelector('[style*="fixed"]').remove();
    }, 5000);
}

// Affiliate tracking
function initAffiliateTracking() {
    const urlParams = new URLSearchParams(window.location.search);
    const affiliateId = urlParams.get('ref') || urlParams.get('aff');
    
    if (affiliateId) {
        // Store affiliate ID in localStorage
        localStorage.setItem('affiliate_id', affiliateId);
        localStorage.setItem('affiliate_timestamp', Date.now());
        
        // Track affiliate referral
        trackEvent('affiliate_referral', { affiliate_id: affiliateId });
        
        // Clean URL (remove ref parameter)
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}

// Get stored affiliate ID for checkout
function getAffiliateId() {
    const affiliateId = localStorage.getItem('affiliate_id');
    const timestamp = localStorage.getItem('affiliate_timestamp');
    
    // Affiliate cookie expires after 30 days
    if (affiliateId && timestamp) {
        const daysSince = (Date.now() - parseInt(timestamp)) / (1000 * 60 * 60 * 24);
        if (daysSince < 30) {
            return affiliateId;
        } else {
            localStorage.removeItem('affiliate_id');
            localStorage.removeItem('affiliate_timestamp');
        }
    }
    
    return null;
}

// Initialize affiliate tracking
initAffiliateTracking();

// Expose functions to global scope
window.scrollToPricing = scrollToPricing;
window.openDemo = openDemo;
window.closeDemo = closeDemo;
window.toggleMobileMenu = toggleMobileMenu;
window.showUseCase = showUseCase;
window.toggleFaq = toggleFaq;
window.submitEmail = submitEmail;
window.checkout = checkout;

