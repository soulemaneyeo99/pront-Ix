/**
 * PRONT-IX WEBSITE - JAVASCRIPT
 * Gestion des interactions et animations du site
 */

// ==========================================
// VARIABLES GLOBALES
// ==========================================
let isMenuOpen = false;
let typingIndex = 0;
let isTyping = true;

// ==========================================
// INITIALISATION AU CHARGEMENT
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initScrollAnimations();
    initTypingEffect();
    initSmoothScroll();
    initChatWidget();
    initAudioPlayer();
    initIntersectionObserver();
});

// ==========================================
// MENU MOBILE HAMBURGER
// ==========================================
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            toggleMobileMenu();
        });
        
        // Fermer le menu en cliquant sur un lien
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (isMenuOpen) {
                    toggleMobileMenu();
                }
            });
        });
        
        // Fermer le menu en cliquant en dehors
        document.addEventListener('click', function(e) {
            if (isMenuOpen && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                toggleMobileMenu();
            }
        });
    }
}

function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    isMenuOpen = !isMenuOpen;
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prévenir le scroll du body quand le menu est ouvert
    if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// ==========================================
// EFFET DE FRAPPE (TYPING EFFECT)
// ==========================================
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const words = ['le sourire|', 'et la confiance en vous ...|'];
    let currentWordIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentWord = words[currentWordIndex];
        
        if (isDeleting) {
            // Supprimer des caractères
            typingElement.textContent = currentWord.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentWordIndex = (currentWordIndex + 1) % words.length;
            }
        } else {
            // Ajouter des caractères
            typingElement.textContent = currentWord.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            if (currentCharIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2000); // Pause avant de commencer à supprimer
                return;
            }
        }
        
        const typeSpeed = isDeleting ? 100 : 150;
        setTimeout(typeEffect, typeSpeed);
    }
    
    // Démarrer l'effet après un petit délai
    setTimeout(typeEffect, 1000);
}

// ==========================================
// SCROLL FLUIDE
// ==========================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// ANIMATIONS AU SCROLL
// ==========================================
function initScrollAnimations() {
    // Effet parallaxe pour le hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // Navbar background au scroll
        const navbar = document.querySelector('.navbar');
        if (scrolled > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '#ffffff';
            navbar.style.backdropFilter = 'none';
        }
    });
}

// ==========================================
// INTERSECTION OBSERVER POUR ANIMATIONS
// ==========================================
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    const elementsToAnimate = document.querySelectorAll(
        '.program-card, .service-card, .about-text, .section-title'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Animation de texte qui se tape
        const texts = [
            "des formations pratiques",
            "et adaptées à vos besoins",
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const pauseTime = 2000;
        
        function typeWriter() {
            const typingElement = document.getElementById('typingText');
            const currentText = texts[textIndex];
            
            if (!isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                
                if (charIndex === currentText.length) {
                    setTimeout(() => {
                        isDeleting = true;
                        typeWriter();
                    }, pauseTime);
                    return;
                }
                
                setTimeout(typeWriter, typingSpeed);
            } else {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                
                if (charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    setTimeout(typeWriter, 500);
                    return;
                }
                
                setTimeout(typeWriter, deletingSpeed);
            }
        }
        
        // Démarrer l'animation de texte
        typeWriter();

        // Animation des neurones en arrière-plan
        class NeuronNetwork {
            constructor(canvas) {
                this.canvas = canvas;
                this.ctx = canvas.getContext('2d');
                this.nodes = [];
                this.connections = [];
                this.animationId = null;
                
                this.resize();
                this.init();
                this.animate();
                
                window.addEventListener('resize', () => this.resize());
            }
            
            resize() {
                this.canvas.width = this.canvas.offsetWidth;
                this.canvas.height = this.canvas.offsetHeight;
            }
            
            init() {
                const nodeCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
                this.nodes = [];
                this.connections = [];
                
                // Créer les nœuds
                for (let i = 0; i < nodeCount; i++) {
                    this.nodes.push({
                        x: Math.random() * this.canvas.width,
                        y: Math.random() * this.canvas.height,
                        vx: (Math.random() - 0.5) * 0.5,
                        vy: (Math.random() - 0.5) * 0.5,
                        size: Math.random() * 3 + 1,
                        color: this.getRandomColor(),
                        pulse: Math.random() * Math.PI * 2
                    });
                }
                
                // Créer les connexions
                for (let i = 0; i < this.nodes.length; i++) {
                    for (let j = i + 1; j < this.nodes.length; j++) {
                        const dx = this.nodes[i].x - this.nodes[j].x;
                        const dy = this.nodes[i].y - this.nodes[j].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < 150) {
                            this.connections.push({
                                nodeA: this.nodes[i],
                                nodeB: this.nodes[j],
                                opacity: Math.max(0, 1 - distance / 150)
                            });
                        }
                    }
                }
            }
            
            getRandomColor() {
                const colors = ['#00ff88', '#ff4444', '#4488ff', '#ffff44', '#ff88ff', '#ffffff'];
                return colors[Math.floor(Math.random() * colors.length)];
            }
            
            animate() {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                
                // Animer et dessiner les connexions
                this.connections.forEach(conn => {
                    const dx = conn.nodeA.x - conn.nodeB.x;
                    const dy = conn.nodeA.y - conn.nodeB.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const opacity = Math.max(0, 1 - distance / 150) * 0.3;
                    
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(conn.nodeA.x, conn.nodeA.y);
                    this.ctx.lineTo(conn.nodeB.x, conn.nodeB.y);
                    this.ctx.stroke();
                });
                
                // Animer et dessiner les nœuds
                this.nodes.forEach(node => {
                    // Mouvement
                    node.x += node.vx;
                    node.y += node.vy;
                    
                    // Rebond sur les bords
                    if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
                    if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;
                    
                    // Garder dans les limites
                    node.x = Math.max(0, Math.min(this.canvas.width, node.x));
                    node.y = Math.max(0, Math.min(this.canvas.height, node.y));
                    
                    // Animation de pulsation
                    node.pulse += 0.05;
                    const pulseSize = node.size + Math.sin(node.pulse) * 0.5;
                    
                    // Dessiner le nœud
                    this.ctx.fillStyle = node.color;
                    this.ctx.beginPath();
                    this.ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
                    this.ctx.fill();
                    
                    // Effet de lueur
                    this.ctx.shadowColor = node.color;
                    this.ctx.shadowBlur = 10;
                    this.ctx.fill();
                    this.ctx.shadowBlur = 0;
                });
                
                this.animationId = requestAnimationFrame(() => this.animate());
            }
            
            destroy() {
                if (this.animationId) {
                    cancelAnimationFrame(this.animationId);
                }
            }
        }
        
       // Initialiser les réseaux de neurones pour chaque section
        const neuronNetworks = [];
        
        // Section About
        const canvasAbout = document.getElementById('neuronsCanvasAbout');
        if (canvasAbout) {
            neuronNetworks.push(new NeuronNetwork(canvasAbout));
        }
        
        // Section Programs
        const canvasPrograms = document.getElementById('neuronsCanvas');
        if (canvasPrograms) {
            neuronNetworks.push(new NeuronNetwork(canvasPrograms));
        }
        
        // Section Services
        const canvasServices = document.getElementById('neuronsCanvasServices');
        if (canvasServices) {
            neuronNetworks.push(new NeuronNetwork(canvasServices));
        }
        
        // Section Contact
        const canvasContact = document.getElementById('neuronsCanvasContact');
        if (canvasContact) {
            neuronNetworks.push(new NeuronNetwork(canvasContact));
        }
        
        // Initialiser les observers
        initIntersectionObserver();
        
        // Nettoyage lors du déchargement de la page
        window.addEventListener('beforeunload', () => {
            neuronNetworks.forEach(network => network.destroy());
        });

// ==========================================
// LECTEUR AUDIO
// ==========================================
function initAudioPlayer() {
    const playBtn = document.querySelector('.play-btn');
    const audioText = document.querySelector('.audio-text');
    const audioDuration = document.querySelector('.audio-duration');
    
    if (playBtn) {
        let isPlaying = false;
        let currentTime = 0;
        let duration = 65; // 1:05 en secondes
        let interval;
        
        playBtn.addEventListener('click', function() {
            if (!isPlaying) {
                // Démarrer la lecture
                isPlaying = true;
                this.textContent = '⏸';
                audioText.textContent = 'Playing content...';
                
                interval = setInterval(() => {
                    currentTime++;
                    updateTimeDisplay();
                    
                    if (currentTime >= duration) {
                        stopAudio();
                    }
                }, 1000);
            } else {
                // Pause
                stopAudio();
            }
        });
        
        function stopAudio() {
            isPlaying = false;
            playBtn.textContent = '▶';
            audioText.textContent = 'Listen to this content';
            clearInterval(interval);
            currentTime = 0;
            updateTimeDisplay();
        }
        
        function updateTimeDisplay() {
            const minutes = Math.floor(currentTime / 60);
            const seconds = currentTime % 60;
            const totalMinutes = Math.floor(duration / 60);
            const totalSeconds = duration % 60;
            
            audioDuration.textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} / ${totalMinutes.toString().padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`;
        }
        
        // Initialiser l'affichage du temps
        updateTimeDisplay();
    }
}

// ==========================================

        // Initialize neural network
        document.addEventListener('DOMContentLoaded', () => {
            new NeuralNetwork();
            
            // Audio player functionality
            const playBtn = document.getElementById('playBtn');
            const audioDuration = document.getElementById('audioDuration');
            let isPlaying = false;
            let currentTime = 0;
            const totalTime = 65; // 1:05 in seconds
            
            playBtn.addEventListener('click', () => {
                if (!isPlaying) {
                    playBtn.textContent = '⏸';
                    isPlaying = true;
                    startTimer();
                } else {
                    playBtn.textContent = '▶';
                    isPlaying = false;
                }
            });
            
            function startTimer() {
                if (!isPlaying) return;
                
                const interval = setInterval(() => {
                    if (!isPlaying) {
                        clearInterval(interval);
                        return;
                    }
                    
                    currentTime++;
                    updateDuration();
                    
                    if (currentTime >= totalTime) {
                        isPlaying = false;
                        playBtn.textContent = '▶';
                        currentTime = 0;
                        updateDuration();
                        clearInterval(interval);
                    }
                }, 1000);
            }
            
            function updateDuration() {
                const minutes = Math.floor(currentTime / 60);
                const seconds = currentTime % 60;
                const totalMinutes = Math.floor(totalTime / 60);
                const totalSeconds = totalTime % 60;
                
                audioDuration.textContent = 
                    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} / ${totalMinutes.toString().padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`;
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            // Recreate neural network on resize
            document.getElementById('neuralBackground').innerHTML = '';
            setTimeout(() => new NeuralNetwork(), 100);
        });


        // ==========================================
        //      footer.....   
        // ==========================================

// Génération des neurones animés
        function createNeuralNetwork(containerId) {
            const container = document.getElementById(containerId);
            if (!container) return;

            const colors = ['red', 'blue', 'green', 'white'];
            const neuronCount = 50;
            const connectionCount = 30;

            // Créer les neurones
            for (let i = 0; i < neuronCount; i++) {
                const neuron = document.createElement('div');
                neuron.className = `neuron ${colors[Math.floor(Math.random() * colors.length)]}`;
                
                // Taille aléatoire
                const size = Math.random() * 8 + 4;
                neuron.style.width = size + 'px';
                neuron.style.height = size + 'px';
                
                // Position aléatoire
                neuron.style.left = Math.random() * 100 + '%';
                neuron.style.top = Math.random() * 100 + '%';
                
                // Délai d'animation aléatoire
                neuron.style.animationDelay = Math.random() * 8 + 's';
                neuron.style.animationDuration = (Math.random() * 4 + 6) + 's';
                
                container.appendChild(neuron);
            }

            // Créer les connexions
            for (let i = 0; i < connectionCount; i++) {
                const connection = document.createElement('div');
                connection.className = 'neural-connection';
                
                // Position et taille aléatoires
                connection.style.left = Math.random() * 100 + '%';
                connection.style.top = Math.random() * 100 + '%';
                connection.style.width = Math.random() * 200 + 50 + 'px';
                connection.style.transform = `rotate(${Math.random() * 360}deg)`;
                
                // Délai d'animation aléatoire
                connection.style.animationDelay = Math.random() * 4 + 's';
                connection.style.animationDuration = (Math.random() * 2 + 3) + 's';
                
                container.appendChild(connection);
            }
        }

        // Initialiser les réseaux de neurones
        document.addEventListener('DOMContentLoaded', function() {
            createNeuralNetwork('neuralBg');
            createNeuralNetwork('neuralBg2');

            // Animation des cartes de service au scroll
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            // Observer les cartes de service
            document.querySelectorAll('.service-card').forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(50px)';
                card.style.transition = `all 0.6s ease ${index * 0.2}s`;
                observer.observe(card);
            });

            // Animation du chat widget
            let chatVisible = false;
            const chatBubbles = document.querySelectorAll('.chat-bubble, .chat-message');
            
            chatBubbles.forEach(bubble => {
                bubble.style.display = 'none';
            });

            document.querySelector('.chat-button').addEventListener('click', function() {
                chatVisible = !chatVisible;
                
                chatBubbles.forEach((bubble, index) => {
                    if (chatVisible) {
                        setTimeout(() => {
                            bubble.style.display = 'block';
                        }, index * 300);
                    } else {
                        bubble.style.display = 'none';
                    }
                });
            });

            // Effet parallax sur les neurones
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const neurons = document.querySelectorAll('.neuron');
                
                neurons.forEach((neuron, index) => {
                    const speed = (index % 3 + 1) * 0.1;
                    neuron.style.transform += ` translateY(${scrolled * speed}px)`;
                });
            });

            // Animation des logos partenaires
            document.querySelectorAll('.partner-logo').forEach((logo, index) => {
                logo.style.opacity = '0';
                logo.style.transform = 'translateY(20px)';
                logo.style.transition = `all 0.5s ease ${index * 0.1}s`;
                
                setTimeout(() => {
                    logo.style.opacity = '0.7';
                    logo.style.transform = 'translateY(0)';
                }, 500 + index * 100);
            });
        });

        // Effet de pulsation pour le bouton CTA
        setInterval(function() {
            const ctaButton = document.querySelector('.cta-button');
            if (ctaButton) {
                ctaButton.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    ctaButton.style.transform = 'scale(1)';
                }, 200);
            }
        }, 3000);

        // ==========================================
        // GESTION DES FORMULAIRES (FUTURS)
        // ==========================================


        function initContactForm() {
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validation basique
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            if (!name || !email || !message) {
                showNotification('Veuillez remplir tous les champs', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Veuillez entrer une adresse email valide', 'error');
                return;
            }
            
            // Ici vous intégreriez votre logique d'envoi
            showNotification('Message envoyé avec succès!', 'success');
            contactForm.reset();
        });
    }
}

// ==========================================
// UTILITAIRES
// ==========================================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Créer une notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles inline pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    // Couleurs selon le type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Suppression automatique
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ==========================================
// GESTION DES ERREURS
// ==========================================
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
    // En production, vous pourriez envoyer l'erreur à un service de monitoring
});

// ==========================================
// OPTIMISATION PERFORMANCE
// ==========================================
// Throttle function pour les événements scroll
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Utilisation du throttle pour le scroll
window.addEventListener('scroll', throttle(function() {
    // Vos fonctions de scroll ici
}, 16)); // ~60fps

// ==========================================
// MODE SOMBRE (OPTIONNEL)
// ==========================================
function initDarkMode() {
    const darkModeToggle = document.querySelector('#dark-mode-toggle');
    
    if (darkModeToggle) {
        // Vérifier la préférence sauvegardée
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        }
        
        darkModeToggle.addEventListener('change', function() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
    }
}

// ==========================================
// ANALYTICS (À INTÉGRER)
// ==========================================
function trackEvent(eventName, eventData = {}) {
    // Intégration avec Google Analytics, Mixpanel, etc.
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    console.log('Event tracked:', eventName, eventData);
}

// Exemples d'utilisation
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cta-button')) {
        trackEvent('cta_click', {
            button_text: e.target.textContent.trim(),
            page_section: e.target.closest('section')?.id || 'unknown'
        });
    }
});

// ==========================================
// OPTIMISATION IMAGES (LAZY LOADING)
// ==========================================
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ==========================================
// EXPORT DES FONCTIONS PRINCIPALES
// ==========================================
window.ProntIxApp = {
    init: function() {
        initMobileMenu();
        initScrollAnimations();
        initTypingEffect();
        initSmoothScroll();
        initChatWidget();
        initAudioPlayer();
        initIntersectionObserver();
        initLazyLoading();
    },
    toggleMobileMenu,
    showNotification,
    trackEvent
};