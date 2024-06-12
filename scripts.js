document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-dark-mode');
    const welcomeMessage = document.getElementById('welcome-message');
    const backgroundMusic = document.getElementById('background-music');
    const modal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.getElementsByClassName('close')[0];
    const sunflowersContainer = document.getElementById('sunflowers');
    const additionalMessages = document.getElementById('additional-messages');

    const messages = [
        "Você é meu raio de sol.",
        "Com você, cada dia é mais brilhante.",
        "Nosso amor floresce como girassóis.",
        "Você ilumina minha vida.",
        "Te amo mais do que girassóis amam o sol."
    ];

    // Show welcome message
    setTimeout(() => {
        welcomeMessage.classList.remove('hidden');
    }, 500);

    // Play background music
    backgroundMusic.play();

    // Toggle dark mode
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Highlight reminders on click
    const reminders = document.querySelectorAll('.reminder');
    reminders.forEach(reminder => {
        reminder.addEventListener('click', () => {
            reminder.classList.toggle('highlight');
        });
    });

    // Photo gallery modal with sunflowers and messages
    const photos = document.querySelectorAll('.photo-gallery img');
    photos.forEach(photo => {
        photo.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImg.src = photo.src;

            // Clear previous sunflowers and messages
            sunflowersContainer.innerHTML = '';
            additionalMessages.innerHTML = '';

            // Add sunflowers
            for (let i = 0; i < 10; i++) {
                const sunflower = document.createElement('div');
                sunflower.classList.add('sunflower');
                sunflowersContainer.appendChild(sunflower);
            }

            // Add additional messages
            messages.forEach(message => {
                const p = document.createElement('p');
                p.textContent = message;
                additionalMessages.appendChild(p);
            });
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
});
