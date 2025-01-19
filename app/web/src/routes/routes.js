const routes = {
    HOME: '/',
    ADMIN: {
        BASE: "/admin",
        CATEGORY: {
            LIST: "/admin/category",
            ADD: "/admin/category/add",
            SINGLE: (id) => `/admin/category/${id}`
        },
        BOOKS: {
            ALL_BOOKS: "/admin/all-books"
        },
        REVENU: {
            BASE: "/admin/revenu"
        },
        ORDERS: {
            BASE: "/admin/orders"
        },
        AUTHORS: {
            BASE: '/admin/authors',
            LIST: '/admin/authors/list',
            VIEW: (id) => `/admin/authors/${id}`,
            ADD: '/admin/authors/add',
            SUBSCRIPTIONS: '/admin/authors/subscriptions',
        },
        USERS: '/admin/users',
    },
    AUTHOR: {
        BASE: "/author",
        BOOK: {
            BASE: '/author/book',
            LIST: "/author/book/list",
            ADD: "/author/book/add",
            SINGLE: (BOOK_ID) => `/author/book/${BOOK_ID}`,
            ANALYTICS: (id) => `/author/book/${id}`,
        },

        ORDER: "/author/order",
        SINGLE_ORDER: (id) => `/author/order/${id}`,
        MY_SUBSCRIPTION: "/author/subscription",
        READER_FEEDBACK: "/author/feedback",
        COUPON: {
            BASE: "/author/coupon",
            ADD: "/author/coupon/add",
            SINGLE: (coupon) => `/author/coupon/${coupon}`
        },
        SETTINGS: "/author/settings"



    },
    AUTH: {
        BASE: "/auth",
        ADMIN: {
            LOGIN: "/admin/login",
            LOGOUT: "/admin/logout",
            FORGOTPASS: "/admin/forgot-password"
        },
        USER: {
            LOGIN: "/login",
            REGISTER: "/register",
            FORGOTPASS: "/forgot-password"
        },
        AUTHOR: {
            LOGIN: "/author/login",
            LOGOUT: "/author/logout",
            REGISTER: "/author/register",
            FORGOTPASS: "/author/forgot-password"
        }
    }
};


export default routes;