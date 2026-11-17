/* ==========================================================================
   Dhruv Patel - All 5 Milestones Timeline Connecting Line Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Scanner Overlay ---
    const scannerOverlay = document.getElementById('scannerOverlay');
    const scannerStatus = document.getElementById('scannerStatus');

    if (scannerOverlay && scannerStatus) {
        const statuses = [
            "INITIALIZING SYSTEM...",
            "LOADING SECURITY PROTOCOLS...",
            "SYSTEM SECURED",
            "ACCESS GRANTED"
        ];
        let index = 0;
        const interval = setInterval(() => {
            if (index < statuses.length) {
                scannerStatus.textContent = statuses[index];
                index++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    scannerOverlay.classList.add('hide');
                }, 300);
            }
        }, 350);
    }

    // --- 2. Live Local Clock & Date Widget ---
    const timeWidget = document.getElementById('liveTimeWidget');
    function updateClock() {
        if (!timeWidget) return;
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'pm' : 'am';
        const formattedHours = hours % 12 || 12;

        const day = now.getDate();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const month = monthNames[now.getMonth()];
        const year = now.getFullYear();

        timeWidget.textContent = `Local time ${formattedHours}:${minutes}${ampm} • ${day} ${month}, ${year}`;
    }
    updateClock();
    setInterval(updateClock, 10000);

    // --- 3. Custom Cursor Tracking ---
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        const hoverables = document.querySelectorAll('a, button, .door-card, .cinema-book-closed, .cinema-book-open, .btn-pill-white, .btn-pill-outline');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('active'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
        });
    }

    // --- 4. Navbar Scroll & Mobile Menu Toggle ---
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // --- 5. Notebook Role Flip Calendar Animator ---
    const notebookRoleText = document.getElementById('notebookRoleText');
    const roleCounter = document.getElementById('roleCounter');
    if (notebookRoleText) {
        const roles = [
            "VAPT Specialist",
            "SOC Analyst",
            "Bug Bounty Hunter",
            "Prompt Engineer"
        ];
        let currentRoleIndex = 0;

        function flipNextRole() {
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;

            notebookRoleText.style.opacity = '0';
            notebookRoleText.style.transform = 'translateY(-8px)';

            setTimeout(() => {
                notebookRoleText.textContent = roles[currentRoleIndex];
                if (roleCounter) {
                    roleCounter.textContent = `0${currentRoleIndex + 1} / 0${roles.length}`;
                }
                notebookRoleText.style.opacity = '1';
                notebookRoleText.style.transform = 'translateY(0)';
            }, 250);
        }

        notebookRoleText.style.transition = 'all 0.25s ease';
        setInterval(flipNextRole, 2600);
    }

    // --- 6. Interactive 3D Doors & Dedicated Fullscreen Skill Screen Engine ---
    let isDoorAnimating = false;
    const doorsWrapper = document.querySelector('.doors-wrapper');
    const doorPortalOverlay = document.getElementById('doorPortalOverlay');

    function triggerDoorSequence(categoryKey, doorElement) {
        if (isDoorAnimating) return;
        isDoorAnimating = true;

        const doorRect = doorElement.getBoundingClientRect();
        const wrapperRect = doorsWrapper.getBoundingClientRect();
        const originX = ((doorRect.left + doorRect.width / 2 - wrapperRect.left) / wrapperRect.width) * 100;
        const originY = ((doorRect.top + doorRect.height / 2 - wrapperRect.top) / wrapperRect.height) * 100;

        doorsWrapper.style.transformOrigin = `${originX}% ${originY}%`;

        if (typeof gsap !== 'undefined') {
            const tl = gsap.timeline({
                onComplete: () => {
                    openDoorPortal(categoryKey);
                }
            });

            // 1. Unlocking padlock & handle (0.25s)
            tl.to(doorElement.querySelector('.door-padlock-icon'), {
                rotation: -25,
                scale: 1.35,
                color: '#fce088',
                duration: 0.25,
                ease: "back.out(1.7)"
            })
            .to(doorElement.querySelector('.gold-handle'), {
                rotation: 24,
                duration: 0.2,
                ease: "power1.inOut"
            }, "-=0.1")

            // 2. SIMULTANEOUS Synchronized Full-Door Opening + Camera Walk-Through
            .to(doorElement.querySelector('.door-leaf'), {
                rotateY: -112,
                duration: 1.0,
                ease: "power2.inOut"
            }, "+=0.05")
            .to(doorsWrapper, {
                scale: 5.5,
                duration: 1.0,
                ease: "power2.inOut"
            }, "-=1.0");
        } else {
            doorElement.classList.add('unlocking', 'open');
            setTimeout(() => {
                openDoorPortal(categoryKey);
            }, 800);
        }
    }

    function openDoorPortal(categoryKey) {
        if (!doorPortalOverlay) return;

        document.querySelectorAll('.door-portal-card').forEach(card => card.classList.remove('active'));

        const activePortalCard = document.getElementById(`portal-${categoryKey}`);
        if (activePortalCard) activePortalCard.classList.add('active');

        doorPortalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevents background body scrolling!
    }

    function closeDoorPortal() {
        if (!doorPortalOverlay) return;

        doorPortalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restores background body scrolling!

        setTimeout(() => {
            if (typeof gsap !== 'undefined' && doorsWrapper) {
                gsap.to(doorsWrapper, {
                    scale: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    onComplete: () => {
                        document.querySelectorAll('.door-card').forEach(door => {
                            door.classList.remove('open', 'unlocking');
                            const leaf = door.querySelector('.door-leaf');
                            if (leaf) gsap.set(leaf, { rotateY: 0 });
                            const padlock = door.querySelector('.door-padlock-icon');
                            if (padlock) gsap.set(padlock, { rotation: 0, scale: 1, color: '#ffffff' });
                            const handle = door.querySelector('.gold-handle');
                            if (handle) gsap.set(handle, { rotation: 0 });
                        });
                        doorsWrapper.style.transformOrigin = 'center center';
                        isDoorAnimating = false;
                    }
                });
            } else {
                document.querySelectorAll('.door-card').forEach(door => {
                    door.classList.remove('open', 'unlocking');
                });
                isDoorAnimating = false;
            }
        }, 250);
    }

    document.querySelectorAll('.door-card').forEach(door => {
        door.addEventListener('click', (e) => {
            const category = door.getAttribute('data-door');
            if (category && !door.classList.contains('open')) {
                triggerDoorSequence(category, door);
            }
        });
    });

    document.querySelectorAll('.portal-return-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeDoorPortal();
        });
    });

    // --- 7. Sticky Timeline Progress & Dynamic Year (CONNECTING LINE ACROSS ALL 5 CARDS) ---
    const stickyYear = document.getElementById('stickyYear');
    const stickyDateRange = document.getElementById('stickyDateRange');
    const progressFillLine = document.getElementById('progressFillLine');
    const timelineStepCounter = document.getElementById('timelineStepCounter');
    const timelineItems = document.querySelectorAll('.timeline-item-card');
    const scrollRightContainer = document.querySelector('.timeline-scroll-right');
    const timelineActiveLine = document.getElementById('timelineActiveLine');

    function updateTimelineState() {
        if (!scrollRightContainer || !stickyYear) return;

        const scrollTop = scrollRightContainer.scrollTop;
        const scrollHeight = scrollRightContainer.scrollHeight - scrollRightContainer.clientHeight;
        const percentage = scrollHeight > 0 ? Math.min(100, Math.max(0, Math.round((scrollTop / scrollHeight) * 100))) : 0;

        if (timelineActiveLine) {
            // Extend vertical glowing laser line across ALL 5 milestone cards (2026, 2025, 2024, 2023, 2022)
            const totalLineLength = scrollRightContainer.scrollHeight - 60;
            const currentLineLength = Math.max(50, (percentage / 100) * totalLineLength);
            timelineActiveLine.style.height = `${currentLineLength}px`;
        }

        if (progressFillLine) progressFillLine.style.width = `${percentage}%`;

        timelineItems.forEach((item, idx) => {
            const itemTop = item.offsetTop - scrollRightContainer.offsetTop;
            const itemHeight = item.offsetHeight;

            if (scrollTop >= itemTop - 60 && scrollTop < itemTop + itemHeight + 20) {
                const year = item.getAttribute('data-year');
                const dateRange = item.getAttribute('data-range');

                if (year && stickyYear.textContent !== year) {
                    stickyYear.textContent = year;
                }
                if (dateRange && stickyDateRange) {
                    stickyDateRange.textContent = dateRange;
                }
                if (timelineStepCounter) {
                    timelineStepCounter.textContent = `0${idx + 1} / 0${timelineItems.length}`;
                }

                item.classList.add('active');
            } else {
                if (idx === 0 && scrollTop < 50) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            }
        });
    }

    if (scrollRightContainer) {
        scrollRightContainer.addEventListener('scroll', updateTimelineState);
        updateTimelineState();
    }

    // --- 8. Pure 3D Animated Black Leather Open Book Engine ---
    const cinemaBookClosed = document.getElementById('cinemaBookClosed');
    const cinemaBookOpen = document.getElementById('cinemaBookOpen');
    const cinemaRightPage = document.getElementById('cinemaRightPage');

    const cinemaProjects = [
        {
            title: "Android Pen-Testing App",
            badge: "VERIFIED PROJECT",
            desc: "Mobile Vulnerability Assessment Toolkit built in Kotlin for mobile security auditing, network reconnaissance, and local port scanning directly on Android devices.",
            image: "android-pen-testing-app.jpeg",
            stack: ["Kotlin", "Android SDK", "Nmap", "SQLite"],
            features: [
                "Network reconnaissance & port scanning",
                "Local vulnerability assessment",
                "Lightweight & mobile-friendly toolkit",
                "Built for security research & learning"
            ],
            detailsLink: "project-details.html?id=android-pentest"
        },
        {
            title: "Threat Intelligence Dashboard",
            badge: "VERIFIED PROJECT",
            desc: "Real-time vulnerability monitoring and incident alert system powered by Python and FastAPI for aggregating threat feeds and visualizing active attack surfaces.",
            image: "threat-intelligence-dashborad.png",
            stack: ["Python", "FastAPI", "Redis", "D3.js"],
            features: [
                "Real-time threat feed aggregation",
                "Instant critical vulnerability alerting",
                "High-performance FastAPI backend",
                "Interactive D3.js threat visualization"
            ],
            detailsLink: "project-details.html?id=threat-intel"
        },
        {
            title: "Web Vulnerability Scanner",
            badge: "VERIFIED PROJECT",
            desc: "Automated web audit engine engineered to crawl web applications, test for XSS, SQL Injection, and misconfigurations, and output comprehensive remediation reports.",
            image: "web-vulnerability-scanner.png",
            stack: ["Python", "Docker", "OWASP ZAP API"],
            features: [
                "Automated XSS & SQLi payload testing",
                "Deep web crawler & endpoint discovery",
                "Containerized execution with Docker",
                "Detailed security remediation reports"
            ],
            detailsLink: "project-details.html?id=web-scanner"
        },
        {
            title: "Domain Guard & OSINT Recon Suite",
            badge: "VERIFIED PROJECT",
            desc: "Open Source Intelligence (OSINT) suite designed for DNS enumeration, subdomain discovery, and automated network perimeter auditing.",
            image: "elevance-skills-technology.jpg",
            stack: ["Python", "OSINT", "DNS Security"],
            features: [
                "DNS enumeration & subdomain discovery",
                "Open port & service fingerprinting",
                "Automated perimeter security audit",
                "OSINT intelligence gathering suite"
            ],
            detailsLink: "projects.html"
        }
    ];

    let currentCinemaIndex = 0;
    let isCinemaFlipping = false;

    function openCinemaBook() {
        if (cinemaBookClosed && cinemaBookOpen) {
            cinemaBookClosed.classList.add('opening');
            setTimeout(() => {
                cinemaBookClosed.style.display = 'none';
                cinemaBookOpen.classList.add('active');
            }, 350);
        }
    }

    function foldCinemaBookClosed() {
        if (cinemaBookClosed && cinemaBookOpen) {
            cinemaBookOpen.classList.remove('active');
            cinemaBookClosed.style.display = 'flex';
            setTimeout(() => {
                cinemaBookClosed.classList.remove('opening');
            }, 50);
        }
    }

    function flipCinemaPageTo(targetIndex, direction = 'next') {
        if (isCinemaFlipping || !cinemaRightPage) return;
        isCinemaFlipping = true;

        const proj = cinemaProjects[targetIndex];
        if (!proj) {
            isCinemaFlipping = false;
            return;
        }

        const animClass = direction === 'next' ? 'flipping-next' : 'flipping-prev';
        cinemaRightPage.classList.add(animClass);

        setTimeout(() => {
            currentCinemaIndex = targetIndex;

            const logoImg = document.getElementById('cinemaLogoImg');
            const titleEl = document.getElementById('cinemaProjTitle');
            const descEl = document.getElementById('cinemaProjDesc');
            const stackEl = document.getElementById('cinemaProjStack');
            const featuresEl = document.getElementById('cinemaProjFeatures');
            const linkEl = document.getElementById('cinemaProjLink');
            const counterEl = document.getElementById('cinemaPageCounter');

            if (logoImg) logoImg.src = proj.image;
            if (titleEl) titleEl.textContent = proj.title;
            if (descEl) descEl.textContent = proj.desc;
            if (linkEl) linkEl.href = proj.detailsLink;

            if (stackEl) {
                stackEl.innerHTML = proj.stack.map(s => `<span class="cinema-stack-pill">${s}</span>`).join('');
            }

            if (featuresEl) {
                featuresEl.innerHTML = proj.features.map(f => `<li><span class="check">✔</span> <span>${f}</span></li>`).join('');
            }

            if (counterEl) {
                counterEl.textContent = `PAGE 0${targetIndex + 1} OF 0${cinemaProjects.length}`;
            }

            cinemaRightPage.classList.remove(animClass);
            setTimeout(() => {
                isCinemaFlipping = false;
            }, 300);
        }, 350);
    }

    if (cinemaBookClosed) {
        cinemaBookClosed.addEventListener('click', openCinemaBook);
    }

    const prevCinemaBtn = document.getElementById('cinemaPrevBtn');
    const nextCinemaBtn = document.getElementById('cinemaNextBtn');

    if (prevCinemaBtn) {
        prevCinemaBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const nextIdx = (currentCinemaIndex - 1 + cinemaProjects.length) % cinemaProjects.length;
            flipCinemaPageTo(nextIdx, 'prev');
        });
    }

    if (nextCinemaBtn) {
        nextCinemaBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const nextIdx = (currentCinemaIndex + 1) % cinemaProjects.length;
            flipCinemaPageTo(nextIdx, 'next');
        });
    }

    if (cinemaBookOpen) {
        cinemaBookOpen.addEventListener('dblclick', foldCinemaBookClosed);
    }

    // --- 9. Back to Top Scroll ---
    const btnScrollTop = document.getElementById('btnScrollTop');
    if (btnScrollTop) {
        btnScrollTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 10. GSAP Animations ---
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        gsap.from('.bullet-tag, .hero-title-main, .hero-title-sub, .notebook-flip-card, .hero-ctas', {
            opacity: 0,
            y: 25,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
        });

        gsap.from('.door-card', {
            scrollTrigger: {
                trigger: '.doors-section',
                start: 'top 80%'
            },
            opacity: 0,
            y: 40,
            stagger: 0.12,
            duration: 0.7,
            ease: "power2.out"
        });
    }
});
