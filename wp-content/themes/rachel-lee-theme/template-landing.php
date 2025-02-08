<?php
/**
 * Template Name: Landing Page
 */

get_header();
?>

<main class="landing-page">
    <!-- Navigation -->
    <nav class="nav-container">
        <div class="nav-content">
            <a href="<?php echo home_url(); ?>" class="nav-logo">
                Rachel Lee
            </a>
            <div class="nav-links">
                <a href="#services" class="nav-link">Services</a>
                <a href="#about" class="nav-link">About</a>
                <a href="#testimonials" class="nav-link">Success Stories</a>
                <a href="#contact" class="nav-cta">Schedule Consultation</a>
            </div>
        </div>
    </nav>

    <!-- Hero Section with Breathing Animation -->
    <section class="hero-breathe">
        <div class="breathe-circle">
            <div class="breathe-layer breathe-layer-1"></div>
            <div class="breathe-layer breathe-layer-2"></div>
            <div class="breathe-layer breathe-layer-3"></div>
            <div class="breathe-text">Breathe</div>
        </div>
        <div class="hero-content">
            <h1>You Don't Have to Navigate Healthcare Alone</h1>
            <p>Expert guidance and advocacy for your healthcare journey</p>
            <a href="#contact" class="cta-button-primary">Get Started</a>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="services-section">
        <div class="services-container">
            <div class="services-header">
                <h2 class="services-title">How We Can Help</h2>
                <p class="services-subtitle">Comprehensive support for your healthcare journey</p>
            </div>
            <div class="services-grid">
                <div class="service-card">
                    <div class="service-icon">
                        <!-- Icon SVG here -->
                    </div>
                    <h3 class="service-title">Patient Advocacy</h3>
                    <p class="service-description">Professional support in navigating complex healthcare systems and decisions.</p>
                    <a href="#" class="service-link">Learn More →</a>
                </div>
                <div class="service-card">
                    <div class="service-icon">
                        <!-- Icon SVG here -->
                    </div>
                    <h3 class="service-title">Care Coordination</h3>
                    <p class="service-description">Seamless coordination between healthcare providers and services.</p>
                    <a href="#" class="service-link">Learn More →</a>
                </div>
                <div class="service-card">
                    <div class="service-icon">
                        <!-- Icon SVG here -->
                    </div>
                    <h3 class="service-title">Resource Navigation</h3>
                    <p class="service-description">Access to curated resources and support networks.</p>
                    <a href="#" class="service-link">Learn More →</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="testimonials-section">
        <div class="testimonials-container">
            <div class="testimonials-header">
                <h2 class="testimonials-title">Success Stories</h2>
                <p class="testimonials-subtitle">Real experiences from people we've helped</p>
            </div>
            <div class="testimonials-grid">
                <div class="testimonial-card">
                    <p class="testimonial-quote">Rachel's guidance was invaluable in helping me navigate my healthcare journey.</p>
                    <div class="testimonial-author">
                        <img src="path-to-avatar" alt="" class="testimonial-avatar">
                        <div class="testimonial-info">
                            <div class="testimonial-name">Sarah Johnson</div>
                            <div class="testimonial-role">Patient</div>
                        </div>
                    </div>
                </div>
                <!-- Add more testimonial cards as needed -->
            </div>
        </div>
    </section>

    <!-- Call to Action Section -->
    <section id="contact" class="cta-section">
        <div class="cta-background"></div>
        <div class="cta-container">
            <div class="cta-content">
                <h2 class="cta-title">Ready to Take the First Step?</h2>
                <p class="cta-description">Schedule a consultation to discuss how we can help you navigate your healthcare journey.</p>
                <div class="cta-buttons">
                    <a href="#" class="cta-button-primary">Schedule Consultation</a>
                    <a href="#" class="cta-button-secondary">Learn More</a>
                </div>
            </div>
        </div>
    </section>
</main>

<?php
get_footer();
?> 