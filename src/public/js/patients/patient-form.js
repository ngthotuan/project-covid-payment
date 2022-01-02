$(function () {
    const provinceSelect = $('#patient-province');
    const districtSelect = $('#patient-district');
    const wardSelect = $('#patient-ward');
    $('#form-patient').validate({
        ignore: '#patient-parent',
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
            identity: {
                required: true,
                number: true,
                minlength: 9,
                maxlength: 11,
            },
            dob: {
                required: true,
                date: true,
            },
            status: {
                required: true,
            },
            hospital_id: {
                required: true,
            },
            province_id: {
                required: true,
            },
            district_id: {
                required: true,
            },
            ward_id: {
                required: true,
            },
            debt: {
                required: true,
                number: true,
            },
            credit: {
                required: true,
                number: true,
            },
            payment_min: {
                required: true,
                number: true,
            },
        },
        messages: {
            name: {
                required: 'Vui lòng nhập tên',
                minlength: 'Độ dài phải lớn hơn 3 ký tự',
            },
            identity: {
                required: 'Vui lòng nhập CMND/CCCD',
                number: 'CCCD/CMND phải là số',
                minlength: 'CCCD/CMND phải có hoặc 9 hoặc 11 ký tự',
                maxlength: 'CCCD/CMND phải có hoặc 9 hoặc 11 ký tự',
            },
            dob: {
                required: 'Vui lòng nhập ngày sinh',
                date: 'date đúng',
            },
            status: {
                required: 'Vui lòng chọn trạng thái',
            },
            hospital_id: {
                required: 'Vui lòng chọn nơi điều trị/cách ly',
            },
            province_id: {
                required: 'Vui lòng chọn tỉnh',
            },
            district_id: {
                required: 'Vui lòng chọn huyện',
            },
            ward_id: {
                required: 'Vui lòng chọn xã',
            },
            debt: {
                required: 'Vui lòng nhập số tiền nợ',
                number: 'Tiền nợ phải là số',
            },
            credit: {
                required: 'Vui lòng nhập số cho phép',
                number: 'Tiền cho phép phải là số',
            },
            payment_min: {
                required: 'Vui lòng nhập số tiền chi trả nhỏ nhất',
                number: 'Tiền chi trả nhỏ nhất phải là số',
            },
        },
    });

    $('#patient-dob').datepicker();

    updateDistrictSelect(patient.province_id);
    updateWardSelect(patient.district_id);

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
                                district.id === patient.district_id &&
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
                            ward.id === patient.ward_id && 'selected'
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
});
