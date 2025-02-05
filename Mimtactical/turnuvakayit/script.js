document.addEventListener('DOMContentLoaded', () => {
    const registerButton = document.querySelector('.register-button');
    const popup = document.getElementById('registerPopup');
    const confirmButton = document.getElementById('confirmRegistration');
    const cancelButton = document.getElementById('cancelRegistration');
    const squads = document.querySelectorAll('.squad');
    let selectedSquad = null;
    let remainingPlayers = 20;

    // Mouse effect
    document.addEventListener("mousemove", (e) => {
        const mouseEffect = document.getElementById("mouse-effect");
        mouseEffect.style.setProperty("--mouse-x", e.clientX + "px");
        mouseEffect.style.setProperty("--mouse-y", e.clientY + "px");
    });

    // Update remaining players count
    const updateRemainingCount = () => {
        document.getElementById('remainingCount').textContent = remainingPlayers;
    };

    // Squad selection
    squads.forEach(squad => {
        const memberCount = parseInt(squad.getAttribute('data-members'));
        if (memberCount >= 10) {
            squad.classList.add('full');
        }

        squad.addEventListener('click', () => {
            const memberCount = parseInt(squad.getAttribute('data-members'));
            if (memberCount >= 10) {
                return;
            }
            
            squads.forEach(s => {
                s.classList.remove('selected');
            });
            squad.classList.add('selected');
            selectedSquad = squad.querySelector('h4').textContent;
        });
    });

    // Register button click
    registerButton.addEventListener('click', () => {
        if (!selectedSquad) {
            alert('Lütfen bir squad seçin!');
            return;
        }

        // Populate popup with tournament details
        document.getElementById('popupTournamentName').textContent = document.querySelector('.tournament-name').textContent;
        document.getElementById('popupMatchType').textContent = document.querySelector('.match-type p').textContent;
        document.getElementById('popupAddress').textContent = document.querySelector('.address p').textContent;
        document.getElementById('popupContact').textContent = document.querySelector('.contact p').textContent;
        document.getElementById('popupPrice').textContent = document.querySelector('.price-section p').textContent;
        document.getElementById('popupSquad').textContent = selectedSquad;

        popup.style.display = 'flex';
    });

    // Confirm registration
    confirmButton.addEventListener('click', () => {
        const selectedSquadElement = Array.from(squads).find(squad => 
            squad.querySelector('h4').textContent === selectedSquad
        );
        
        if (!selectedSquadElement) {
            alert('Bir hata oluştu. Lütfen tekrar deneyin.');
            popup.style.display = 'none';
            return;
        }

        const currentMembers = parseInt(selectedSquadElement.getAttribute('data-members'));
        
        if (currentMembers >= 10) {
            alert('Bu squad dolu! Lütfen başka bir squad seçin.');
            popup.style.display = 'none';
            return;
        }

        selectedSquadElement.setAttribute('data-members', currentMembers + 1);
        selectedSquadElement.querySelector('.member-count').textContent = `${currentMembers + 1}/10`;
        
        remainingPlayers--;
        updateRemainingCount();
        
        popup.style.display = 'none';
        alert('Kaydınız başarıyla tamamlandı!');
    });

    // Cancel registration
    cancelButton.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Close popup when clicking outside
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });
});