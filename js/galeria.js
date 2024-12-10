$(document).ready(function () {
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Obtener la imagen seleccionada de los parámetros
    const selectedImage = getQueryParam('img');
    if (selectedImage) {
        // Cambiar la imagen principal
        $('#mainImage').attr('src', selectedImage);
    }
    
    $('.img-thumbnail').on('click', function () {
        const newSrc = $(this).attr('src');
        $('#mainImage').fadeOut(300, function () {
            $(this).attr('src', newSrc).fadeIn(300);
        });
    });
});
