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
document.addEventListener('DOMContentLoaded', () => {
    const stickyNote = document.querySelector('.sticky-note');
    makeDraggable(stickyNote);
    addCloseButton(stickyNote);
    addResizable(stickyNote);
});

function makeDraggable(element) {
    let offsetX, offsetY, isDragging = false;

    element.addEventListener('mousedown', (event) => {
        isDragging = true;
        offsetX = event.clientX - element.getBoundingClientRect().left;
        offsetY = event.clientY - element.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', (event) => {
        if (!isDragging) return;
        const x = event.clientX - offsetX;
        const y = event.clientY - offsetY;
        element.style.left = x + 'px';
        element.style.top = y + 'px';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

function addCloseButton(element) {
    const closeButton = document.createElement('span');
    closeButton.classList.add('close-button');
    closeButton.textContent = '×';
    closeButton.addEventListener('click', () => {
        element.remove();
    });
    element.appendChild(closeButton);
}

function addResizable(element) {
    const resizer = document.createElement('div');
    resizer.classList.add('resizer');

    resizer.addEventListener('mousedown', (event) => {
        event.preventDefault();
        let prevX = event.clientX;
        let prevY = event.clientY;
        const initialWidth = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
        const initialHeight = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));

        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', resize);
        });

        function resize(event) {
            const width = initialWidth + (event.clientX - prevX);
            const height = initialHeight + (event.clientY - prevY);
            element.style.width = `${width}px`;
            element.style.height = `${height}px`;
            prevX = event.clientX;
            prevY = event.clientY;
        }
    });

    element.appendChild(resizer);
}
document.addEventListener('DOMContentLoaded', () => {
    loadStickyNotes();
});

function loadStickyNotes() {
    const storedNotes = JSON.parse(localStorage.getItem('stickyNotes')) || [];
    storedNotes.forEach(note => {
        const newStickyNote = createStickyNote();
        newStickyNote.style.left = note.left + 'px';
        newStickyNote.style.top = note.top + 'px';
        newStickyNote.querySelector('textarea').value = note.content;
    });
}

function createStickyNote() {
    const container = document.body; // Pode ser qualquer outro elemento onde você queira adicionar os novos sticky notes
    const newStickyNote = document.createElement('div');
    newStickyNote.className = 'sticky-note draggable';
    newStickyNote.innerHTML = `<textarea placeholder="Write something..."></textarea>`;
    container.appendChild(newStickyNote);
    makeDraggable(newStickyNote);
    addCloseButton(newStickyNote);
    addResizable(newStickyNote);
    addEditableText(newStickyNote);
    return newStickyNote;
}

function makeDraggable(element) {
    // Código de arrastar e soltar existente
}

function addCloseButton(element) {
    // Código do botão de fechar existente
}

function addResizable(element) {
    // Código de redimensionamento existente
}

function addEditableText(element) {
    // Código de edição de texto existente
}

function fixStickyNote() {
    // Código para fixar o sticky note existente
}

window.addEventListener('beforeunload', () => {
    const stickyNotes = [];
    document.querySelectorAll('.sticky-note').forEach(note => {
        stickyNotes.push({
            left: note.offsetLeft,
            top: note.offsetTop,
            content: note.querySelector('textarea').value
        });
    });
    localStorage.setItem('stickyNotes', JSON.stringify(stickyNotes));
});

