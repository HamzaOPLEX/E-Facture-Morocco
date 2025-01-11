export const environment = {
    production: true,
    api_server: "http://127.0.0.1:8000",
    endpoints: {
        register: 'api/auth/register',
        login: 'api/auth/login',
        user: 'api/auth/user',
        documentList: 'api/documents', // + <type>
        documentCreate: 'api/documents/create/',
        documentDetail: 'api/document', // <type>/<pk>
        documentEdit: 'api/documents/update/<pk>',
        documentDelete: 'api/documents/delete/<pk>',
        clientsList: 'api/clients/',
        clientCreate: 'api/clients/create/',
        clientDetail: 'api/clients/<pk>/',
        clientEdit: 'api/clients/update/<pk>',
        clientDelete: 'api/clients/delete/<pk>',
        dashboard: 'api/dashboard/',
    },
};
