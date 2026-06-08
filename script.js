        lucide.createIcons();

        /* ==========================================================================
           1. GLASSMORPHISM NAVBAR BLUR ON SCROLL
           ========================================================================== */
        const mainHeader = document.getElementById('main-header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                mainHeader.classList.add('navbar-scrolled');
            } else {
                mainHeader.classList.remove('navbar-scrolled');
            }
        });

        /* ==========================================================================
           2. MOBILE MENU HAMBURGER NAVIGATION TOGGLE
           ========================================================================== */
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');

        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            if (navMenu.classList.contains('active')) {
                document.body.classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });

        /* ==========================================================================
           3. DYNAMIC INTERACTION SEARCH FAQ ACCORDION
           ========================================================================== */
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const header = item.querySelector('.faq-header');
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                faqItems.forEach(i => {
                    i.classList.remove('active');
                    i.querySelector('.faq-content').style.height = '0';
                });

                if (!isActive) {
                    item.classList.add('active');
                    const content = item.querySelector('.faq-content');
                    const body = item.querySelector('.faq-body');
                    content.style.height = (body.offsetHeight + 24) + 'px';
                }
            });
        });

        /* ==========================================================================
           4. COUNTRY INTERACTIVE CATEGORY FILTER
           ========================================================================== */
        const tabBtns = document.querySelectorAll('.tab-btn');
        const countryCards = document.querySelectorAll('.country-card');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                countryCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'flex';
                        setTimeout(() => card.style.opacity = '1', 50);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                });
            });
        });

        /* ==========================================================================
           5. TESTIMONIALS SLIDER CAROUSEL TRACK LOGIC
           ========================================================================== */
        const track = document.getElementById('slider-track');
        const slides = Array.from(track.children);
        const nextButton = document.getElementById('slider-next');
        const prevButton = document.getElementById('slider-prev');
        const dotsNav = document.getElementById('slider-dots');
        let currentSlideIndex = 0;

        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dotsNav.appendChild(dot);
        });

        const dots = Array.from(dotsNav.children);

        const updateSlider = (index) => {
            track.style.transform = `translateX(${index * 100}%)`;
            dots.forEach(d => d.classList.remove('active'));
            dots[index].classList.add('active');
            currentSlideIndex = index;
        };

        nextButton.addEventListener('click', () => {
            let nextIndex = currentSlideIndex - 1;
            if (nextIndex < 0) nextIndex = slides.length - 1;
            updateSlider(nextIndex);
        });

        prevButton.addEventListener('click', () => {
            let prevIndex = currentSlideIndex + 1;
            if (prevIndex >= slides.length) prevIndex = 0;
            updateSlider(prevIndex);
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                updateSlider(index);
            });
        });

        /* Swipe gestures for testimonials carousel */
        let touchStartX = 0;
        let touchEndX = 0;
        const trackContainer = document.querySelector('.testimonials-track-container');

        if (trackContainer) {
            trackContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            trackContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
        }

        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swiped Left (finger moved right-to-left) -> Show next slide (visually to the left)
                    let prevIndex = currentSlideIndex + 1;
                    if (prevIndex >= slides.length) prevIndex = 0;
                    updateSlider(prevIndex);
                } else {
                    // Swiped Right (finger moved left-to-right) -> Show previous slide (visually to the right)
                    let nextIndex = currentSlideIndex - 1;
                    if (nextIndex < 0) nextIndex = slides.length - 1;
                    updateSlider(nextIndex);
                }
            }
        };

        /* ==========================================================================
           6. ADVANCED INTERSECTION OBSERVER FOR SCROLL ANIMATIONS & COUNTERS
           ========================================================================== */
        const revealElements = document.querySelectorAll('[data-reveal]');

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');

                    const counters = entry.target.querySelectorAll('.stat-num');
                    counters.forEach(counter => animateCounter(counter));

                    const circles = entry.target.querySelectorAll('.metric-circle-progress');
                    circles.forEach(circle => {
                        const targetOffset = parseFloat(circle.getAttribute('data-offset'));
                        const r = circle.r.baseVal.value;
                        const circumference = 2 * Math.PI * r;
                        const offsetValue = circumference - (targetOffset / 100) * circumference;
                        circle.style.strokeDashoffset = offsetValue;
                    });

                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));

        function animateCounter(counter) {
            if (counter.classList.contains('counted')) return;
            counter.classList.add('counted');

            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const stepTime = 30;
            const stepsCount = duration / stepTime;
            const stepVal = target / stepsCount;
            let current = 0;

            const timer = setInterval(() => {
                current += stepVal;
                if (current >= target) {
                    counter.textContent = target.toLocaleString('en-US') + (target === 98 ? '%' : '+');
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current).toLocaleString('en-US') + '+';
                }
            }, stepTime);
        }

        const timelineProgress = document.getElementById('scroll-progress');
        const processSection = document.getElementById('process');

        window.addEventListener('scroll', () => {
            if (!processSection) return;
            const rect = processSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const totalHeight = rect.height;
            const scrolled = windowHeight - rect.top;

            if (rect.top < windowHeight && rect.bottom > 0) {
                let pct = (scrolled / (totalHeight + windowHeight * 0.3)) * 100;
                pct = Math.min(Math.max(pct, 0), 100);
                timelineProgress.style.height = pct + '%';

                document.querySelectorAll('.timeline-step').forEach(step => {
                    const stepRect = step.getBoundingClientRect();
                    if (stepRect.top < windowHeight * 0.65) {
                        step.classList.add('active');
                    } else {
                        step.classList.remove('active');
                    }
                });
            }
        });

        /* ==========================================================================
           7. 60 FPS MESH GRADIENT CANVAS ANIMATION (Apple/Stripe Inspired)
           ========================================================================== */
        const canvas = document.getElementById('mesh-canvas');
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        class ColorShape {
            constructor(x, y, r, color, vx, vy) {
                this.x = x;
                this.y = y;
                this.r = r;
                this.color = color;
                this.vx = vx;
                this.vy = vy;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x - this.r < 0 || this.x + this.r > width) this.vx *= -1;
                if (this.y - this.r < 0 || this.y + this.r > height) this.vy *= -1;
            }

            draw() {
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
                gradient.addColorStop(0, this.color);
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const shapes = [
            new ColorShape(width * 0.2, height * 0.3, 450, 'rgba(14, 165, 233, 0.22)', 0.4, 0.3),
            new ColorShape(width * 0.8, height * 0.2, 500, 'rgba(37, 99, 235, 0.16)', -0.3, 0.4),
            new ColorShape(width * 0.5, height * 0.7, 400, 'rgba(212, 175, 55, 0.08)', 0.2, -0.3),
            new ColorShape(width * 0.1, height * 0.8, 350, 'rgba(14, 165, 233, 0.12)', -0.2, 0.2)
        ];

        function animateMesh() {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, width, height);

            shapes.forEach(shape => {
                shape.update();
                shape.draw();
            });

            requestAnimationFrame(animateMesh);
        }

        animateMesh();

        /* ==========================================================================
           CONTACT DYNAMIC MULTI-TAB FORM LOGIC
           ========================================================================== */
        // Global variables for selections
        function selectContactTab(tab) {
            const tabFree = document.getElementById('tab-btn-free');
            const tabPaid = document.getElementById('tab-btn-paid');
            const containerFree = document.getElementById('contact-form-free-container');
            const containerPaid = document.getElementById('contact-form-paid-container');
            const successMsg = document.getElementById('form-success');

            // Hide success message on tab change
            if (successMsg) successMsg.style.display = 'none';

            if (tab === 'free') {
                tabFree.classList.add('active');
                tabPaid.classList.remove('active');
                containerFree.classList.add('active');
                containerPaid.classList.remove('active');

                // Show form element and reset to defaults
                const f = document.getElementById('free-assessment-form');
                if (f) {
                    f.reset();
                    f.style.display = 'block';
                    document.querySelectorAll('#free-assessment-form .radio-card').forEach(card => card.classList.remove('selected'));
                    const defaultCNSS = document.getElementById('free-cnss-yes');
                    if (defaultCNSS) defaultCNSS.closest('.radio-card').classList.add('selected');
                    const defaultReject = document.getElementById('free-reject-no');
                    if (defaultReject) defaultReject.closest('.radio-card').classList.add('selected');
                }
            } else {
                tabPaid.classList.add('active');
                tabFree.classList.remove('active');
                containerPaid.classList.add('active');
                containerFree.classList.remove('active');

                // Show form element and reset to defaults
                const p = document.getElementById('paid-consultation-form');
                if (p) {
                    p.reset();
                    p.style.display = 'block';
                    const labelText = document.getElementById('file-label-text');
                    if (labelText) {
                        labelText.textContent = 'اضغط هنا لرفع صورة وصل التحويل البنكي';
                        labelText.style.color = '';
                    }
                    document.querySelectorAll('#paid-consultation-form .radio-card').forEach(card => card.classList.remove('selected'));
                    const defaultDuration = document.getElementById('duration-20');
                    if (defaultDuration) defaultDuration.closest('.radio-card').classList.add('selected');
                }
            }
        }

        function updateFileName(input) {
            const labelText = document.getElementById('file-label-text');
            if (!labelText) return;
            if (input.files && input.files.length > 0) {
                const fileName = input.files[0].name;
                labelText.textContent = 'تم اختيار ملف الإثبات: ' + fileName;
                labelText.style.color = '#10B981'; // Green color for success
                labelText.closest('label').style.borderColor = '#10B981';
            } else {
                labelText.textContent = 'اضغط هنا لرفع صورة وصل التحويل البنكي';
                labelText.style.color = '';
                labelText.closest('label').style.borderColor = '';
            }
        }

        function selectRadio(element, radioId) {
            const radio = document.getElementById(radioId);
            if (!radio) return;
            radio.checked = true;

            // Unselect sibling radio cards
            const parent = element.parentElement;
            parent.querySelectorAll('.radio-card').forEach(card => card.classList.remove('selected'));

            // Select clicked card
            element.classList.add('selected');
        }

        document.addEventListener('DOMContentLoaded', () => {
            const freeForm = document.getElementById('free-assessment-form');
            const paidForm = document.getElementById('paid-consultation-form');
            const successMsg = document.getElementById('form-success');
            const successTitle = document.getElementById('success-title');
            const successDesc = document.getElementById('success-desc');

            if (freeForm) {
                freeForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const submitBtn = freeForm.querySelector('button[type="submit"]');
                    const originalText = submitBtn.innerHTML;

                    submitBtn.disabled = true;
                    submitBtn.innerHTML = 'جاري تسجيل ملفك... <i data-lucide="loader-2" class="animate-spin"></i>';
                    lucide.createIcons();

                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                        freeForm.style.display = 'none';

                        if (successMsg) {
                            successTitle.textContent = 'تم تسجيل طلب فتح ملفك بنجاح!';
                            successDesc.innerHTML = 'لقد تم إرسال معلوماتك بنجاح. سيقوم أحد مستشارينا بالتواصل معك عبر الهاتف أو الواتساب <strong>خلال 15 دقيقة</strong> لمراجعة تفاصيل أوراقك والبدء في الإجراءات اللوجستية بالتعاون مع CTM Messagerie.';
                            successMsg.style.display = 'block';
                            successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                        lucide.createIcons();
                    }, 1500);
                });
            }

            if (paidForm) {
                paidForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const submitBtn = paidForm.querySelector('button[type="submit"]');
                    const originalText = submitBtn.innerHTML;

                    submitBtn.disabled = true;
                    submitBtn.innerHTML = 'جاري إرسال طلبك... <i data-lucide="loader-2" class="animate-spin"></i>';
                    lucide.createIcons();

                    const name = document.getElementById('paid-name').value;
                    const phone = document.getElementById('paid-phone').value;
                    const destSelect = document.getElementById('paid-destination');
                    const destinationText = destSelect.options[destSelect.selectedIndex].text;
                    const durationRadio = document.querySelector('input[name="paid-duration"]:checked');
                    const durationVal = durationRadio ? durationRadio.value : '20 دقيقة';

                    let amount = "200MAD";
                    if (durationVal.includes("10")) {
                        amount = "100MAD";
                    } else if (durationVal.includes("20")) {
                        amount = "200MAD";
                    } else if (durationVal.includes("30")) {
                        amount = "300MAD";
                    }

                    const reqId = Math.floor(Math.random() * 90) + 10;

                    const whatsappMessage = `طلب الحصول على رقم حساب التجاري وفا بنك من أجل الدفع\nالطلب: إستشارة حول تأشيرة ${destinationText}\nرقم الطلب: ${reqId}\nالمبلغ: ${amount}\nرقم صاحب الطلب: ${phone}`;
                    
                    const whatsappUrl = `https://wa.me/212660773153?text=${encodeURIComponent(whatsappMessage)}`;

                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                        paidForm.style.display = 'none';

                        // Open WhatsApp chat in a new tab
                        window.open(whatsappUrl, '_blank');

                        if (successMsg) {
                            successTitle.textContent = 'تم استلام طلب الاستشارة المدفوعة بنجاح!';
                            successDesc.innerHTML = 'لقد تم تسجيل طلب الاستشارة بنجاح. سيتم التواصل معك عبر الواتساب لتأكيد الحجز وتنسيق الاستشارة والإجابة عن استفساراتك <strong>خلال مدة أقصاها 24 ساعة</strong>.';
                            successMsg.style.display = 'block';
                            successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                        lucide.createIcons();
                    }, 1500);
                });
            }
        });

        /* ==========================================================================
           8. TESTIMONIAL CUSTOM AUDIO PLAYERS LOGIC
           ========================================================================== */
        const players = document.querySelectorAll('.premium-audio-player');
        players.forEach(player => {
            const audio = player.querySelector('.testimonial-audio');
            const playBtn = player.querySelector('.audio-play-btn');
            const progressBar = player.querySelector('.audio-progress-bar');
            const progressContainer = player.querySelector('.audio-progress-container');
            const currentTimeEl = player.querySelector('.audio-current-time');
            const durationEl = player.querySelector('.audio-duration');
            const waveform = player.querySelector('.audio-waveform');
            
            // Format time in mm:ss
            const formatTime = (secs) => {
                const minutes = Math.floor(secs / 60);
                const seconds = Math.floor(secs % 60);
                return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            };

            // Generate waveform bars dynamically
            if (waveform) {
                const barCount = 38; // number of bars in the waveform
                const seedHeights = [30, 45, 20, 60, 80, 25, 35, 70, 90, 40, 30, 50, 80, 20, 35, 60, 85, 30, 45, 70, 25, 35, 55, 90, 40, 25, 35, 65, 95, 30, 45, 20, 55, 80, 30, 45, 60, 25];
                for (let i = 0; i < barCount; i++) {
                    const bar = document.createElement('div');
                    bar.classList.add('wave-bar');
                    const height = seedHeights[i % seedHeights.length];
                    bar.style.height = `${height}%`;
                    waveform.appendChild(bar);
                }
            }
            
            // Toggle play/pause
            playBtn.addEventListener('click', () => {
                // Pause all other audios first
                document.querySelectorAll('.testimonial-audio').forEach(a => {
                    if (a !== audio && !a.paused) {
                        a.pause();
                        const otherPlayer = a.closest('.premium-audio-player');
                        const otherBtn = otherPlayer.querySelector('.audio-play-btn');
                        otherBtn.innerHTML = '<i data-lucide="play" style="width: 20px; height: 20px; fill: white; margin-right: -2px;"></i>';
                    }
                });
                
                if (audio.paused) {
                    audio.play();
                    playBtn.innerHTML = '<i data-lucide="pause" style="width: 20px; height: 20px; fill: white;"></i>';
                } else {
                    audio.pause();
                    playBtn.innerHTML = '<i data-lucide="play" style="width: 20px; height: 20px; fill: white; margin-right: -2px;"></i>';
                }
                
                lucide.createIcons();
            });
            
            // Update progress & timer
            audio.addEventListener('timeupdate', () => {
                const percent = (audio.currentTime / audio.duration) * 100;
                if (progressBar) {
                    progressBar.style.width = `${percent}%`;
                }
                if (waveform) {
                    const bars = waveform.querySelectorAll('.wave-bar');
                    const activeCount = Math.floor((audio.currentTime / audio.duration) * bars.length);
                    bars.forEach((bar, index) => {
                        if (index < activeCount) {
                            bar.classList.add('active');
                        } else {
                            bar.classList.remove('active');
                        }
                    });
                }
                currentTimeEl.textContent = formatTime(audio.currentTime);
            });
            
            // Load duration safely
            if (audio.readyState >= 1) {
                durationEl.textContent = formatTime(audio.duration);
            } else {
                audio.addEventListener('loadedmetadata', () => {
                    durationEl.textContent = formatTime(audio.duration);
                });
            }
            
            // Click on progress track to seek
            progressContainer.addEventListener('click', (e) => {
                const rect = progressContainer.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                audio.currentTime = pos * audio.duration;
            });
            
            // Reset player when finished
            audio.addEventListener('ended', () => {
                if (progressBar) {
                    progressBar.style.width = '0%';
                }
                if (waveform) {
                    const bars = waveform.querySelectorAll('.wave-bar');
                    bars.forEach(bar => bar.classList.remove('active'));
                }
                currentTimeEl.textContent = '0:00';
                playBtn.innerHTML = '<i data-lucide="play" style="width: 20px; height: 20px; fill: white; margin-right: -2px;"></i>';
                lucide.createIcons();
            });
        });

        /* ==========================================================================
           9. PREMIUM VISA LIGHTBOX MODAL LOGIC
           ========================================================================== */
        window.openVisaLightbox = function(imgSrc, captionText) {
            const lightbox = document.getElementById('visa-lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            const lightboxCaption = document.getElementById('lightbox-caption');
            const mainHeader = document.getElementById('main-header');
            
            if (lightbox && lightboxImg && lightboxCaption) {
                lightboxImg.src = imgSrc;
                lightboxCaption.textContent = captionText || 'تأشيرة مقبولة لعملائنا';
                lightbox.style.display = 'flex';
                // Trigger reflow
                lightbox.offsetHeight;
                lightbox.classList.add('active');
                document.body.classList.add('no-scroll');
                
                // Hide header standard glass navbar to avoid overlap issues
                if (mainHeader) mainHeader.style.transform = 'translateY(-100%)';
            }
        };

        window.closeVisaLightbox = function() {
            const lightbox = document.getElementById('visa-lightbox');
            const mainHeader = document.getElementById('main-header');
            
            if (lightbox) {
                lightbox.classList.remove('active');
                document.body.classList.remove('no-scroll');
                
                // Show header navbar again
                if (mainHeader) mainHeader.style.transform = 'translateY(0)';
                
                setTimeout(() => {
                    lightbox.style.display = 'none';
                }, 400);
            }
        };

        // ==========================================================================
        // 10. VISA RESULTS SLIDER CAROUSEL LOGIC
        // ==========================================================================
        const visaTrack = document.getElementById('visa-slider-track');
        if (visaTrack) {
            const visaSlides = Array.from(visaTrack.children);
            const visaNextButton = document.getElementById('visa-slider-next');
            const visaPrevButton = document.getElementById('visa-slider-prev');
            const visaDotsNav = document.getElementById('visa-slider-dots');
            let visaCurrentIndex = 0;

            visaSlides.forEach((_, i) => {
                const dot = document.createElement('div');
                dot.classList.add('slider-dot');
                if (i === 0) dot.classList.add('active');
                visaDotsNav.appendChild(dot);
            });

            const visaDots = Array.from(visaDotsNav.children);

            function updateVisaSlider() {
                visaTrack.style.transform = `translateX(${visaCurrentIndex * 100}%)`;
                visaDots.forEach((dot, index) => {
                    if (index === visaCurrentIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }

            visaNextButton.addEventListener('click', () => {
                let nextIndex = visaCurrentIndex - 1;
                if (nextIndex < 0) nextIndex = visaSlides.length - 1;
                visaCurrentIndex = nextIndex;
                updateVisaSlider();
            });

            visaPrevButton.addEventListener('click', () => {
                let prevIndex = visaCurrentIndex + 1;
                if (prevIndex >= visaSlides.length) prevIndex = 0;
                visaCurrentIndex = prevIndex;
                updateVisaSlider();
            });

            visaDots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    visaCurrentIndex = index;
                    updateVisaSlider();
                });
            });

            // Swipe gestures for visa results carousel
            let visaTouchStartX = 0;
            let visaTouchEndX = 0;
            const visaTrackContainer = visaTrack.parentElement;

            if (visaTrackContainer) {
                visaTrackContainer.addEventListener('touchstart', (e) => {
                    visaTouchStartX = e.changedTouches[0].screenX;
                }, { passive: true });

                visaTrackContainer.addEventListener('touchend', (e) => {
                    visaTouchEndX = e.changedTouches[0].screenX;
                    handleVisaSwipe();
                }, { passive: true });
            }

            function handleVisaSwipe() {
                const swipeThreshold = 50;
                if (visaTouchStartX - visaTouchEndX > swipeThreshold) {
                    // Swipe Left -> Next Slide in RTL
                    let nextIndex = visaCurrentIndex + 1;
                    if (nextIndex >= visaSlides.length) nextIndex = 0;
                    visaCurrentIndex = nextIndex;
                    updateVisaSlider();
                } else if (visaTouchEndX - visaTouchStartX > swipeThreshold) {
                    // Swipe Right -> Prev Slide in RTL
                    let prevIndex = visaCurrentIndex - 1;
                    if (prevIndex < 0) prevIndex = visaSlides.length - 1;
                    visaCurrentIndex = prevIndex;
                    updateVisaSlider();
                }
            }
        }

