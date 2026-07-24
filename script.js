/**
 * Curso Presencial de Inteligencia Artificial - Main JavaScript
 * Handles: Form Validation, Minimalist UI Scroll Observers, FAQ Accordion, & Responsive Nav
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. DOM Elements
    // ----------------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinksContainer = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('backToTop');
    
    // Form Elements
    const registrationForm = document.getElementById('registrationForm');
    const formContainer = document.getElementById('formContainer');
    const confirmationCard = document.getElementById('confirmationCard');
    const confirmationSummary = document.getElementById('confirmationSummary');
    const resetFormBtn = document.getElementById('resetFormBtn');
    const submitBtn = document.getElementById('submitBtn');

    // Modal Elements
    const privacyModal = document.getElementById('privacyModal');
    const openPrivacyModalLink = document.getElementById('openPrivacyModal');
    const privacyLink = document.getElementById('privacyLink');
    const closePrivacyModal = document.getElementById('closePrivacyModal');
    const acceptPrivacyBtn = document.getElementById('acceptPrivacyBtn');

    // ----------------------------------------------------------------------
    // 2. Sticky Navbar & Scroll Logic
    // ----------------------------------------------------------------------
    const handleScroll = () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 350) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }

        // Active link tracking
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 180;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (link && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Mobile Toggle
    if (mobileToggle && navLinksContainer) {
        mobileToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navLinksContainer.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ----------------------------------------------------------------------
    // 3. Scroll Reveal Animations
    // ----------------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal-fade-up');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('active'));
    }

    // ----------------------------------------------------------------------
    // 4. Form Validation & Submission
    // ----------------------------------------------------------------------
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhone = (phone) => {
        const cleanPhone = phone.replace(/[\s\-\(\)\+]/g, '');
        return cleanPhone.length >= 7 && /^\d+$/.test(cleanPhone);
    };

    const showError = (fieldId, errorMsgId, message) => {
        const inputGroup = document.getElementById(fieldId).closest('.form-group');
        const errorSpan = document.getElementById(errorMsgId);
        if (inputGroup) inputGroup.classList.add('has-error');
        if (errorSpan) errorSpan.textContent = message;
    };

    const clearError = (fieldId, errorMsgId) => {
        const inputGroup = document.getElementById(fieldId).closest('.form-group');
        const errorSpan = document.getElementById(errorMsgId);
        if (inputGroup) inputGroup.classList.remove('has-error');
        if (errorSpan) errorSpan.textContent = '';
    };

    ['nombre', 'email', 'telefono'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', () => clearError(id, `error-${id}`));
    });

    const privacyCheck = document.getElementById('privacyCheck');
    if (privacyCheck) {
        privacyCheck.addEventListener('change', () => clearError('privacyCheck', 'error-privacy'));
    }

    if (registrationForm) {
        registrationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            let isValid = true;

            const nombre = document.getElementById('nombre').value.trim();
            if (nombre === '') {
                showError('nombre', 'error-nombre', 'Por favor, ingresa tu nombre completo.');
                isValid = false;
            } else if (nombre.length < 3) {
                showError('nombre', 'error-nombre', 'El nombre debe tener al menos 3 caracteres.');
                isValid = false;
            } else {
                clearError('nombre', 'error-nombre');
            }

            const email = document.getElementById('email').value.trim();
            if (email === '') {
                showError('email', 'error-email', 'El correo electrónico es obligatorio.');
                isValid = false;
            } else if (!validateEmail(email)) {
                showError('email', 'error-email', 'Ingresa un correo electrónico válido (ejemplo@correo.com).');
                isValid = false;
            } else {
                clearError('email', 'error-email');
            }

            const telefono = document.getElementById('telefono').value.trim();
            if (telefono === '') {
                showError('telefono', 'error-telefono', 'Ingresa un número de teléfono de contacto.');
                isValid = false;
            } else if (!validatePhone(telefono)) {
                showError('telefono', 'error-telefono', 'Ingresa un teléfono válido de al menos 7 dígitos.');
                isValid = false;
            } else {
                clearError('telefono', 'error-telefono');
            }

            if (!privacyCheck.checked) {
                showError('privacyCheck', 'error-privacy', 'Debes aceptar el aviso de privacidad para continuar.');
                isValid = false;
            } else {
                clearError('privacyCheck', 'error-privacy');
            }

            if (!isValid) {
                const firstError = registrationForm.querySelector('.has-error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }

            const formData = {
                nombre: nombre,
                email: email,
                telefono: telefono,
                organizacion: document.getElementById('organizacion').value.trim() || 'No especificado',
                profesion: document.getElementById('profesion').value.trim() || 'No especificado',
                edad: document.getElementById('edad').value.trim() || 'No especificado',
                ciudad: document.getElementById('ciudad').value.trim() || 'No especificado',
                experiencia: document.querySelector('input[name="experiencia"]:checked')?.value || 'Ninguno',
                fuente: document.getElementById('fuente').value,
                expectativas: document.getElementById('expectativas').value.trim() || 'No especificado',
                modalidad: '100% Presencial',
                fechaRegistro: new Date().toISOString()
            };

            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Procesando...</span>`;

            try {
                await new Promise((resolve) => setTimeout(resolve, 700));

                confirmationSummary.innerHTML = `
                    <p><strong>Participante:</strong> ${escapeHtml(formData.nombre)}</p>
                    <p><strong>Correo:</strong> ${escapeHtml(formData.email)}</p>
                    <p><strong>Teléfono:</strong> ${escapeHtml(formData.telefono)}</p>
                    <p><strong>Modalidad:</strong> ${escapeHtml(formData.modalidad)}</p>
                `;

                formContainer.classList.add('hidden');
                confirmationCard.classList.remove('hidden');
                confirmationCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

            } catch (err) {
                console.error("Error:", err);
                alert("Ocurrió un inconveniente al enviar tu registro. Intenta de nuevo.");
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = `<span>Reservar mi lugar</span> <i class="fa-solid fa-paper-plane"></i>`;
            }
        });
    }

    if (resetFormBtn) {
        resetFormBtn.addEventListener('click', () => {
            registrationForm.reset();
            confirmationCard.classList.add('hidden');
            formContainer.classList.remove('hidden');
            formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    async function sendRegistrationDataToBackend(payload) {
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz0WBGi4U3e-DY3iK7xEKjWnX0V-J9vJtLTO_g9Cs1J0LaoayFenKZZ6f_0GdS5GImr3g/exec";
    await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    function escapeHtml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

    // ----------------------------------------------------------------------
    // 5. FAQ Accordion
    // ----------------------------------------------------------------------
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(questionBtn => {
        questionBtn.addEventListener('click', () => {
            const faqItem = questionBtn.parentElement;
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const isOpen = faqItem.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    const answer = item.querySelector('.faq-answer');
                    if (answer) answer.style.maxHeight = null;
                    const btn = item.querySelector('.faq-question');
                    if (btn) btn.setAttribute('aria-expanded', 'false');
                }
            });

            if (isOpen) {
                faqItem.classList.remove('active');
                faqAnswer.style.maxHeight = null;
                questionBtn.setAttribute('aria-expanded', 'false');
            } else {
                faqItem.classList.add('active');
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
                questionBtn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ----------------------------------------------------------------------
    // 6. Privacy Modal
    // ----------------------------------------------------------------------
    const openModal = (e) => {
        if (e) e.preventDefault();
        if (privacyModal) privacyModal.classList.remove('hidden');
    };

    const closeModal = () => {
        if (privacyModal) privacyModal.classList.add('hidden');
    };

    if (openPrivacyModalLink) openPrivacyModalLink.addEventListener('click', openModal);
    if (privacyLink) privacyLink.addEventListener('click', openModal);
    if (closePrivacyModal) closePrivacyModal.addEventListener('click', closeModal);
    if (acceptPrivacyBtn) acceptPrivacyBtn.addEventListener('click', closeModal);

    if (privacyModal) {
        privacyModal.addEventListener('click', (e) => {
            if (e.target === privacyModal) closeModal();
        });
    }
});
