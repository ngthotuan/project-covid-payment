let extraIdProduct;
const form = $('#form-category');

$(document).ready(function () {
    $("a[name='linkRemoveDetail']").each(function (index) {
        $(this).click(function () {
            removeDetailByIndex(index);
        });
    });
    allDivProduct = $("[id^='product']");
    extraIdProduct = allDivProduct.length;

    $('.select-product').change((event) => {
        checkOptionProductRepeat('.form-inline', $(this));
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
                minlength: 3,
            },
            limit_person: {
                required: true,
                number: true,
            },
        },
        messages: {
            name: {
                required: 'Vui lòng nhập tên',
                minlength: 'Tên lớn hơn 3 ký tự',
            },
            limit_person: {
                required: 'Vui lòng nhập sức chứa',
                number: 'Vui lòng nhập số',
            },
        },
    });

    form.submit(function () {
        let valid = true;
        if (!validateNotNull('.form-group', $('.select-time'))) {
            valid = false;
        }

        $('.select-product').each(function (index) {
            if (!checkOptionProductRepeat('.form-inline', $(this))) {
                valid = false;
            }
        });

        $('.limit-product').each(function () {
            if (!validateNotNull('.form-inline', $(this), 'Vui lòng nhập')) {
                valid = false;
            }
        });

        if (!valid) {
            return false;
        }
    });
});

const checkOptionProductRepeat = (formClass, select) => {
    let repeatNumberValue = 0;
    const selectValue = select.val();

    deleteValidate(formClass, select);

    if (!select.val()) {
        addValidate(formClass, select);
        return false;
    }

    //kiểm tra select > 1 là bị trfng
    $('.select-product').each(function () {
        const value = $(this).val();
        if (value === selectValue) repeatNumberValue++;
    });

    if (repeatNumberValue > 1) {
        addValidate(formClass, select, 'Sản phẩm đã được chọn');
        return false;
    }
    return true;
};

function validateNotNull(formClass, select, message) {
    deleteValidate(formClass, select);

    if (!select.val()) {
        addValidate(formClass, select, message);
        return false;
    }
    return true;
}

function addValidate(formClass, select, message = 'Vui lòng chọn') {
    const formGroup = select.closest(formClass);
    formGroup.addClass('has-error');
    select
        .closest(formClass + ' > div')
        .append(`<div class="help-block animation-slideDown">${message}</div>`);
}

function deleteValidate(formClass, select) {
    const formGroup = select.closest(formClass);
    formGroup.removeClass('has-success has-error').find('.help-block').remove();
}

function addNextProduct() {
    allOptProduct = $('.select-product').last().children();
    allDivProduct = $("[id^='product']");
    allFormGroup = $('.form-group');
    divProductLength = allDivProduct.length;

    htmlOptionDetail = '';
    products.forEach(function (product) {
        htmlOptionDetail += `<option value=${product.id}>${product.name}
            </option>`;
    });

    htmlDetail =
        ` <div id="product${extraIdProduct}" class="form-horizontal form-bordered" style="margin-bottom: 25px">
    <div class="form-group">
    <div class="form-inline">
      <label class="col-md-2 control-label">Sản phẩm</label>
      <div class="col-md-5">
        <select
          name="product_id"
          class="select-chosen select-product"
          data-placeholder="Chọn sản phẩm..."
          style="width: 100%"
        >
          <option value=""></option>
         ` +
        htmlOptionDetail +
        `
        </select>
      </div>
    </div>
      <div class="form-inline">
      <label class="col-md-2 control-label">Giới hạn</label>
      <div class="col-md-2">
        <input
          type="number"
          name="limit_product"
          class="form-control limit-product"
          placeholder="Số lượng"
          min="1"
          step="1"
        />
      </div>
    </div>
    <button class="btn fa fa-times-circle-o fa-2x remove-product"
     title="Remove detail"
    ></button>
  </div>
  </div>`;
    $('#category-product').append(htmlDetail);

    $("input[name='product_id']").last().focus();
    $('.select-product').last().select2();
    extraIdProduct++;
}

$('.remove-product').click(function () {
    $(this).closest('.form-horizontal').remove();
});
