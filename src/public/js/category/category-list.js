// $(document).ready(function () {
//     $('.btnDelete').click((e) => {
//         e.preventDefault();
//         const categoryId = e.target.getAttribute('categoryid');
//         const categoryName = e.target.getAttribute('categoryname');
//         const url = e.target.getAttribute('href');
//
//         showModalDialog(url, categoryId, categoryName);
//     });
// });

function showModalDialog(button) {
    const categoryId = $(button).attr('categoryid');
    const categoryName = $(button).attr('categoryname');
    const url = `/categories/delete/${categoryId}`;
    $('#delete-link').attr('href', url);
    $('#modal-categoryId').text(categoryId);
    $('#modal-categoryName').text(categoryName);
    $('#modal-dialog').modal();
}
