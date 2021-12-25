/*
 *  Document   : ecomProducts.js
 *  Author     : pixelcave
 *  Description: Custom javascript code used in eCommerce Products page
 */
let extraIdProduct = 1;

$(document).ready(function () {
    $("a[name='linkRemoveDetail']").each(function (index) {
        $(this).click(function () {
            removeDetailByIndex(index);
        });
    });
});

function addNextProduct() {
    allOptProduct = $('.select-product').last().children();
    allDivProduct = $("[id^='product']");
    divProductLength = allDivProduct.length;

    let products = [];
    allOptProduct.each(function () {
        const product = $(this);
        const id = product.attr('value');
        const name = product.text();
        if (id) {
            products.push({ id, name });
        }
    });

    htmlOptionDetail = '';
    products.forEach(function (product) {
        htmlOptionDetail += `<option value=${product.id}>${product.name}
            </option>`;
    });

    htmlDetail =
        `
              <div id="product${extraIdProduct}" class="form-horizontal form-bordered" style="margin-bottom: 25px">
                <div class="form-inline">
                  <label class="col-md-2 control-label">Sản phẩm</label>
                  <div class="col-md-5">
                    <select
                      name="product_id"
                      class="select-chosen select-product"
                      data-placeholder="Chọn sản phẩm..."
                      style="width: 100%"
                      onchange="handleOnChangeProduct(event, this)"
                    >
                      <option></option>
                     ` +
        htmlOptionDetail +
        `
                    </select>
                  </div>
                  <label class="col-md-2 control-label">Giới hạn</label>
                  <div class="col-md-2">
                    <input
                      type="number"
                      id="limit_product"
                      name="limit_product"
                      class="form-control"
                      placeholder="Nhập số lượng"
                      min="0"
                      step="1"
                    />
                  </div>
                </div>
              </div>
`;
    $('#category-product').append(htmlDetail);

    prevDivProduct = allDivProduct.last();
    prevDivProductId = prevDivProduct.attr('id');

    htmlBtnRemove = `
    <a class="btn fa fa-times-circle-o fa-2x"
    href="javascript:removeDetail('${prevDivProductId}')" title="Remove detail"
    ></a>`;
    prevDivProduct.append(htmlBtnRemove);

    $("input[name='product_id']").last().focus();
    extraIdProduct++;
}

function removeDetail(id) {
    $('#' + id).remove();
}

function removeDetailByIndex(index) {
    $('#detail' + index).remove();
}

const handleOnChangeProduct = (event) => {
    const checkOption = checkOptionProduct(event);
};

const checkOptionProduct = (event) => {
    let repeatNumberValue = 0;
    const changeValue = event.target.value;
    $("select[name='product_id']").each(function (index) {
        const value = $(this).val();
        if (value === changeValue) repeatNumberValue++;
    });
    if (repeatNumberValue > 1) {
        console.log('da vao');
        event.target.setCustomValidity('Sản phẩm được chọn!');
        event.target.reportValidity();
        return false;
    }
    event.target.setCustomValidity('');
    return true;
};

var EcomCategory = (function () {
    return {
        init: function () {
            /* Initialize Bootstrap Datatables Integration */
            App.datatables();

            /* Initialize Datatables */
            $('#ecom-categories').dataTable({
                columnDefs: [{ orderable: false, targets: [4] }],
                order: [[0, 'asc']],
                pageLength: 5,
                lengthMenu: [
                    [5, 10, 20, -1],
                    [5, 10, 20, 'All'],
                ],
            });

            /* Add placeholder attribute to the search input */
            $('.dataTables_filter input').attr('placeholder', 'Search');
        },
    };
})();
