/*
 *  Document   : ecomProducts.js
 *  Author     : pixelcave
 *  Description: Custom javascript code used in eCommerce Products page
 */
$(document).ready(function () {
    $("a[name='linkRemoveDetail']").each(function (index) {
        $(this).click(function () {
            removeDetailByIndex(index);
        });
    });
});

function addNextProduct() {
    allDivProduct = $("[id^='product']");
    divProductLength = allDivProduct.length;
    htmlOptionDetail = '';
    products.forEach(function (product) {
        htmlOptionDetail += `<option value=${product.id}>${product.name}
            </option>`;
    });
    htmlDetail =
        ` <div id="product${divProductLength}" class="form-horizontal form-bordered">
              <div class="form-group">
                <label class="col-md-2 control-label"
                  >Sản phẩm</label
                >
                <div class="col-md-5">
                  <select
                    id="product_id"
                    name="product_id"
                    class="select-chosen"
                    data-placeholder="Chọn sản phẩm..."
                    style="width: 250px"
                  >
                    <option></option>` +
        htmlOptionDetail +
        `</select>
                </div>
                <label class="col-md-2 control-label">Giới hạn</label>
                <div class="col-md-3">
                  <input type="number" id="limit_product" name="limit_product"
                  class="form-control" placeholder="Nhập số lượng" min=0"
                  step="1">
                </div>
              </div>`;
    $('#category-product').append(htmlDetail);

    // prevDivProduct = allDivProduct.last();
    // prevDivProductId = prevDivProduct.attr("id");
    //
    // htmlBtnRemove = `
    // <a class="btn fas fa-times-circle fa-2x dark-icon"
    // href="javascript:removeDetail('${prevDivDetailId}')" title="Remove detail"
    // ></a>`
    // prevDivDetail.append(htmlBtnRemove)

    $("input[name='product_id']").last().focus();
}

function removeDetail(id) {
    $('#' + id).remove();
}

function removeDetailByIndex(index) {
    $('#detail' + index).remove();
}

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
