/* ==========================================================================
   Dhruv Patel - Stable 3D Door & Physical Book Page Flip Engine
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

    // --- 6. Interactive 3D Doors Engine ---
    let isDoorAnimating = false;
    const doorPortalOverlay = document.getElementById('doorPortalOverlay');

    function triggerDoorSequence(categoryKey, doorElement) {
        if (isDoorAnimating) return;
        isDoorAnimating = true;

        const leaf = doorElement.querySelector('.door-leaf');
        const padlock = doorElement.querySelector('.door-padlock-icon');
        const handle = doorElement.querySelector('.gold-handle');

        if (typeof gsap !== 'undefined' && leaf) {
            const tl = gsap.timeline({
                onComplete: () => {
                    openDoorPortal(categoryKey);
                }
            });

            if (padlock) {
                tl.to(padlock, { rotation: -25, scale: 1.35, color: '#fce088', duration: 0.25, ease: "back.out(1.7)" });
            }
            if (handle) {
                tl.to(handle, { rotation: 24, duration: 0.2, ease: "power1.inOut" }, "-=0.1");
            }

            tl.to(leaf, { rotateY: -110, duration: 0.7, ease: "power2.inOut" }, "+=0.05");
        } else {
            doorElement.classList.add('unlocking', 'open');
            setTimeout(() => {
                openDoorPortal(categoryKey);
            }, 600);
        }
    }

    function openDoorPortal(categoryKey) {
        if (!doorPortalOverlay) return;

        document.querySelectorAll('.door-portal-card').forEach(card => card.classList.remove('active'));

        const activePortalCard = document.getElementById(`portal-${categoryKey}`);
        if (activePortalCard) activePortalCard.classList.add('active');

        doorPortalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeDoorPortal() {
        if (!doorPortalOverlay) return;

        doorPortalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';

        setTimeout(() => {
            document.querySelectorAll('.door-card').forEach(door => {
                door.classList.remove('open', 'unlocking');
                const leaf = door.querySelector('.door-leaf');
                if (leaf) {
                    if (typeof gsap !== 'undefined') gsap.to(leaf, { rotateY: 0, duration: 0.5, ease: "power2.out" });
                    else leaf.style.transform = 'rotateY(0deg)';
                }
                const padlock = door.querySelector('.door-padlock-icon');
                if (padlock) {
                    if (typeof gsap !== 'undefined') gsap.to(padlock, { rotation: 0, scale: 1, color: '#ffffff', duration: 0.3 });
                }
                const handle = door.querySelector('.gold-handle');
                if (handle) {
                    if (typeof gsap !== 'undefined') gsap.to(handle, { rotation: 0, duration: 0.3 });
                }
            });
            isDoorAnimating = false;
        }, 200);
    }

    document.querySelectorAll('.door-card').forEach(door => {
        door.addEventListener('click', () => {
            const category = door.getAttribute('data-door');
            if (category) {
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

    if (doorPortalOverlay) {
        doorPortalOverlay.addEventListener('click', (e) => {
            if (e.target === doorPortalOverlay) {
                closeDoorPortal();
            }
        });
    }

    // --- 7. Sticky Timeline Progress & Dynamic Year ---
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
            detailsLink: "projects.html#proj-1"
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
            detailsLink: "projects.html#proj-2"
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
            detailsLink: "projects.html#proj-3"
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
            detailsLink: "projects.html#proj-4"
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
            }, 300);
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

    function renderCinemaProject(index) {
        if (index < 0 || index >= cinemaProjects.length) return;

        const proj = cinemaProjects[index];
        const cinemaLogoImg = document.getElementById('cinemaLogoImg');
        const cinemaProjTitle = document.getElementById('cinemaProjTitle');
        const cinemaProjDesc = document.getElementById('cinemaProjDesc');
        const cinemaProjStack = document.getElementById('cinemaProjStack');
        const cinemaProjFeatures = document.getElementById('cinemaProjFeatures');
        const cinemaProjLink = document.getElementById('cinemaProjLink');
        const cinemaPageCounter = document.getElementById('cinemaPageCounter');

        if (cinemaLogoImg) cinemaLogoImg.src = proj.image;
        if (cinemaProjTitle) cinemaProjTitle.textContent = proj.title;
        if (cinemaProjDesc) cinemaProjDesc.textContent = proj.desc;
        if (cinemaPageCounter) cinemaPageCounter.textContent = `0${index + 1} / 04`;
        if (cinemaProjLink) cinemaProjLink.href = proj.detailsLink;

        if (cinemaProjStack) {
            cinemaProjStack.innerHTML = proj.stack.map(s => `<span class="cinema-stack-pill">${s}</span>`).join('');
        }

        if (cinemaProjFeatures) {
            cinemaProjFeatures.innerHTML = proj.features.map(f => `<li><span class="check">✔</span> <span>${f}</span></li>`).join('');
        }

        // Update 4 Pagination Dots
        const dots = document.querySelectorAll('.cinema-dot');
        dots.forEach((dot, dIdx) => {
            if (dIdx === index) dot.classList.add('active');
            else dot.classList.remove('active');
        });
    }

    function flipToCinemaPage(newIndex, direction) {
        if (isCinemaFlipping) return;
        isCinemaFlipping = true;

        if (cinemaRightPage) {
            cinemaRightPage.classList.add(direction === 'next' ? 'flipping-next' : 'flipping-prev');

            setTimeout(() => {
                currentCinemaIndex = newIndex;
                renderCinemaProject(currentCinemaIndex);
                cinemaRightPage.classList.remove('flipping-next', 'flipping-prev');
                isCinemaFlipping = false;
            }, 350);
        } else {
            currentCinemaIndex = newIndex;
            renderCinemaProject(currentCinemaIndex);
            isCinemaFlipping = false;
        }

        setTimeout(() => { isCinemaFlipping = false; }, 450);
    }

    if (cinemaBookClosed) {
        cinemaBookClosed.addEventListener('click', openCinemaBook);
    }

    const cinemaLeftPage = document.getElementById('cinemaLeftPage');
    if (cinemaLeftPage) {
        cinemaLeftPage.addEventListener('click', foldCinemaBookClosed);
    }

    const cinemaPrevBtn = document.getElementById('cinemaPrevBtn');
    const cinemaNextBtn = document.getElementById('cinemaNextBtn');

    if (cinemaPrevBtn) {
        cinemaPrevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const prevIndex = (currentCinemaIndex - 1 + cinemaProjects.length) % cinemaProjects.length;
            flipToCinemaPage(prevIndex, 'prev');
        });
    }

    if (cinemaNextBtn) {
        cinemaNextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const nextIndex = (currentCinemaIndex + 1) % cinemaProjects.length;
            flipToCinemaPage(nextIndex, 'next');
        });
    }

    // --- 9. Smooth Back to Top Scroll ---
    const btnScrollTop = document.getElementById('btnScrollTop');
    if (btnScrollTop) {
        btnScrollTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

});
