// Scroll reveal
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.2 });
sections.forEach(section => observer.observe(section));

// Project lightbox
const lightbox = document.getElementById('lightbox');
const title = document.getElementById('lightbox-title');
const desc = document.getElementById('lightbox-desc');
const githubLink = document.getElementById('lightbox-github');

function openProjectLightbox(projectTitle, projectDesc, projectGitHub){
    title.textContent = projectTitle;
    desc.textContent = projectDesc;
    githubLink.href = projectGitHub;
    lightbox.style.display = 'flex';
}
function closeLightbox(){
    lightbox.style.display = 'none';
}

// About lightbox
const aboutLightbox = document.getElementById('about-lightbox');
const aboutTitle = document.getElementById('about-lightbox-title');
const aboutDesc = document.getElementById('about-lightbox-desc');

function openAboutLightbox(title, desc){
    aboutTitle.textContent = title;
    aboutDesc.textContent = desc;
    aboutLightbox.style.display = 'flex';
}
function closeAboutLightbox(){
    aboutLightbox.style.display = 'none';
}

// Dark mode toggle
const toggle = document.getElementById('darkModeToggle');
toggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});

// Active nav highlight
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let fromTop = window.scrollY + 100;
    navLinks.forEach(link => {
        let section = document.querySelector(link.hash);
    });
});
