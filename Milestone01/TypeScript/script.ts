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
