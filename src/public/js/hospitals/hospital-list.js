$(function () {
    // init table
    App.datatables();
    $('#ecom-hospitals').dataTable({
        columnDefs: [{ orderable: false, targets: [8] }],
        order: [[0, 'asc']],
        pageLength: 5,
        lengthMenu: [
            [5, 10, 20, -1],
            [5, 10, 20, 'Tất cả'],
        ],
    });
    $('.dataTables_filter input').attr('placeholder', 'Tìm kiếm...');
});

function showConfirmDelete(button) {
    const hospitalId = $(button).parents('tr').find('td:first-child').text();
    const hospitalName = $(button).parents('tr').find('td:nth-child(2)').text();
    $('#hospitalId').text(hospitalId);
    $('#hospitalDeleteLink').attr('href', '/hospitals/remove/' + hospitalId);
    $('#hospitalName').text(hospitalName);
    $('#confirmDelete').modal('show');
}
