import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql'
import fetch from 'node-fetch'

const BASE_URL = 'https://pokeapi.co/api/v2'

const getPokemonByURL = (query) => {
  return fetch(`${BASE_URL}/pokemon/${query}/`)
    .then(res => res.json())
}

const PokemonType = new GraphQLObjectType({
  name: 'Pokemon',
  description: '...',

  fields: () => ({
    name: { type: GraphQLString },
    id: { type: GraphQLString },
  })
})

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: '...',

  fields: () => ({
    pokemon: {
      type: PokemonType,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
      },
      resolve: (root, args) => 
        getPokemonByURL(`${args.id || args.name}`)
        
    }
  })
})

export default new GraphQLSchema({
  query: QueryType
})