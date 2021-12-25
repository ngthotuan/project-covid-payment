const menu = [
    {
        name: 'Dashboard',
        icon: 'gi gi-stopwatch',
        url: '/',
    },
    {
        name: 'Bệnh Nhân',
        icon: 'gi gi-user',
        url: '/patients',
        sub: [
            {
                name: 'Tạo mới',
                url: '/patients/create',
            },
            {
                name: 'Xem danh sách',
                url: '/patients',
            },
        ],
    },
    {
        name: 'Sản phẩm',
        icon: 'gi gi-cake',
        url: '/products',
        sub: [
            {
                name: 'Tạo mới',
                url: '/products/create',
            },
            {
                name: 'Xem danh sách',
                url: '/products',
            },
        ],
    },
    {
        name: 'Gói nhu yếu phẩm',
        icon: 'gi gi-shopping_cart',
        url: '/categories',
        sub: [
            {
                name: 'Tạo mới',
                url: '/categories/create',
            },
            {
                name: 'Xem danh sách',
                url: '/categories',
            },
        ],
    },
    {
        name: 'Khu cách ly',
        icon: 'gi gi-bank',
        url: '/hospitals',
        sub: [
            {
                name: 'Tạo mới',
                url: '/hospitals/create',
            },
            {
                name: 'Xem danh sách',
                url: '/hospitals',
            },
        ],
    },
];

module.exports = menu;
