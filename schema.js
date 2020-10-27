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
    forms: { type: GraphQLList(GenericType) },
    gameIndices: { type: GraphQLList(GameIndexType),
      resolve: obj => obj.game_indices},
    sprites: { type: SpritesType },
  })
})

const GenericType = new GraphQLObjectType({
  name: 'Generic',
  description: "",

  fields: () => ({
    name: { type: GraphQLString,
      resolve: parent => parent.name },
    url: { type: GraphQLString,
      resolve: parent => parent.url }
  })
})

const GameIndexType = new GraphQLObjectType({
  name: 'GameIndex',
  description: "List of Games this pokemon appears in",

  fields: () => ({
    gameIndex: { type: GraphQLString,
      resolve: obj => obj.game_index },
      name: { type: GraphQLString,
        resolve: parent => parent.version.name
      },
      url: { type: GraphQLString,
        resolve: parent => parent.version.url
      }
  })
})

const SpritesType = new GraphQLObjectType({
  name: 'Sprites',
  description: "Sprite images for the pokemon",

  fields: () => ({
    backDefault: { type: GraphQLString,
      resolve: obj => obj.back_default },
    backFemale: { type: GraphQLString,
      resolve: obj => obj.back_female },
    backShiny: { type: GraphQLString,
      resolve: obj => obj.back_shiny },
    backShinyFemale: { type: GraphQLString,
      resolve: obj => obj.back_shiny_female },
    frontDefault: { type: GraphQLString,
      resolve: obj => obj.front_default },
    frontFemale: { type: GraphQLString,
      resolve: obj => obj.front_female },
    frontShiny: { type: GraphQLString,
      resolve: obj => obj.front_shiny },
    frontShinyFemale: { type: GraphQLString,
      resolve: obj => obj.front_shiny_female },
    otherDreamWorld: { type: GraphQLString,
      resolve: obj => obj.other.dream_world.front_default },
    otherDreamWorldFemale: { type: GraphQLString,
      resolve: obj => obj.other.dream_world.front_female },
    otherOfficialArtwork: { type: GraphQLString,
      resolve: obj => obj.other["official-artwork"].front_default },
  })
})

const TypesType = new GraphQLObjectType({
  name: 'Types',
  description: "List of the pokemon's types.",

  fields: () => ({
    slot: { type: GraphQLString },
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