const routes = {
    HOME: '/',
    ADMIN: {
        BASE: "/admin",
        AUTHORS: {
            BASE: '/admin/authors',
            LIST: '/admin/authors/list',
            VIEW: (id) => `/admin/authors/view/${id}`,
            ADD: '/admin/authors/add',
        },
        USERS: '/admin/users',
        SUBSCRIPTIONS: '/admin/subscriptions',
    }
};


export default routes;