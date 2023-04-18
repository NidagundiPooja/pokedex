import {gql} from '@apollo/client'

export const LoadPokemons = gql`
query{
    pokemons(first:100){
        image,
        number,
        name,
        types
    }
  }
`

// export const pokemonDetails = gql`
//   query{
//     {
//       pokemon(id:"UG9rZW1vbjowMDE=") {
//         name,
//         id,
//         types,
//         height{
//           minimum,
//           maximum
//         }
//         weight{
//           minimum,
//           maximum
//         }
//         classification
//         weaknesses
//         resistant
//         evolutions {
//           id
//         }
//       }
//     }
//   }
// `

