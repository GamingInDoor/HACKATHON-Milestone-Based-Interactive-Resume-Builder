declare const html2pdf: any;

document.addEventListener('DOMContentLoaded', () => {
    const generatePdfButton = document.createElement('button');
    generatePdfButton.textContent = 'Download PDF';
    document.body.appendChild(generatePdfButton);

    generatePdfButton.addEventListener('click', () => {
        const resume = document.getElementById('resume') as HTMLDivElement;

        if (resume) {
            const opt = {
                margin: 1,
                filename: 'resume.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 1 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            html2pdf().from(resume).set(opt).save();
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const toggleSkillsButton = document.getElementById('toggle-skills') as HTMLButtonElement;
    const skillsContent = document.getElementById('skills-content') as HTMLElement;

    const toggleHobbiesButton = document.getElementById('toggle-hobbies') as HTMLButtonElement;
    const hobbiesContent = document.getElementById('hobbies-content') as HTMLElement;

    // Initialize button texts
    toggleSkillsButton.textContent = 'Show Skills';
    toggleHobbiesButton.textContent = 'See Hobbies';

    // Toggle skills section visibility
    toggleSkillsButton.addEventListener('click', () => {
        if (skillsContent.style.display === 'none' || skillsContent.style.display === '') {
            skillsContent.style.display = 'block';
            toggleSkillsButton.textContent = 'Hide Skills';
        } else {
            skillsContent.style.display = 'none';
            toggleSkillsButton.textContent = 'Show Skills';
        }
    });

    // Toggle hobbies section visibility
    toggleHobbiesButton.addEventListener('click', () => {
        if (hobbiesContent.style.display === 'none' || hobbiesContent.style.display === '') {
            hobbiesContent.style.display = 'block';
            toggleHobbiesButton.textContent = 'Hide Hobbies';
        } else {
            hobbiesContent.style.display = 'none';
            toggleHobbiesButton.textContent = 'See Hobbies';
        }
    });

    const form = document.getElementById('resume-form') as HTMLFormElement;
    const resume = document.getElementById('resume') as HTMLDivElement;
    const shareButton = document.getElementById('share-resume-btn') as HTMLButtonElement;
    const downloadButton = document.getElementById('download-pdf-btn') as HTMLButtonElement;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        generateResume();
    });

    function generateResume() {
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const details = (document.getElementById('details') as HTMLTextAreaElement).value;
        const institution = (document.getElementById('institution') as HTMLInputElement).value;
        const major = (document.getElementById('major') as HTMLInputElement).value;
        const minor = (document.getElementById('minor') as HTMLInputElement).value;
        const work = (document.getElementById('work') as HTMLTextAreaElement).value;
        const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
        const hobbies = (document.getElementById('hobbies') as HTMLTextAreaElement).value;

        // Handle profile picture
        const profilePictureInput = document.getElementById('profile-picture') as HTMLInputElement;
        let profilePictureHTML = '';

        if (profilePictureInput.files && profilePictureInput.files[0]) {
            const file = profilePictureInput.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                const img = new Image();
                img.src = reader.result as string;
                img.onload = () => {
                    if (img.width === img.height) {
                        profilePictureHTML = `<img src="${img.src}" alt="Profile Picture" style="width: 150px; height: 150px; object-fit: cover;">`;
                    } else {
                        profilePictureHTML = `<p>Image should have a 1:1 aspect ratio. Please upload an image with the correct dimensions.</p>`;
                    }
                    updateResume();
                };
            };
            reader.readAsDataURL(file);
        } else {
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
                    const fieldType = (field as HTMLElement).dataset.field;
                    const currentText = (field as HTMLElement).textContent || ''; // Ensure it's a string
                    const newContent = prompt(`Edit ${fieldType}`, currentText);
                    if (newContent !== null) {
                        (field as HTMLElement).textContent = newContent;
                    }
                });
            });

            // Generate unique URL and add it to the resume
            const username = 'user'; // Replace with actual username logic
            const resumeURL = `http://username.vercel.app/resume/${username}`;
            shareButton.addEventListener('click', () => {
                navigator.clipboard.writeText(resumeURL).then(() => {
                    alert('Resume URL copied to clipboard!');
                });
            });

            // Download resume as PDF
            downloadButton.addEventListener('click', () => {
                const resumeElement = document.getElementById('resume') as HTMLDivElement;
                html2pdf().from(resumeElement).save('resume.pdf');
            });

            // Show the resume container when the resume is generated
            const resumeContainer = document.getElementById('resume-container');
            if (resumeContainer) {
                resumeContainer.style.display = 'block';
            }
        }
    }
});
