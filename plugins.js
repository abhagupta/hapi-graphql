module.exports = {
    graphql : {
        name: 'graphql',
        plugin: graphqlHapi,
        options: {
            path: '/gql',
            graphqlOptions: {
                schema: schema,
            },
            route: {
                 cors: true,
            },
        },
        
    }
    
}