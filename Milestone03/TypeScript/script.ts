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
});

// taking user input to fill resume 

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume-form') as HTMLFormElement;
    const resume = document.getElementById('resume') as HTMLDivElement;
    
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      // Get form values
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
      
      // profile picture
        const profilePictureInput = document.getElementById('profile-picture') as HTMLInputElement;
        let profilePictureHTML = '';

        if (profilePictureInput.files && profilePictureInput.files[0]) {
        const file = profilePictureInput.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            // Createing an image element
            const img = new Image();
            img.src = reader.result as string;
            img.onload = () => {
            // Ensureing the image has a 1:1 aspect ratio
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
        // If no profile picture uploaded then this
        profilePictureHTML = '';
        updateResume();
        }

        const resumeContainer = document.getElementById('resume-container');
        const generateResumeBtn = document.getElementById('generate-resume-btn');

        // Event listener for "Generate Resume" button
        generateResumeBtn?.addEventListener('click', () => {
          updateResume();
          if (resumeContainer) {
            resumeContainer.style.display = 'block';
          }
        });


        function updateResume() {
        // Updated resume content taken from user
        const resumeContent = `
            <section class="personal-info">
            ${profilePictureHTML}
            <h1>${name}</h1>
            <h2>Contact Info</h2>
            <p>Phone: <a href="tel:${phone}">${phone}</a></p>
            <p>Email: <a href="mailto:${email}">${email}</a></p>
            <h2>Details</h2>
            <p id="Details">${details}</p>
            </section>
            <section class="education">
            <h2>Education</h2>
            <p><strong>Institution:</strong> ${institution}</p>
            <p><strong>Major:</strong> ${major}<br><strong>Minor:</strong> ${minor}</p>
            </section>
            <section class="work-experience">
            <h2>Experience</h2>
            <p>${work}</p>
            </section>
            <section class="skills">
            <h2>Skills</h2>
            <p>${skills}</p>
            </section>
            <section class="hobbies">
            <h2>Hobbies</h2>
            <p>${hobbies}</p>
            </section>
        `;

        // Updateing resume with new content
        resume.innerHTML = resumeContent;
        }
    });
  });