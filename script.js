document.addEventListener('DOMContentLoaded', () => {

    // 🔥 SCANNER OVERLAY TEXT ANIMATION (Synced to ~3.5s total)
    const scannerStatus = document.getElementById('scannerStatus');

    if (scannerStatus) {
        const statuses = [
            "INITIALIZING SECURITY LAYER...",
            "SCANNING SYSTEM VULNERABILITIES...",
            "ENCRYPTING CONNECTION...",
            "SYSTEM SECURED. ACCESS GRANTED."
        ];

        let index = 0;

        const interval = setInterval(() => {
            if (index < statuses.length) {
                scannerStatus.textContent = statuses[index];
                index++;
            } else {
                clearInterval(interval);
            }
        }, 850); // 850ms per status (Total sequence ~3.4s)
    }

    // 🔥 AOS INIT (SAFE)
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    // 🔥 CUSTOM CURSOR
    const cursor = document.querySelector('.custom-cursor');

    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('a, .arsenal-pill, .project-card, .btn-outline').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
            });
        });
    }

});