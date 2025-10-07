document.addEventListener('DOMContentLoaded', () => {
             const navMenu = document.getElementById('nav-menu');
            const loggedInUser = localStorage.getItem('loggedInUser');

            if (loggedInUser) {
                 navMenu.innerHTML = `
                    <a href="tracker.html" class="px-3 py-1 rounded-md group relative text-slate-300 font-medium transition-colors duration-300 hover:text-white"><span>Tracker</span><span class="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-accent-sky transition-all duration-300 group-hover:w-full"></span></a>
                    <a href="about.html" class="px-3 py-1 rounded-md group relative text-slate-300 font-medium transition-colors duration-300 hover:text-white"><span>About Team</span><span class="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-accent-sky transition-all duration-300 group-hover:w-full"></span></a>
                    <button id="signout-btn" class="bg-red-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-red-600 transition-all">Sign Out</button>
                `;
                 document.getElementById('signout-btn').addEventListener('click', () => {
                    localStorage.removeItem('loggedInUser');
                    window.location.href = 'index.html';
                });
            } else {
                navMenu.innerHTML = `
                    <a href="#features" class="px-3 py-1 rounded-md group relative text-slate-300 font-medium transition-colors duration-300 hover:text-white"><span>Features</span><span class="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-accent-sky transition-all duration-300 group-hover:w-full"></span></a>
                    <a href="tracker.html" class="px-3 py-1 rounded-md group relative text-slate-300 font-medium transition-colors duration-300 hover:text-white"><span>Tracker</span><span class="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-accent-sky transition-all duration-300 group-hover:w-full"></span></a>
                    <a href="about.html" class="px-3 py-1 rounded-md group relative text-slate-300 font-medium transition-colors duration-300 hover:text-white"><span>About Team</span><span class="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-accent-sky transition-all duration-300 group-hover:w-full"></span></a>
                    <a href="signin.html" class="px-3 py-1 rounded-md text-accent-sky font-semibold">Sign In</a>
                    <a href="register.html" class="bg-accent-violet text-white py-2 px-4 rounded-md font-semibold hover:bg-violet-700 transition-all">Register Profile</a>
                `;
            }

            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });

            // Animate on scroll
            const observers = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observers.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });

            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                observers.observe(el);
            });
        });