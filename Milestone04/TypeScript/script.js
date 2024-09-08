"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const toggleSkillsButton = document.getElementById('toggle-skills');
    const skillsContent = document.getElementById('skills-content');
    const toggleHobbiesButton = document.getElementById('toggle-hobbies');
    const hobbiesContent = document.getElementById('hobbies-content');
    // Initialize button texts
    toggleSkillsButton.textContent = 'Show Skills';
    toggleHobbiesButton.textContent = 'See Hobbies';
    // Toggle skills section visibility
    toggleSkillsButton.addEventListener('click', () => {
        if (skillsContent.style.display === 'none' || skillsContent.style.display === '') {
            skillsContent.style.display = 'block';
            toggleSkillsButton.textContent = 'Hide Skills';
        }
        else {
            skillsContent.style.display = 'none';
            toggleSkillsButton.textContent = 'Show Skills';
        }
    });
    // Toggle hobbies section visibility
    toggleHobbiesButton.addEventListener('click', () => {
        if (hobbiesContent.style.display === 'none' || hobbiesContent.style.display === '') {
            hobbiesContent.style.display = 'block';
            toggleHobbiesButton.textContent = 'Hide Hobbies';
        }
        else {
            hobbiesContent.style.display = 'none';
            toggleHobbiesButton.textContent = 'See Hobbies';
        }
    });
    const form = document.getElementById('resume-form');
    const resume = document.getElementById('resume');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        generateResume();
    });
    function generateResume() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const details = document.getElementById('details').value;
        const institution = document.getElementById('institution').value;
        const major = document.getElementById('major').value;
        const minor = document.getElementById('minor').value;
        const work = document.getElementById('work').value;
        const skills = document.getElementById('skills').value;
        const hobbies = document.getElementById('hobbies').value;
        // Handle profile picture
        const profilePictureInput = document.getElementById('profile-picture');
        let profilePictureHTML = '';
        if (profilePictureInput.files && profilePictureInput.files[0]) {
            const file = profilePictureInput.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    if (img.width === img.height) {
                        profilePictureHTML = `<img src="${img.src}" alt="Profile Picture" style="width: 150px; height: 150px; object-fit: cover;">`;
                    }
                    else {
                        profilePictureHTML = `<p>Image should have a 1:1 aspect ratio. Please upload an image with the correct dimensions.</p>`;
                    }
                    updateResume();
                };
            };
            reader.readAsDataURL(file);
        }
        else {
            profilePictureHTML = '';
            updateResume();
        }
        function updateResume() {
            const resumeContent = `
                <section class="personal-info">
                ${profilePictureHTML}
                <h1>${name}</h1>
                <h2>Contact Info</h2>
                <p>Phone: <a href="tel:${phone}">${phone}</a></p>
                <p>Email: <a href="mailto:${email}">${email}</a></p>
                <h2>Details</h2>
                <p class="editable" data-field="details">${details}</p>
                </section>
                <section class="education">
                <h2>Education</h2>
                <p><strong>Institution:</strong> <span class="editable" data-field="institution">${institution}</span></p>
                <p><strong>Major:</strong> <span class="editable" data-field="major">${major}</span><br><strong>Minor:</strong> <span class="editable" data-field="minor">${minor}</span></p>
                </section>
                <section class="work-experience">
                <h2>Experience</h2>
                <p class="editable" data-field="work">${work}</p>
                </section>
                <section class="skills">
                <h2>Skills</h2>
                <p class="editable" data-field="skills">${skills}</p>
                </section>
                <section class="hobbies">
                <h2>Hobbies</h2>
                <p class="editable" data-field="hobbies">${hobbies}</p>
                </section>
            `;
            resume.innerHTML = resumeContent;
            // Add event listeners to editable fields
            const editableFields = document.querySelectorAll('.editable');
            editableFields.forEach(field => {
                field.addEventListener('click', () => {
                    const fieldType = field.dataset.field;
                    const currentText = field.textContent || ''; // Ensure it's a string
                    const newContent = prompt(`Edit ${fieldType}`, currentText);
                    if (newContent !== null) {
                        field.textContent = newContent;
                    }
                });
            });
        }
        // Show the resume container when the resume is generated
        const resumeContainer = document.getElementById('resume-container');
        if (resumeContainer) {
            resumeContainer.style.display = 'block';
        }
    }
});
