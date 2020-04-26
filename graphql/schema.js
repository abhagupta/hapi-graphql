const graphql = require('graphql');
const BookType = require('./BookType');
const AuthorType = require('./AuthorType');
const Books = require('../models/Books')
const AuthorModel = require('../models/Author')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} = graphql;

const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : {
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args){
                return Books.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
               return   AuthorModel.findById(args.id);
            }
        },

        bookByName: {
            type: new GraphQLList(BookType),
            args: {name: {type: GraphQLString}},
            resolve(parent, args){
               return Books.find({name: args.name}).then((docs) => {
                  return docs;
               })
            }
        }
    }

})

module.exports = new GraphQLSchema({
    query: RootQuery
})