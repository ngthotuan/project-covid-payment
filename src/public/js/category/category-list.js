$(document).ready(function () {
    $('.btnDelete').click((e) => {
        console.log('da vao');
        e.preventDefault();
        const categoryId = e.target.getAttribute('categoryId');
        const categoryName = e.target.getAttribute('categoryName');
        const url = e.target.getAttribute('href');
        showModalDialog(url, categoryId, categoryName);
    });
});

function showModalDialog(url, categoryId, categoryName) {
    $('#delete-link').attr('href', url);
    $('#modal-categoryId').text(categoryId);
    $('#model-categoryName').text(categoryName);
    $('#modal-dialog').modal();
}
