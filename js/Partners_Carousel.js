document.addEventListener('DOMContentLoaded', () => {
    
    const partnersCarousel = document.getElementById('partnersCarousel');
    const carouselDots = document.getElementById('carouselDots');
    const carouselContainer = document.querySelector('.partners-carousel-container');
    
    const isMobileView = () => window.innerWidth <= 768;

    if (partnersCarousel && carouselDots && carouselContainer) {
        
        const totalItems = partnersCarousel.querySelectorAll('img').length;
        // প্রতিটি স্লাইডে 1টি লোগো দেখাবে, তাই স্লাইড সংখ্যা হবে মোট লোগোর সমান
        const totalSlides = totalItems; 
        let currentSlide = 0;

        // ডট তৈরি করা (মোট 5টি লোগোর জন্য 5টি ডট হবে)
        carouselDots.innerHTML = '';
        if (isMobileView() && totalSlides > 1) { 
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (i === 0) {
                    dot.classList.add('active');
                }
                dot.addEventListener('click', () => {
                    goToSlide(i);
                });
                carouselDots.appendChild(dot);
            }
            carouselDots.style.display = 'flex';
        } else {
             carouselDots.style.display = 'none';
        }
        
        const dots = carouselDots.querySelectorAll('.dot');

        function updateCarousel() {
            if (isMobileView()) {
                // স্লাইড সরানোর পরিমাণ: ক্যারোসেল কন্টেইনারের পুরো প্রস্থ।
                // CSS এ একটি লোগোর প্রস্থ 20% এবং ক্যারোসেলের প্রস্থ 500% সেট করা হয়েছে।
                // তাই, একটি স্লাইড সরাতে হলে ক্যারোসেল কন্টেইনারের প্রস্থের 1/5 অংশ সরাতে হবে।
                const slideMovement = carouselContainer.offsetWidth; // কন্টেইনারের প্রস্থ

                // 1টি লোগো সরাতে, ক্যারোসেল কন্টেইনারের প্রস্থের 100% সরাতে হবে। 
                // কিন্তু CSS এ প্রতিটি লোগোর প্রস্থ 20% (1/5th) হওয়ায়, আমরা 1টি লোগোর প্রস্থের সমান সরাব।
                const logoWidth = partnersCarousel.offsetWidth / totalItems; // 500% / 5 = 100%
                
                // 1টি লোগো সরাতে, ক্যারোসেল কন্টেইনারের প্রস্থের সমান ট্রান্সলেট করতে হবে।
                partnersCarousel.style.transform = `translateX(-${currentSlide * slideMovement}px)`;

                // ডট আপডেট
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentSlide);
                });
            } else {
                // ডেস্কটপে রিসেট করা
                partnersCarousel.style.transform = 'translateX(0)';
                carouselDots.style.display = 'none';
            }
        }

        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            updateCarousel();
        }

        // --- টাচ/সোয়াইপ ইভেন্ট হ্যান্ডলার্স --- (এই অংশটি অপরিবর্তিত)
        let touchStartX = 0;
        let touchEndX = 0;

        partnersCarousel.addEventListener('touchstart', (e) => {
            if (!isMobileView() || totalSlides <= 1) return;
            touchStartX = e.touches[0].clientX;
            partnersCarousel.style.transition = 'none';
        });

        partnersCarousel.addEventListener('touchmove', (e) => {
            if (!isMobileView() || totalSlides <= 1) return;
            const touchMoveX = e.touches[0].clientX;
            const diff = touchMoveX - touchStartX;
            const currentOffset = -currentSlide * carouselContainer.offsetWidth;
            partnersCarousel.style.transform = `translateX(${currentOffset + diff}px)`;
        });

        partnersCarousel.addEventListener('touchend', (e) => {
            if (!isMobileView() || totalSlides <= 1) return;
            partnersCarousel.style.transition = 'transform 0.5s ease-in-out';
            touchEndX = e.changedTouches[0].clientX;
            
            const threshold = 75;
            
            if (touchEndX < touchStartX - threshold) { 
                if (currentSlide < totalSlides - 1) {
                    currentSlide++;
                }
            } else if (touchEndX > touchStartX + threshold) { 
                if (currentSlide > 0) {
                    currentSlide--;
                }
            }
            updateCarousel();
        });

        // রিসাইজ ইভেন্ট
        window.addEventListener('resize', updateCarousel);
        
        // প্রাথমিকভাবে আপডেট
        updateCarousel();
    }
});