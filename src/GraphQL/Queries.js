import {gql} from '@apollo/client'

export const LoadPokemons = gql`
query getPokemons($first:Int!){
    pokemons(first:$first){
        image,
        number,
        name,
        types,
        id
    }
  }
`



