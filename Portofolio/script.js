document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ANIMASI TEKS (TYPING) ---
    // Pastikan di HTML kamu ada <span id="typing-text"></span>
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        new Typed('#typing-text', {
            strings: ['Data Analyst.', 'Software Developer.', 'Professional Lead.'],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 2000,
            loop: true
        });
    }

    // --- 2. DARK MODE LOGIC ---
    const html = document.documentElement;
    const btnDesktop = document.getElementById('theme-toggle');
    const btnMobile = document.getElementById('mobile-theme-toggle');

    const updateIcons = (isDark) => {
        const icon = isDark ? '☀️' : '🌙';
        if (btnDesktop) btnDesktop.innerText = icon;
        if (btnMobile) btnMobile.innerText = icon;
    };

    const toggleTheme = () => {
        html.classList.toggle('dark');
        const isDark = html.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateIcons(isDark);
    };

    btnDesktop?.addEventListener('click', toggleTheme);
    btnMobile?.addEventListener('click', toggleTheme);

    // Cek tema awal
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
        updateIcons(true);
    }

    // --- 3. MODAL FOTO ---
    const profileImg = document.getElementById('profile-img');
    const modal = document.getElementById('img-modal');
    const modalContent = document.getElementById('modal-content');

    profileImg?.addEventListener('click', () => {
        modal.classList.remove('hidden');
        modalContent.src = profileImg.src;
        setTimeout(() => {
            modalContent.classList.remove('scale-95', 'opacity-0');
            modalContent.classList.add('scale-100', 'opacity-100');
        }, 50);
    });

    modal?.addEventListener('click', () => {
        modalContent.classList.add('scale-95', 'opacity-0');
        setTimeout(() => modal.classList.add('hidden'), 300);
    });

    // --- 4. SCROLL REVEAL & PROGRESS BAR ---
    const reveal = () => {
        const reveals = document.querySelectorAll("section, .reveal");
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 100;
            
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add("active");
                // Jika elemen yang muncul adalah section skills, trigger progress bar
                if(el.id === 'skills') {
                    el.querySelectorAll('.bg-brand').forEach(bar => {
                        bar.style.width = bar.getAttribute('data-width');
                    });
                }
            }
        });
    };

    window.addEventListener("scroll", reveal);
    reveal(); // Jalankan saat pertama load

    // --- 5. MOBILE MENU ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    menuToggle?.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
});
