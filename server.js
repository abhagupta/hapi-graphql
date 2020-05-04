const hapi = require('hapi');
const mongoose = require('mongoose');
const Books = require('./models/Books')
const Author = require('./models/Author')

const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');
const schema = require('./graphql/schema');


const server = hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: true
  }
});

mongoose.connect('mongodb://127.0.0.1:27017/books', {useNewUrlParser: true,  useUnifiedTopology: true });

mongoose.connection.once('open', () => {
    console.log("Connected to the database");
})

const init = async() => {

   
    server.route([
        {
            method: 'GET',
            path: '/',
            handler: (req, reply) => {
                return "<h1>Hello World!! </h1>"
            }
        },
        {
            method: 'GET',
            path: '/api/v1/books',
            handler: (req, reply) => {
               return Books.find();
            }
        },
        {
          method: 'GET',
          path: '/api/v1/authors',
          handler: (req, reply) => {
             return Author.find();
          }
      },
      {
        method: 'GET',
        path: '/api/v1/authors/{id}',
        handler: (req, reply) => {
          const id = req.params.id;
          console.log("id", id);
           return Author.find({id: id});
        }
      },
        {
            method: 'POST',
            path: '/book',
            handler: (req, reply) => {
            const { name, genre, author } = req.payload;
            const book = new Books({
                name,
                author,
                genre
            })

            return book.save();
            }
        },
        {
          method: 'POST',
          path: '/author',
          handler: (req, reply) => {
          const { name, id } = req.payload;
          const author = new Author({
              name,
              id
          })

          return author.save();
          }
      },

    ])

    await server.register({
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
      })
    
      await server.register({
        plugin: graphiqlHapi,
        options: {
          path: '/graphiql',
          graphiqlOptions: {
            endpointURL: '/gql'
          }
        }
      })

   
    await server.start();
    
    console.log(`Server running at ${server.info.uri}`)
}

init();