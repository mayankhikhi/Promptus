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

        const registrationContainer = document.getElementById('registration-container');
        const successMessageContainer = document.getElementById('success-message');
        const form = document.getElementById('registration-form');
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');
        const submitBtn = document.getElementById('submit-btn');
        const stepContainer = document.getElementById('form-step-container');
        const photoUploadInput = document.getElementById('photoUpload');
        const photoPreview = document.getElementById('photo-preview');
        const profileTypeSelect = document.getElementById('profileType');
        let photoDataUrl = null;

        let currentStep = 1;
        const totalSteps = 3;

        const updateFormState = () => {
            const profileType = profileTypeSelect.value;
            const isStudentOrAlumnus = profileType === 'student' || profileType === 'alumnus';
            document.getElementById('student-details').style.display = isStudentOrAlumnus ? 'block' : 'none';
            document.getElementById('teacher-details').style.display = profileType === 'teacher' ? 'block' : 'none';
            
            stepContainer.querySelectorAll('.form-section').forEach(section => {
                section.classList.toggle('active', parseInt(section.dataset.step) === currentStep);
            });
            prevBtn.classList.toggle('hidden', currentStep === 1);
            nextBtn.classList.toggle('hidden', currentStep === totalSteps);
            submitBtn.classList.toggle('hidden', currentStep !== totalSteps);
        };
        
        nextBtn.addEventListener('click', () => { currentStep++; updateFormState(); });
        prevBtn.addEventListener('click', () => { currentStep--; updateFormState(); });
        profileTypeSelect.addEventListener('change', updateFormState);

        photoUploadInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    photoPreview.src = e.target.result;
                    photoDataUrl = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

        // Dynamic fields
        const fieldTemplates = {
            'academic-records-container': `<div class="grid grid-cols-2 md:grid-cols-4 gap-2"><input type="text" placeholder="Grade" class="academic-grade bg-slate-800 p-2 text-sm rounded-md"><input type="number" placeholder="Year" class="academic-year bg-slate-800 p-2 text-sm rounded-md"><input type="number" placeholder="%" class="academic-percentage bg-slate-800 p-2 text-sm rounded-md"><input type="text" placeholder="Achievements" class="academic-achievements bg-slate-800 p-2 text-sm rounded-md"></div>`,
            'college-records-container': `<div class="grid grid-cols-2 md:grid-cols-4 gap-2"><input type="text" placeholder="Degree" class="college-degree bg-slate-800 p-2 text-sm rounded-md"><input type="text" placeholder="Institution" class="college-institution bg-slate-800 p-2 text-sm rounded-md"><input type="text" placeholder="Duration" class="college-duration bg-slate-800 p-2 text-sm rounded-md"><input type="text" placeholder="CGPA" class="college-cgpa bg-slate-800 p-2 text-sm rounded-md"></div>`,
            'internships-container': `<div class="grid grid-cols-2 md:grid-cols-3 gap-2"><input type="text" placeholder="Company" class="internship-company bg-slate-800 p-2 text-sm rounded-md"><input type="text" placeholder="Role" class="internship-role bg-slate-800 p-2 text-sm rounded-md"><input type="text" placeholder="Duration" class="internship-duration bg-slate-800 p-2 text-sm rounded-md"></div>`,
            'skills-container': `<div class="grid grid-cols-2 gap-2"><input type="text" placeholder="Skill Name" class="skill-name bg-slate-800 p-2 text-sm rounded-md"><input type="number" placeholder="Proficiency (1-100)" class="skill-proficiency bg-slate-800 p-2 text-sm rounded-md"></div>`,
            'qualifications-container': `<input type="text" placeholder="e.g., Ph.D. in Physics" class="qualification-input w-full bg-slate-800 p-2 text-sm rounded-md">`,
        };

        document.querySelectorAll('.add-field-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.dataset.target;
                const container = document.getElementById(targetId);
                const div = document.createElement('div');
                div.className = 'p-2 border border-slate-700 rounded-md';
                div.innerHTML = fieldTemplates[targetId];
                container.appendChild(div);
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const profileType = profileTypeSelect.value;
            const randomId = Math.floor(1000 + Math.random() * 9000);
            
            let idPrefix = 'S';
            if (profileType === 'alumnus') idPrefix = 'A';
            if (profileType === 'teacher') idPrefix = 'T';

            const newProfileData = {
                id: idPrefix + randomId,
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                photoUrl: photoDataUrl || `https://placehold.co/150x150/a78bfa/FFFFFF?text=${document.getElementById('name').value.charAt(0)}`,
                dob: document.getElementById('dob').value,
                address: document.getElementById('address').value,
            };

            const newUser = {
                email: newProfileData.email,
                password: document.getElementById('password').value,
                profileId: newProfileData.id
            };

            let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
            users.push(newUser);
            localStorage.setItem('registeredUsers', JSON.stringify(users));

            if (profileType === 'student' || profileType === 'alumnus') {
                newProfileData.profileType = profileType.charAt(0).toUpperCase() + profileType.slice(1);
                newProfileData.academicRecords = Array.from(document.querySelectorAll('#academic-records-container > div')).map(div => ({ grade: div.querySelector('.academic-grade').value, year: div.querySelector('.academic-year').value, percentage: div.querySelector('.academic-percentage').value, achievements: div.querySelector('.academic-achievements').value })).filter(r => r.grade);
                newProfileData.collegeRecords = Array.from(document.querySelectorAll('#college-records-container > div')).map(div => ({ degree: div.querySelector('.college-degree').value, institution: div.querySelector('.college-institution').value, duration: div.querySelector('.college-duration').value, cgpa: div.querySelector('.college-cgpa').value })).filter(r => r.degree);
                newProfileData.internships = Array.from(document.querySelectorAll('#internships-container > div')).map(div => ({ company: div.querySelector('.internship-company').value, role: div.querySelector('.internship-role').value, duration: div.querySelector('.internship-duration').value })).filter(r => r.company);
                newProfileData.skills = Array.from(document.querySelectorAll('#skills-container > div')).map(div => ({ skill: div.querySelector('.skill-name').value, proficiency: parseInt(div.querySelector('.skill-proficiency').value) })).filter(r => r.skill);

                let students = JSON.parse(localStorage.getItem('customStudents')) || [];
                students.push(newProfileData);
                localStorage.setItem('customStudents', JSON.stringify(students));
            } else { // Teacher
                newProfileData.school = document.getElementById('teacher-school').value;
                newProfileData.subject = document.getElementById('teacher-subject').value;
                newProfileData.experience = document.getElementById('teacher-experience').value + ' Years';
                newProfileData.qualifications = Array.from(document.querySelectorAll('.qualification-input')).map(input => input.value).filter(q => q);
                
                let teachers = JSON.parse(localStorage.getItem('customTeachers')) || [];
                teachers.push(newProfileData);
                localStorage.setItem('customTeachers', JSON.stringify(teachers));
            }

            document.getElementById('generated-id').textContent = newProfileData.id;
            registrationContainer.classList.add('hidden');
            successMessageContainer.classList.remove('hidden');
        });
        
        updateFormState();
    });