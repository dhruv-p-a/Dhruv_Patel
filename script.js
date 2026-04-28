document.addEventListener('DOMContentLoaded', () => {
    // Scanner Overlay Logic with Dynamic Text
    const scannerOverlay = document.getElementById('scannerOverlay');
    const scannerStatus = document.getElementById('scannerStatus');

    if (scannerOverlay && scannerStatus) {
        const statuses = [
            "INITIALIZING SECURITY LAYER...",
            "SCANNING SYSTEM VULNERABILITIES...",
            "ENCRYPTING CONNECTION...",
            "SYSTEM SECURED. ACCESS GRANTED."
        ];

        let statusIndex = 0;
        const statusInterval = setInterval(() => {
            if (statusIndex < statuses.length) {
                scannerStatus.textContent = statuses[statusIndex];
                statusIndex++;
            } else {
                clearInterval(statusInterval);
            }
        }, 800);
    }

    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Custom Cursor Interaction
    const cursor = document.querySelector('.custom-cursor');
    document.addEventListener('mousemove', (e) => {
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
    });

    // Cursor react to interactive elements
    document.querySelectorAll('a, .arsenal-pill, .project-card, .btn-solid').forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursor) cursor.style.transform = 'scale(2)';
        });
        el.addEventListener('mouseleave', () => {
            if (cursor) cursor.style.transform = 'scale(1)';
        });
    });
});