const routes = {
    HOME: '/',
    ADMIN: {
        BASE: "/admin",
        LOGIN:"/admin/login",        
        AUTHORS: {
            BASE: '/admin/authors',
            LIST: '/admin/authors/list',
            VIEW: (id) => `/admin/authors/view/${id}`,
            ADD: '/admin/authors/add',
            SUBSCRIPTIONS: '/admin/authors/subscriptions',
        },
        USERS: '/admin/users',
    },
    AUTH:{
        BASE: "/auth",
        ADMIN:{
            LOGIN:"/auth/admin/login",
            FORGOTPASS:"/auth/admin/forgot-pass"
        },
        USER:{
            LOGIN:"/auth/login",
            REGISTER:"/auth/register",
            FORGOTPASS:"/auth/forgot-pass"
        }
    }
};


export default routes;