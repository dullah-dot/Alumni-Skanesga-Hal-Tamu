    // ========================================
    // SLIDER FUNCTIONALITY
    // ========================================
    let currentSlide = 0;
    const totalSlides = 5;
    const sliderTrack = document.getElementById('sliderTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');

    function updateSlider() {
        // Move slider
        const offset = -currentSlide * 100;
        sliderTrack.style.transform = `translateX(${offset}%)`;

        // Update indicators
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Next button
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    });

    // Previous button
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    });

    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    sliderTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    sliderTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchStartX - touchEndX > 50) {
            // Swipe left
            nextBtn.click();
        }
        if (touchEndX - touchStartX > 50) {
            // Swipe right
            prevBtn.click();
        }
    }

    // Auto slide (optional - uncomment to enable)
    // setInterval(() => {
    //     nextBtn.click();
    // }, 5000);

    // ========================================
    // ALUMNI DATA & RENDER
    // ========================================
    const alumniData = [
        { name: 'Ahmad Surya', year: '2020', job: 'Software Engineer', img: 'debta_model.png' },
        { name: 'Siti Nurhaliza', year: '2019', job: 'Network Admin', img: 'https://via.placeholder.com/300x200?text=Siti' },
        { name: 'Alea Farrel', year: '2025', job: 'Software Engineer', img: 'https://via.placeholder.com/300x200?text=Farrel' },
    ];

    // dinonaktifkan sementara karena tidak dapat merender data chart
    
    // Render Profil
    // function renderProfiles(filter = '', search = '') {
    //     const grid = document.getElementById('profil-grid');
    //     grid.innerHTML = '';
    //     alumniData.filter(a => (filter === '' || a.year === filter) && (search === '' || a.name.toLowerCase().includes(search.toLowerCase()))).forEach(alumni => {
    //         const card = `
    //             <div class="col-md-4 mb-4">
    //                 <div class="card profil-card">
    //                     <img src="${alumni.img}" class="card-img-top" alt="${alumni.name}">
    //                     <div class="card-body">
    //                         <h5 class="card-title">${alumni.name}</h5>
    //                         <p class="card-text">Angkatan ${alumni.year} - ${alumni.job}</p>
    //                         <a href="#" class="btn btn-primary">Lihat Profil</a>
    //                     </div>
    //                 </div>
    //             </div>
    //         `;
    //         grid.innerHTML += card;
    //     });
    // }
    // renderProfiles(); // Panggil fungsi inisialisasi

    // Search dan Filter
    // Panggil renderProfiles setelah diinisialisasi
    // const searchInput = document.getElementById('search');
    // const filterSelect = document.getElementById('filter');
    // if (searchInput && filterSelect) {
    //     searchInput.addEventListener('input', (e) => renderProfiles(filterSelect.value, e.target.value));
    //     filterSelect.addEventListener('change', (e) => renderProfiles(e.target.value, searchInput.value));
    // }

    // Modal Galeri
    document.querySelectorAll('.gallery-img').forEach(img => {
        img.addEventListener('click', () => {
            const modalImg = document.getElementById('modal-img');
            if (modalImg) {
                modalImg.src = img.getAttribute('data-src');
            }
        });
    });

    // Form Kontak
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name')?.value;
            const email = document.getElementById('email')?.value;
            const message = document.getElementById('message')?.value;
            if (name && email && message) {
                alert('Pesan terkirim! Terima kasih.');
            } else {
                alert('Harap isi semua field.');
            }
        });
    }

    function closeQuestNotification(event) {
        // 1. Mencegah event bubbling (agar klik tombol X tidak dianggap klik pada kartu notifikasi)
        event.stopPropagation(); 

        // 2. Mengambil elemen notifikasi berdasarkan ID
        const notification = document.getElementById('questNotification');

        // 3. Menyembunyikan elemen
        if (notification) {
            // Opsi A: Langsung hilang
            notification.style.display = 'none'; 
            
            // Opsi B: Jika ingin animasi slide-out (sesuai CSS transition Anda),
            // ganti baris di atas dengan:
            // notification.style.right = '-400px'; 
            // setTimeout(() => { notification.style.display = 'none'; }, 600);
        }
    }

    // PARALLAX EFFECT
    document.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('.parallax-element').forEach(element => {
            const speed = parseFloat(element.getAttribute('data-speed'));
            const yOffset = -(scrollPosition * speed);
            element.style.transform = element.classList.contains('parallax-hand') 
                ? `translate(-50%, ${yOffset}px)` 
                : `translateY(${yOffset}px)`;
        });
    });

// QUEST NOTIFICATION APPEARANCE
    window.onload = function() {
    setTimeout(function() {
        document.getElementById('questNotification').classList.add('show');
    }, 1000); // Muncul setelah 1 detik
};


    // ========================================
    // NEWS CARD TOGGLE FUNCTION
    // FUNGSI INI HARUS BERADA DI LINGKUP GLOBAL
    // ========================================
    function toggleNews(card) {
        // Tutup semua card lain yang terbuka
        document.querySelectorAll('.news-card').forEach(c => {
            if (c !== card) {
                c.classList.remove('expanded');
            }
        });
        
        // Toggle card yang diklik
        card.classList.toggle('expanded');
        
        // Scroll smooth ke card
        if (card.classList.contains('expanded')) {
            card.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Saya tambahkan block: 'start' agar lebih rapi
        }
    }

    // ========================================
    // COUNTER ANIMATION - Total Alumni
    // ========================================
    function animateCounter() {
        const counter = document.querySelector('.total-alumni-number');
        if (!counter) return;
        
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Trigger animation when section is visible
    const totalCard = document.querySelector('.total-alumni-card');
    if (totalCard) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(totalCard);
    }

    // ========================================
    // INITIALIZE CHARTS AFTER PAGE LOAD
    // ========================================
    window.addEventListener('load', function() {
        // Check if Chart.js is loaded
        if (typeof Chart === 'undefined') {
            console.error('Chart.js tidak ter-load! Periksa koneksi internet atau CDN.');
            return;
        }
        
        console.log('Chart.js berhasil di-load!');
        
        // ========================================
        // PIE CHART - Status Alumni
        // ========================================
        const statusCtx = document.getElementById('statusPieChart');
        if (statusCtx) {
            try {
                new Chart(statusCtx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Sudah Bekerja', 'Belum Bekerja', 'Melanjutkan Kuliah'],
                        datasets: [{
                            data: [185, 35, 30],
                            backgroundColor: [
                                '#667eea',
                                '#f093fb',
                                '#38ef7d'
                            ],
                            borderWidth: 0,
                            hoverOffset: 15
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                backgroundColor: 'rgba(0,0,0,0.8)',
                                padding: 12,
                                bodyFont: {
                                    size: 14
                                },
                                callbacks: {
                                    label: function(context) {
                                        const label = context.label || '';
                                        const value = context.parsed;
                                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                        const percentage = Math.round((value / total) * 100);
                                        return `${label}: ${value} alumni (${percentage}%)`;
                                    }
                                }
                            }
                        },
                        cutout: '65%',
                        animation: {
                            animateRotate: true,
                            animateScale: true,
                            duration: 1500,
                            easing: 'easeInOutQuart'
                        }
                    }
                });
                console.log('Pie Chart berhasil dibuat!');
            } catch (error) {
                console.error('Error membuat Pie Chart:', error);
            }
        } else {
            console.error('Canvas statusPieChart tidak ditemukan!');
        }
        
        // ========================================
        // HORIZONTAL BAR CHART - Bidang Pekerjaan
        // ========================================
        const jobFieldCtx = document.getElementById('jobFieldChart');
        if (jobFieldCtx) {
            try {
                new Chart(jobFieldCtx, {
                    type: 'bar',
                    data: {
                        labels: ['Software Development', 'Network Engineering', 'Cybersecurity', 'Hardware/IT Support', 'Web Development', 'Data Science', 'Lainnya'],
                        datasets: [{
                            label: 'Jumlah Alumni',
                            data: [85, 45, 28, 35, 52, 20, 60],
                            backgroundColor: [
                                'rgba(102, 126, 234, 0.8)',
                                'rgba(116, 75, 162, 0.8)',
                                'rgba(240, 147, 251, 0.8)',
                                'rgba(56, 239, 125, 0.8)',
                                'rgba(37, 99, 235, 0.8)',
                                'rgba(220, 38, 38, 0.8)',
                                'rgba(128, 128, 128, 0.8)'
                            ],
                            borderRadius: 8,
                            barThickness: 35
                        }]
                    },
                    options: {
                        indexAxis: 'y',
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                backgroundColor: 'rgba(0,0,0,0.8)',
                                padding: 12,
                                bodyFont: {
                                    size: 14
                                },
                                callbacks: {
                                    label: function(context) {
                                        const value = context.parsed.x;
                                        const percentage = Math.round((value / 250) * 100);
                                        return `${value} alumni (${percentage}%)`;
                                    }
                                }
                            }
                        },
                        scales: {
                            x: {
                                beginAtZero: true,
                                max: 100,
                                grid: {
                                    color: 'rgba(0,0,0,0.05)'
                                },
                                ticks: {
                                    font: {
                                        size: 12
                                    }
                                }
                            },
                            y: {
                                grid: {
                                    display: false
                                },
                                ticks: {
                                    font: {
                                        size: 13,
                                        weight: '500'
                                    }
                                }
                            }
                        },
                        animation: {
                            duration: 1500,
                            easing: 'easeInOutQuart'
                        }
                    }
                });
                console.log('Bar Chart berhasil dibuat!');
            } catch (error) {
                console.error('Error membuat Bar Chart:', error);
            }
        } else {
            console.error('Canvas jobFieldChart tidak ditemukan!');
        }
        
        // ========================================
        // LINE CHART - Tren Alumni Bekerja
        // ========================================
        const trendCtx = document.getElementById('trendLineChart');
        if (trendCtx) {
            try {
                new Chart(trendCtx, {
                    type: 'line',
                    data: {
                        labels: ['2019', '2020', '2021', '2022', '2023','2024','2025'],
                        datasets: [{
                            label: 'Alumni Bekerja',
                            data: [28, 42, 58, 75, 89, 90, 80],
                            borderColor: '#667eea',
                            backgroundColor: 'rgba(102, 126, 234, 0.1)',
                            borderWidth: 3,
                            fill: true,
                            tension: 0.4,
                            pointRadius: 6,
                            pointHoverRadius: 8,
                            pointBackgroundColor: '#667eea',
                            pointBorderColor: '#fff',
                            pointBorderWidth: 2
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
                                backgroundColor: 'rgba(0,0,0,0.8)',
                                padding: 12,
                                bodyFont: {
                                    size: 14
                                },
                                callbacks: {
                                    label: function(context) {
                                        return `${context.parsed.y} alumni bekerja`;
                                    }
                                }
                            }
                        },
                        scales: {
                            x: {
                                grid: {
                                    color: 'rgba(0,0,0,0.05)'
                                },
                                ticks: {
                                    font: {
                                        size: 13,
                                        weight: '500'
                                    }
                                }
                            },
                            y: {
                                beginAtZero: true,
                                max: 100,
                                grid: {
                                    color: 'rgba(0,0,0,0.05)'
                                },
                                ticks: {
                                    font: {
                                        size: 12
                                    }
                                }
                            }
                        },
                        animation: {
                            duration: 2000,
                            easing: 'easeInOutQuart'
                        }
                    }
                });
                console.log('Line Chart berhasil dibuat!');
            } catch (error) {
                console.error('Error membuat Line Chart:', error);
            }
        } else {
            console.error('Canvas trendLineChart tidak ditemukan!');
        }

    }); // Kurung kurawal penutup untuk window.addEventListener('load')