document.addEventListener('DOMContentLoaded', () => {
        const navMenu = document.getElementById('nav-menu');
        const loggedInUserJSON = localStorage.getItem('loggedInUser');
        
        if (!loggedInUserJSON) {
            window.location.href = 'signin.html';
            return;
        }

        const loggedInUser = JSON.parse(loggedInUserJSON);
        navMenu.innerHTML = `
            <a href="tracker.html" class="group relative text-slate-300 font-medium transition-colors duration-300 hover:text-white"><span>Tracker</span><span class="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-accent-sky transition-all duration-300 group-hover:w-full"></span></a>
            <a href="about.html" class="group relative text-slate-300 font-medium transition-colors duration-300 hover:text-white"><span>About Team</span><span class="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-accent-sky transition-all duration-300 group-hover:w-full"></span></a>
            <button id="signout-btn" class="bg-red-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-red-600 transition-all">Sign Out</button>
        `;
        document.getElementById('signout-btn').addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            window.location.href = 'index.html';
        });

        const form = document.getElementById('edit-form');
        const profileId = loggedInUser.profileId;
        const profileType = profileId.charAt(0) === 'T' ? 'teacher' : 'student';

        let allProfiles = [];
        let profileIndex = -1;

        if (profileType === 'student') {
            const customStudents = JSON.parse(localStorage.getItem('customStudents')) || [];
            allProfiles = customStudents;
            profileIndex = allProfiles.findIndex(p => p.id === profileId);
        } else {
            const customTeachers = JSON.parse(localStorage.getItem('customTeachers')) || [];
            allProfiles = customTeachers;
            profileIndex = allProfiles.findIndex(p => p.id === profileId);
        }

        const profileData = allProfiles[profileIndex];

        if (!profileData) {
            form.innerHTML = '<p class="text-red-400 text-center">Could not find profile data to edit.</p>';
            return;
        }

        // Pre-populate the form
        form.insertAdjacentHTML('afterbegin', `
            <h2 class="font-serif text-2xl font-bold text-white mb-4">Basic Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label for="name" class="block text-sm font-medium text-slate-300">Full Name</label>
                    <input type="text" id="name" required class="mt-1 w-full bg-slate-800 border-slate-600 rounded-md text-white p-2" value="${profileData.name || ''}">
                </div>
                <div>
                    <label for="dob" class="block text-sm font-medium text-slate-300">Date of Birth</label>
                    <input type="date" id="dob" class="mt-1 w-full bg-slate-800 border-slate-600 rounded-md text-white p-2" value="${profileData.dob || ''}">
                </div>
                <div class="md:col-span-2">
                    <label for="address" class="block text-sm font-medium text-slate-300">Address</label>
                    <input type="text" id="address" class="mt-1 w-full bg-slate-800 border-slate-600 rounded-md text-white p-2" value="${profileData.address || ''}">
                </div>
                <div class="md:col-span-2">
                    <label for="photoUrl" class="block text-sm font-medium text-slate-300">Photo URL</label>
                    <input type="text" id="photoUrl" class="mt-1 w-full bg-slate-800 border-slate-600 rounded-md text-white p-2" value="${profileData.photoUrl || ''}">
                </div>
            </div>
        `);

        // Handle form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const updatedProfile = {
                ...profileData, // Keep existing data like ID
                name: document.getElementById('name').value,
                dob: document.getElementById('dob').value,
                address: document.getElementById('address').value,
                photoUrl: document.getElementById('photoUrl').value,
            };

            allProfiles[profileIndex] = updatedProfile;

            if (profileType === 'student') {
                localStorage.setItem('customStudents', JSON.stringify(allProfiles));
            } else {
                localStorage.setItem('customTeachers', JSON.stringify(allProfiles));
            }

            alert('Profile updated successfully!');
            window.location.href = 'tracker.html';
        });
    });