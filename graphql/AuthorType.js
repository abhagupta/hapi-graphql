const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const  BookType  = require('./BookType');
const Books = require('../models/Books');



const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
               return Books.find({author: parent._id}).then((docs) => {
                  return docs;
               })
            }
        }
        
    })
})

module.exports = AuthorType;




