document.addEventListener('DOMContentLoaded', function () {
    var toggleSkillsButton = document.getElementById('toggle-skills');
    var skillsContent = document.getElementById('skills-content');
    var toggleHobbiesButton = document.getElementById('toggle-hobbies');
    var hobbiesContent = document.getElementById('hobbies-content');
    // Initialize button texts
    toggleSkillsButton.textContent = 'Show Skills';
    toggleHobbiesButton.textContent = 'See Hobbies';
    // Toggle skills section visibility
    toggleSkillsButton.addEventListener('click', function () {
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
    toggleHobbiesButton.addEventListener('click', function () {
        if (hobbiesContent.style.display === 'none' || hobbiesContent.style.display === '') {
            hobbiesContent.style.display = 'block';
            toggleHobbiesButton.textContent = 'Hide Hobbies';
        }
        else {
            hobbiesContent.style.display = 'none';
            toggleHobbiesButton.textContent = 'See Hobbies';
        }
    });
});
