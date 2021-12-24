$(function () {
    $('input[name=images]').change(function () {
        handleExtraInputChange(this);
    });
});

function handleExtraInputChange(input) {
    // show thumbnail
    const parent = $(input).parent();
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        parent.children('img').attr('src', e.target.result);
    };
    reader.readAsDataURL(file);
    // update name (for update)
    parent.children('input[name=imagePaths]').val(file.name);

    const extraImages = $('.extra-image');
    if (extraImages.last().is(parent)) {
        // add remove button
        const removeBtn = `<button onclick="removeExtraImage(this)"
                            class="btn fa fa-times-circle fa-2x text-danger center"
                            title="Xóa ảnh này"></button>`;
        parent.prepend(removeBtn);

        // addNextExtraImageSection
        const html = `<div class="col-sm-6 block extra-image">
                                <img alt="Xem trước hình ảnh" class="w-90"
                                     src="/img/image-thumbnail.png"><br>
                                <input onchange="handleExtraInputChange(this)"
                                    accept="image/*" class="form-file m-2" name="images" type="file"/>
                            </div>`;
        $('#product-images').append(html);
    }
}

function removeExtraImage(btn) {
    $(btn).parents('.extra-image').remove();
}
