$(function () {
    const provinceSelect = $('#province');
    const districtSelect = $('#district');
    const wardSelect = $('#ward');
    const form = $('#hospital-form');

    updateDistrictSelect(hospital.province_id);
    updateWardSelect(hospital.district_id);

    provinceSelect.change(function () {
        updateDistrictSelect($(this).val());
    });
    districtSelect.change(function () {
        updateWardSelect($(this).val());
    });

    function updateDistrictSelect(provinceId) {
        if (provinceId) {
            $.get(
                '/api/provinces/' + provinceId + '/districts',
                function (districts) {
                    districtSelect.empty();
                    districtSelect.append(
                        '<option value="">Chọn Quận/Huyện</option>',
                    );
                    $.each(districts, function (index, district) {
                        districtSelect.append(
                            `<option value="${district.id}" ${
                                district.id === hospital.district_id &&
                                'selected'
                            } >${district.name}</option>`,
                        );
                    });
                    districtSelect.trigger('chosen:updated');
                },
            );
        } else {
            districtSelect.empty();
            districtSelect.append('<option value="">Chọn Quận/Huyện</option>');
            districtSelect.trigger('chosen:updated');
        }
        wardSelect.empty();
        wardSelect.append('<option value="">Chọn Phường/Xã</option>');
        wardSelect.trigger('chosen:updated');
    }

    function updateWardSelect(districtId) {
        if (districtId) {
            $.get('/api/districts/' + districtId + '/wards', function (wards) {
                wardSelect.empty();
                wardSelect.append('<option value="">Chọn Phường/Xã</option>');
                $.each(wards, function (index, ward) {
                    wardSelect.append(
                        `<option value="${ward.id}" ${
                            ward.id === hospital.ward_id && 'selected'
                        } >${ward.name}</option>`,
                    );
                });
                wardSelect.trigger('chosen:updated');
            });
        } else {
            wardSelect.empty();
            wardSelect.append('<option value="">Chọn Phường/Xã</option>');
            wardSelect.trigger('chosen:updated');
        }
    }

    $('.select-chosen').change(function () {
        validateSelect($(this));
    });

    form.validate({
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
                minlength: 5,
            },
            size: {
                required: true,
                number: true,
            },
            current_size: {
                required: true,
                number: true,
            },
            address: {
                required: true,
                minlength: 8,
            },
        },
        messages: {
            name: {
                required: 'Vui lòng nhập tên',
                minlength: 'Tên lớn hơn 5 ký tự',
            },
            size: {
                required: 'Vui lòng nhập sức chứa',
                number: 'Vui lòng nhập số',
            },
            current_size: {
                required:
                    'Vui lòng nhập số lượng bệnh nhân hiện tại, mặc định 0',
                number: 'Vui lòng nhập số',
            },
            address: {
                required: 'Vui lòng nhập địa chỉ',
                minlength: 'Địa chỉ lớn hơn 8 ký tự',
            },
        },
    });
    form.submit(function () {
        let valid = true;
        $('.select-chosen').each(function () {
            if (!validateSelect($(this))) {
                valid = false;
            }
        });
        if (!valid) {
            return false;
        }
    });

    function validateSelect(select, message = 'Vui lòng chọn') {
        const formGroup = select.closest('.form-group');
        formGroup
            .removeClass('has-success has-error')
            .find('.help-block')
            .remove();

        if (!select.val()) {
            formGroup.addClass('has-error');
            select
                .closest('.form-group > div')
                .append(
                    `<div class="help-block animation-slideDown">${message}</div>`,
                );
            return false;
        }
        return true;
    }
});
