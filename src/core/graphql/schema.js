import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

import {
  GraphQLLimitedString
} from 'graphql-custom-types';

import { 
    GraphQLUpload 
} from 'graphql-upload';

import {
    getEmoji,
    getEmojis,
    createEmojis,
    getPack,
    createpack,
    getPacks,
    getUsers
 } from '../lib/faunadb';

 import { cloudinary as v2 } from 'cloudinary';

const User = new GraphQLObjectType({
    name: "User",
    description: "A User",
    fields: {
        id: {
            type: GraphQLString
        },
        username: {
            type: GraphQLString
        }
    }
});

 const Emoji = new GraphQLObjectType({
     name: "Emoji",
     description: "A Emoji",
     fields: {
         id: {
             type: GraphQLString
         },
         image_url: {
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
         users: {
             type: GraphQLList(User),
             description: "List of Users",
             resolve: (source, {category}) => getUsers()
         }
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
                image: {
                    type: new GraphQLNonNull(GraphQLUpload),
                    description: 'The image in of the emoji'
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
            resolve: async (source, args) => {
                let emojiArgs = {
                    id, category, packId, creator
                };

                const { filename, mimetype, createReadStream } = await image;
                const stream = createReadStream();

                stream.pipe(cloudinary.uploader.upload_stream({tags: 'emoji'}, (err, image) => {
                    if (err) throw new Error("Could not upload emoji image!");

                    emojiArgs.image_url = image.url;
                    return createEmoji(emojiArgs);
                }));
            }
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

export default Schema;