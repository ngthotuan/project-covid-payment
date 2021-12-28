$(function () {
    $('input[name=images]').change(function () {
        handleExtraInputChange(this);
    });

    $('#product-form').validate({
        ignore: '#images',
        errorClass: 'help-block animation-slideDown',
        errorElement: 'div',
        errorPlacement: function (error, e) {
            e.parents('.form-group > div').append(error);
        },
        highlight: function (e) {
            $(e)
                .closest('.form-group')
                .removeClass('has-success has-error')
                .addClass('has-error');
            $(e).closest('.help-block').remove();
        },
        success: function (e) {
            e.closest('.form-group').removeClass('has-success has-error');
            e.closest('.help-block').remove();
        },
        rules: {
            name: {
                required: true,
                minlength: 3,
            },
            amount: {
                required: true,
                number: true,
            },
            unit: {
                required: true,
            },
        },
        messages: {
            name: {
                required: 'Vui lòng nhập tên',
                minlength: 'Tên lớn hơn 3 ký tự',
            },
            amount: {
                required: 'Vui lòng nhập giá tiền',
                number: 'Vui lòng nhập số',
            },
            unit: {
                required: 'Vui lòng nhập đơn vị định lượng',
            },
        },
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
        $('#images').append(html);
    }
}

function removeExtraImage(btn) {
    $(btn).parents('.extra-image').remove();
}
