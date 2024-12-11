$(document).ready(function () {
    $('#loginForm').on('submit', function (e) {
        e.preventDefault();
        const password = $('#password').val();
        const passwordInput = $('#password');

        if (password === 'enEsteRetoYoLoPeto') {
            passwordInput.removeClass('is-invalid');
            $('#loginModal').modal('hide');
            window.location.href = 'indexPrivado.html';
        } else {
            passwordInput.addClass('is-invalid');
        }
    });

    $('#logOut').on('click', function (e) {
        window.location.href = 'index.html';
    });
    $('#authLink').on('click', function (e) {
        e.preventDefault();
        $('#loginModal').modal('show');
    });
});
