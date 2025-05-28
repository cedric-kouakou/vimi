document.addEventListener('DOMContentLoaded', function() {
    // Charger le footer
    fetch('includes/footer.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
        })
        .catch(error => console.error('Erreur chargement footer:', error));
});
