const routes = {
    HOME: '/',
    ADMIN: {
        BASE: "/admin",
        CATEGORY: {
            LIST: "/admin/category",
            ADD: "/admin/category/add"
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
            BASE: '/author/boo',
            LIST: "/author/book/list",
            ADD: "/author/book/add",
            EDTI: "/author/book/edit",
            PUBLISH: "/author/book/publish",
            ANALYTICS: (id) => `/author/book/${id}`,
        },

        ORDER: "/author/order",
        MY_SUBSCRIPTION: "/author/subscription",
        READER_FEEDBACK: "/author/feedback",
        COUPON: "/author/coupon"



    },
    AUTH: {
        BASE: "/auth",
        ADMIN: {
            LOGIN: "/admin/login",
            FORGOTPASS: "/admin/forgot-password"
        },
        USER: {
            LOGIN: "/login",
            REGISTER: "/register",
            FORGOTPASS: "/forgot-password"
        },
        AUTHOR: {
            LOGIN: "/author/login",
            REGISTER: "/author/register",
            FORGOTPASS: "/author/forgot-password"
        }
    }
};


export default routes;