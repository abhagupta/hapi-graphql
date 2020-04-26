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
    GraphQLInt,
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

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                id: {type: GraphQLInt}
            },
            resolve(parent,args) {
                let author = new AuthorModel({
                    name: args.name,
                    id: args.id
                });

                return author.save();
            }
        },

        addBook : {
            type: BookType,
            args: {
                name: {type: GraphQLString},
                author: {type: GraphQLString},
                genre: {type: GraphQLString}
            },
            resolve(parent, args) {
                let book = new Books({
                    ...args
                })

                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation : Mutation
})