// Données des membres de NationGlory Belize
const membresData = [
    { nom: 'KeKe__D12', rang: 'leader', status: 'online' },
    { nom: 'aillole3', rang: 'general', status: 'online' },
    { nom: 'Airforce93dz7', rang: 'general', status: 'offline' },
    { nom: 'Aureylito', rang: 'general', status: 'online' },
    { nom: 'aillole2', rang: 'soldat', status: 'offline' },
    { nom: 'Corail', rang: 'soldat', status: 'online' },
    { nom: 'dansunavion', rang: 'soldat', status: 'offline' },
    { nom: 'Donnetas', rang: 'soldat', status: 'online' },
    { nom: 'elfixe1', rang: 'soldat', status: 'offline' },
    { nom: 'erwanH2O', rang: 'soldat', status: 'online' },
    { nom: 'Galix33', rang: 'soldat', status: 'offline' },
    { nom: 'jesuis_N', rang: 'soldat', status: 'online' },
    { nom: 'Keke_D12', rang: 'soldat', status: 'offline' },
    { nom: 'lbramzy', rang: 'soldat', status: 'online' },
    { nom: 'LByanis', rang: 'soldat', status: 'offline' },
    { nom: 'M_Law_SX', rang: 'soldat', status: 'online' },
    { nom: 'Mattias06', rang: 'soldat', status: 'offline' },
    { nom: 'MeMeL_24251', rang: 'soldat', status: 'online' },
    { nom: 'NapoleoII', rang: 'soldat', status: 'offline' },
    { nom: 'Ness175', rang: 'soldat', status: 'online' },
    { nom: 'Noutlea11', rang: 'soldat', status: 'offline' },
    { nom: 'OliviaDCF', rang: 'soldat', status: 'online' },
    { nom: 'PinkiePie', rang: 'soldat', status: 'offline' },
    { nom: '0ryx', rang: 'soldat', status: 'online' },
    { nom: 'Steve_Jobless', rang: 'soldat', status: 'offline' },
    { nom: 'TOXIQUE75', rang: 'soldat', status: 'online' },
    { nom: 'traps971', rang: 'soldat', status: 'offline' },
    { nom: 'Tutu38622816', rang: 'soldat', status: 'online' },
    { nom: 'vulcano', rang: 'soldat', status: 'offline' },
    { nom: 'zerina', rang: 'soldat', status: 'online' }
];

// Fonction pour obtenir le badge et la description selon le rang
function getBadgeInfo(rang) {
    const badges = {
        leader: { emoji: '👑', texte: 'Leader', class: 'leader-badge' },
        general: { emoji: '⚔️', texte: 'Général', class: 'general-badge' },
        soldat: { emoji: '🛡️', texte: 'Soldat', class: 'soldat-badge' }
    };
    return badges[rang] || badges.soldat;
}

function getDescription(rang) {
    const descriptions = {
        leader: 'Le dirigeant suprême de NationGlory Belize, responsable des décisions collectives.',
        general: 'Coordinateur des projets, expert en organisation et stratégie.',
        soldat: 'Membre actif, engagé dans les tâches quotidiennes et le soutien communautaire.'
    };
    return descriptions[rang] || descriptions.soldat;
}

// Fonction pour générer les cartes des membres
function genererCartesMembres() {
    const container = document.getElementById('cartes-membres');
    if (!container) return;
    
    container.innerHTML = ''; // Vider le conteneur
    
    membresData.forEach(membre => {
        const badge = getBadgeInfo(membre.rang);
        const description = getDescription(membre.rang);
        
        const carte = document.createElement('div');
        carte.className = 'carte holographic';
        carte.innerHTML = `
            <div class="avatar"><img src="avatar.svg" alt="${membre.nom}" class="avatar-img"></div>
            <h3 class="membre-nom">${membre.nom}</h3>
            <span class="badge ${badge.class}">${badge.emoji} ${badge.texte}</span>
            <div class="status ${membre.status}"></div>
            <p>${description}</p>
        `;
        container.appendChild(carte);
    });
}

// Script JavaScript pour interactions supplémentaires
document.addEventListener('DOMContentLoaded', function() {
    // Générer les cartes des membres au chargement
    genererCartesMembres();
    // Ajouter des effets hover dynamiques si nécessaire
    const cartes = document.querySelectorAll('.carte');
    cartes.forEach(carte => {
        carte.addEventListener('mouseenter', function() {
            this.style.borderColor = '#fff';
        });
        carte.addEventListener('mouseleave', function() {
            this.style.borderColor = '#ffcc00';
        });
    });

    // Effet apparition progressif
    const sections = document.querySelectorAll('.fade-in');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.animationDelay = `${index * 0.5}s`;
        }, 100);
    });

    // Système de notifications
    function showNotification(message, type = 'info', duration = 3000) {
        const notifications = document.getElementById('notifications');
        if (!notifications) return;
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div>${message}</div>
            <div class="progress-bar"></div>
        `;
        notifications.appendChild(notification);

        // Supprimer après la durée
        setTimeout(() => {
            notification.remove();
        }, duration);
    }

    // Gestion des quêtes
    const queteEnCoursSection = document.getElementById('quete-en-cours');
    const queteDetails = document.getElementById('quete-details');
    const abandonnerBtn = document.getElementById('abandonner-quete');

    // Charger la quête en cours depuis localStorage
    function chargerQueteEnCours() {
        const quete = JSON.parse(localStorage.getItem('queteEnCours'));
        if (quete) {
            queteDetails.innerHTML = `
                <p><strong>Titre :</strong> ${quete.titre}</p>
                <p><strong>Description :</strong> ${quete.description}</p>
                <p><strong>Objectif :</strong> ${quete.objectif}</p>
                <p><strong>Récompense :</strong> ${quete.recompense}</p>
            `;
            queteEnCoursSection.style.display = 'block';
        }
    }

    // Accepter une quête
    document.querySelectorAll('.quete-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const carte = this.closest('.quete-carte');
            if (!carte) return;
            const titre = carte.querySelector('h3').textContent;
            const description = carte.querySelector('p').textContent;
            const objectifP = carte.querySelector('p:nth-of-type(2)');
            const recompenseP = carte.querySelector('p:nth-of-type(3)');
            if (!objectifP || !recompenseP) return;
            const objectif = objectifP.textContent.replace('Objectif : ', '');
            const recompense = recompenseP.textContent.replace('Récompense : ', '');

            const quete = { titre, description, objectif, recompense };
            localStorage.setItem('queteEnCours', JSON.stringify(quete));

            // Envoyer webhook en arrière-plan (sans notification)
            fetch('https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: `Nouvelle quête acceptée : ${titre}`,
                    embeds: [{
                        title: titre,
                        description: description,
                        fields: [
                            { name: 'Objectif', value: objectif },
                            { name: 'Récompense', value: recompense }
                        ]
                    }]
                })
            }).then(response => {
                if (response.ok) {
                    console.log('Webhook envoyé avec succès');
                } else {
                    console.error('Erreur webhook:', response.status);
                }
            }).catch(error => {
                console.error('Erreur réseau webhook:', error);
            });

            // Notification générale pour l'utilisateur
            showNotification('Quête acceptée !', 'info');
            chargerQueteEnCours();
        });
    });

    // Abandonner la quête
    if (abandonnerBtn) {
        abandonnerBtn.addEventListener('click', function() {
            localStorage.removeItem('queteEnCours');
            queteEnCoursSection.style.display = 'none';
            showNotification('Quête abandonnée.', 'info');
        });
    }

    // Charger au démarrage
    chargerQueteEnCours();

    // Gestion du formulaire de support
    const supportForm = document.querySelector('.support-form');
    if (supportForm) {
        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simulation d'envoi
            showNotification('Message envoyé ! Nous vous répondrons bientôt.', 'success');
            supportForm.reset();
        });
    }

    // Gestion du footer scroll
    window.addEventListener('scroll', function() {
        const footer = document.getElementById('footer');
        if (footer) {
            if (window.scrollY >= document.body.scrollHeight - window.innerHeight - 100) { // 100px avant le bas pour déclencher
                footer.classList.remove('hidden');
                footer.classList.add('visible');
            } else {
                footer.classList.add('hidden');
                footer.classList.remove('visible');
            }
        }
    });
});
