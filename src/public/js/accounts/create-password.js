$(document).ready(() => {
    $('.input-group')
        .last()
        .change(() => {
            '#form-group'.last().removeClass('has-error');
            '#input-group'.last().find('.help-block').remove();
        });
});

const checkPassword = (e, form) => {
    console.log('dava');
    e.preventDefault();
    const password = '#password'.val();
    const repeatPassword = '#repeat-password'.val();

    if (password !== repeatPassword) {
        $('.form-group').last().addClass('has-error');
        $('.input-group')
            .last()
            .append(
                `<div class="help-block animation-slideDown">Mật khẩu không khớp á</div>`,
            );
        return false;
    }
};
