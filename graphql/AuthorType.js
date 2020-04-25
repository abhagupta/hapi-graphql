const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const  BookType  = require('./BookType');
const Book = require('../models/Books');



const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString }
        // books: {
        //     type:  BookType,
        //     resolve(parent, args){
        //         return Book.find({author: parent.id})
        //     }
        // }
    })
})

module.exports = AuthorType;


