$(document).ready(function () {
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const selectedImage = getQueryParam('img');
    if (selectedImage) {
        $('#mainImage').attr('src', selectedImage);
    }

    $('#gallery').on('click', '.img-thumbnail', function () {
        const newSrc = $(this).attr('src');
        $('#mainImage').fadeOut(300, function () {
            $(this).attr('src', newSrc).fadeIn(300);
        });
    });

    let cropper;

    $('#mainImage').on('click', function () {
        if (!cropper) {
            cropper = new Cropper(this, {
                aspectRatio: 1,
                viewMode: 1
            });
        }
        $('#cropButton').removeClass('d-none');
    });

    $('#cropButton').on('click', function () {
        if (cropper) {
            const canvas = cropper.getCroppedCanvas({
                width: 200,
                height: 200
            });

            const croppedImage = document.createElement('img');
            croppedImage.src = canvas.toDataURL('image/png');
            croppedImage.classList.add('img-thumbnail', 'thumb');

            $('#gallery').append(croppedImage);

            cropper.destroy();
            cropper = null;
            $('#cropButton').addClass('d-none');
        }
    });
});
