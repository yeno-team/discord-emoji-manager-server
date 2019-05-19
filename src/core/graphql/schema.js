const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} = require('graphql');

const {
  GraphQLLimitedString
} = require('graphql-custom-types');

const {
    getEmoji,
    getEmojis,
    createEmojis,
    getPack,
    createpack,
    getPacks
 } = require('../lib/faunadb');


 const Emoji = new GraphQLObjectType({
     name: "Emoji",
     description: "An Emoji",
     fields: {
         id: {
             type: GraphQLString
         },
         base64: {
             type: GraphQLString
         },
         category: {
             type: GraphQLString
         },
         packId: {
             type: GraphQLString
         },
         creator: {
             type: GraphQLString
         }
     }
 });

 const Pack = new GraphQLObjectType({
     name: "Pack",
     description: "A group of emojis",
     fields: {
         id: {
             type: GraphQLString
         },
         category: {
             type: GraphQLString
         },
         creator: {
             type: GraphQLString,
         }
     }
 });

 const Query = new GraphQLObjectType({
     name: "Schema",
     description: "Root of the Project Schema",
     fields: {
         emojis: {
             type: GraphQLList(Emoji),
             descrpition: "List of Emojis",
             args: {
                 category: {
                     type: GraphQLString,
                     description: 'optional, filters the returned list with the category provided'
                 }
             },
             resolve: (source, {category}) => getEmojis(category)
         },
         packs: {
             type: GraphQLList(Pack),
             description: "List of Packs",
             args: {
                    category: {
                        type: GraphQLString,
                        description: 'optional, filters the returned list with the category provided'
                    }
            },
            resolve: (source, {category}) => getPacks(category)
         },

     }
 });

const Mutation = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        createEmoji: {
            type: Emoji,
            description: "Create Emoji",
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'The ID of the Emoji'
                },
                base64: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'The image in raw base64'
                },
                category: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'The category of the Emoji'
                },
                packId: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'The pack id of the emoji'
                },
                creator: {
                    type: new GraphQLNonNull(GraphQLString),
                    descrpition: 'The discord id of the creator of the Emoji'
                }
            },
            resolve: (source, args) => createEmoji(args)
        },
        createPack: {
            type: Pack,
            description: "Create Pack",
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'The ID of the Pack'
                },
                category: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'The category of the Pack'
                },
                creator: {
                    type: new GraphQLNonNull(GraphQLString),
                    descrpition: 'The discord id of the creator of the Pack'
                }
            },
            resolve: (source, args) => createPack(args)
        },
    }
});

const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

module.exports = Schema;