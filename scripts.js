document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-dark-mode');
    const welcomeMessage = document.getElementById('welcome-message');
    const backgroundMusic = document.getElementById('background-music');
    const modal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.getElementsByClassName('close')[0];
    const sunflowersContainer = document.getElementById('sunflowers');
    const additionalMessages = document.getElementById('additional-messages');

    const photoData = [
        {
            src: "/foto/foto1.png",
            messages: [
                "Você é meu raio de sol.",
                "Com você, cada dia é mais brilhante.",
                "Nosso amor floresce como girassóis.",
                "Você ilumina minha vida.",
                "Te amo mais do que girassóis amam o sol."
            ]
        },
        {
            src: "/foto/foto2.png",
            messages: [
                "Você é meu porto seguro.",
                "Nossa jornada juntos é cheia de alegria.",
                "Você me faz sorrir todos os dias.",
                "Meu coração é seu para sempre.",
                "Nossa história é minha favorita."
            ]
        },
        {
            src: "/foto/foto3.png",
            messages: [
                "Você é a melhor parte de mim.",
                "Com você, cada momento é especial.",
                "Você é a razão do meu sorriso.",
                "Minha vida é mais colorida ao seu lado.",
                "Você é o amor da minha vida."
            ]
        }
    ];

    // Show welcome message
    setTimeout(() => {
        welcomeMessage.classList.remove('hidden');
    }, 500);

    // Verifica se a música já foi reproduzida anteriormente
    const musicPlayed = localStorage.getItem('musicPlayed');
    if (!musicPlayed) {
        // Se a música ainda não foi reproduzida, reproduza-a automaticamente
        backgroundMusic.play();
        // Marca a música como reproduzida para evitar a reprodução automática em visitas subsequentes
        localStorage.setItem('musicPlayed', true);
    }

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
    photos.forEach((photo, index) => {
        photo.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImg.src = photoData[index].src;

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
            photoData[index].messages.forEach(message => {
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
