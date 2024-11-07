const routes = {
    HOME: '/',
    ADMIN: {
        BASE: "/admin",
        LOGIN: "/admin/login",
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
    AUTH: {
        BASE: "/auth",
        ADMIN: {
            LOGIN: "/admin/login",
            FORGOTPASS: "/admin/forgot-pass"
        },
        USER: {
            LOGIN: "/auth/login",
            REGISTER: "/auth/register",
            FORGOTPASS: "/auth/forgot-pass"
        }
    }
};


export default routes;