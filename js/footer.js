let isLoggedIn = false;

function updateFooter() {
    if (isLoggedIn) {
        $('#authLink').text('Cerrar Sesión').off('click').on('click', function (e) {
            e.preventDefault();
            isLoggedIn = false;
            alert('Sesión cerrada.');
            updateFooter();
        });
    } else {
        $('#authLink').text('Acceder a Zona Privada').off('click').on('click', function (e) {
            e.preventDefault();
            $('#loginModal').modal('show');
        });
    }
}
$('#loginForm').on('submit', function (e) {
    e.preventDefault();
    const password = $('#password').val();
    if (password === 'enEsteRetoYoLoPeto') {
        isLoggedIn = true;
        $('#loginModal').modal('hide');
        window.location.href = 'indexPrivado.html';
    } else {
        alert('Contraseña incorrecta.');
    }
});
$('#logOut').on('click', function (e) {
    window.location.href = 'index.html';
});


updateFooter();