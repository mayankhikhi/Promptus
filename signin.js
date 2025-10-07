document.addEventListener('DOMContentLoaded', () => {
            const navMenu = document.getElementById('nav-menu');
            const loggedInUser = localStorage.getItem('loggedInUser');

            if (loggedInUser) {
                 navMenu.innerHTML = `
                    <a href="tracker.html" class="group relative text-slate-300 font-medium transition-colors duration-300 hover:text-white"><span>Tracker</span><span class="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-accent-sky transition-all duration-300 group-hover:w-full"></span></a>
                    <a href="about.html" class="group relative text-slate-300 font-medium transition-colors duration-300 hover:text-white"><span>About Team</span><span class="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-accent-sky transition-all duration-300 group-hover:w-full"></span></a>
                    <button id="signout-btn" class="bg-red-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-red-600 transition-all">Sign Out</button>
                `;
                 document.getElementById('signout-btn').addEventListener('click', () => {
                    localStorage.removeItem('loggedInUser');
                    window.location.href = 'index.html';
                });
            } else {
                navMenu.innerHTML = `
                    <a href="tracker.html" class="group relative text-slate-300 font-medium transition-colors duration-300 hover:text-white"><span>Tracker</span><span class="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-accent-sky transition-all duration-300 group-hover:w-full"></span></a>
                    <a href="about.html" class="group relative text-slate-300 font-medium transition-colors duration-300 hover:text-white"><span>About Team</span><span class="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-accent-sky transition-all duration-300 group-hover:w-full"></span></a>
                    <a href="signin.html" class="text-accent-sky font-semibold">Sign In</a>
                    <a href="register.html" class="bg-accent-violet text-white py-2 px-4 rounded-md font-semibold hover:bg-violet-700 transition-all">Register Profile</a>
                `;
            }

            const form = document.getElementById('signin-form');
            const errorMessage = document.getElementById('error-message');

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                errorMessage.classList.add('hidden');
                
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;

                const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
                const user = users.find(u => u.email === email && u.password === password);

                if (user) {
                    localStorage.setItem('loggedInUser', JSON.stringify(user));
                    window.location.href = './tracker.html';
                } else {
                    errorMessage.classList.remove('hidden');
                }
            });
        });