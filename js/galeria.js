$(document).ready(function () {
    $('.img-thumbnail').on('click', function () {
        const newSrc = $(this).attr('src');
        $('#mainImage').fadeOut(300, function () {
            $(this).attr('src', newSrc).fadeIn(300);
        });
    });
});
