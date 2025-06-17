// Main navigation functions
function showMainWebsite() {
    document.getElementById('main-website').classList.add('active');
    document.getElementById('donation-page').classList.remove('active');
    document.getElementById('admin-page').classList.remove('active');
    stopFlowerAnimation();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showDonationPage() {
    document.getElementById('main-website').classList.remove('active');
    document.getElementById('donation-page').classList.add('active');
    document.getElementById('admin-page').classList.remove('active');
    startFlowerAnimation();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showAdminPage() {
    document.getElementById('main-website').classList.remove('active');
    document.getElementById('donation-page').classList.remove('active');
    document.getElementById('admin-page').classList.add('active');
    stopFlowerAnimation();
    resetAdminPanel();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToSection(sectionId) {
    if (document.getElementById('main-website').classList.contains('active')) {
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    }
}

// Flower animation for donation page
let flowerInterval;

function createFlower() {
    const flower = document.createElement("div");
    flower.classList.add("flower");
    flower.innerHTML = "🌸";
    document.querySelector('.donation-container').appendChild(flower);
    flower.style.left = Math.random() * window.innerWidth + "px";
    flower.style.animationDuration = (Math.random() * 5 + 3) + "s";
    setTimeout(() => {
        if (flower.parentNode) {
            flower.remove();
        }
    }, 8000);
}

function startFlowerAnimation() {
    flowerInterval = setInterval(createFlower, 500);
}

function resetAdminPanel() {
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById('admin-login-section').classList.add('active');
    document.querySelector('.small-logout-btn').style.display = 'none';
    document.getElementById('admin-username').value = '';
    document.getElementById('admin-password').value = '';
}

function adminLogin() {
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;

    if (username === 'admin' && password === 'password') {
        showAdminDashboard();
        document.querySelector('.small-logout-btn').style.display = 'block';
    } else {
        alert('Invalid Login Credentials');
    }
}

function adminLogout() {
    resetAdminPanel();
}

function showAdminDashboard() {
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById('admin-dashboard-section').classList.add('active');
}

function showAdminMartyrSection() {
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById('admin-martyr-section').classList.add('active');
}

function showAdminMemorialSection() {
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById('admin-memorial-section').classList.add('active');
}

function showAdminEventsSection() {
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById('admin-events-section').classList.add('active');
}

function submitMartyrDetails() {
    const name = document.getElementById('martyr-name').value;
    const incident = document.getElementById('martyr-incident').value;
    const year = document.getElementById('martyr-year').value;
    const organisation = document.getElementById('martyr-organisation').value;
    const rank = document.getElementById('martyr-rank').value;
    const photo = document.getElementById('martyr-photo').files[0];

    if (name && incident && year && organisation && rank) {
        alert('Martyr Details Submitted Successfully');
        const martyrTributeSection = document.getElementById('martyr-tribute');
        const newMartyrDiv = document.createElement('div');
        newMartyrDiv.className = 'martyr';
        newMartyrDiv.innerHTML = `
            <img src="${photo ? URL.createObjectURL(photo) : 'https://www.police.gov.in/sites/default/files/upload/files/martyres_image/default.jpg'}" alt="${name}">
            <div class="details">
                <h3>${name}</h3>
                <p><strong>Incident:</strong> ${incident}</p>
                <p><strong>Martyrdom Year:</strong> ${year}</p>
                <p><strong>Organization:</strong> ${organisation}</p>
                <p><strong>Rank:</strong> ${rank}</p>
            </div>
        `;
        martyrTributeSection.appendChild(newMartyrDiv);
        showAdminDashboard();
        document.getElementById('martyr-name').value = '';
        document.getElementById('martyr-incident').value = '';
        document.getElementById('martyr-year').value = '';
        document.getElementById('martyr-organisation').value = '';
        document.getElementById('martyr-rank').value = '';
        document.getElementById('martyr-photo').value = '';
    } else {
        alert('Please fill all fields');
    }
}

function submitMemorialGallery() {
    const eventName = document.getElementById('memorial-event-name').value;
    const media = document.getElementById('memorial-media').files;

    if (eventName && media.length > 0) {
        alert('Memorial Gallery Submitted Successfully');
        const galleryGrid = document.querySelector('.gallery-grid');
        for (let file of media) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.alt = eventName;
            img.style.width = '250px';
            img.style.height = '250px';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '10px';
            galleryGrid.appendChild(img);
        }
        showAdminDashboard();
        document.getElementById('memorial-event-name').value = '';
        document.getElementById('memorial-media').value = '';
    } else {
        alert('Please enter event name and select media');
    }
}

function submitEvent() {
    const name = document.getElementById('event-name').value;
    const date = document.getElementById('event-date').value;
    const location = document.getElementById('event-location').value;

    if (name && date && location) {
        alert('Commemorative Event Added Successfully');
        const eventsList = document.querySelector('.events-list');
        const newEventDiv = document.createElement('div');
        newEventDiv.className = 'event';
        newEventDiv.innerHTML = `
            <h3>${name}</h3>
            <p>Date: ${date}</p>
            <p>Location: ${location}</p>
        `;
        eventsList.appendChild(newEventDiv);
        showAdminDashboard();
        document.getElementById('event-name').value = '';
        document.getElementById('event-date').value = '';
        document.getElementById('event-location').value = '';
    } else {
        alert('Please fill all fields');
    }
}
