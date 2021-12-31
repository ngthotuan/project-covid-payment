function showModalDetail(productId) {
    this.event.preventDefault();
    $('#productEdit').attr('href', '/products/edit/' + productId);
    $('#detailModal')
        .modal('show')
        .find('.modal-body')
        .load('/products/view/' + productId);
}
