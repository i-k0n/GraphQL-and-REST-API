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
    types: { type: GraphQLList(TypesType) },
    abilities: { type: GraphQLList(AbilitiesType) },
    moves: { type: GraphQLList(MovesType) },
  })
})

const TypesType = new GraphQLObjectType({
  name: 'Types',
  description: "List of the pokemon's types.",

  fields: () => ({
    name: { type: GraphQLString,
      resolve: parent => parent.type.name
    },
    url: { type: GraphQLString,
      resolve: parent => parent.type.url
    }
  })
})

const AbilitiesType = new GraphQLObjectType({
  name: 'Abilities',
  description: "List of the pokemon's abilities.",

  fields: () => ({
    name: { type: GraphQLString,
      resolve: parent => parent.ability.name
    },
    url: { type: GraphQLString,
      resolve: parent => parent.ability.url
    }
  })
})

const MovesType = new GraphQLObjectType({
  name: 'Moves',
  description: "List of the pokemon's moves.",

  fields: () => ({
    name: { type: GraphQLString,
      resolve: parent => parent.move.name
    },
    url: { type: GraphQLString,
      resolve: parent => parent.move.url
    }
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