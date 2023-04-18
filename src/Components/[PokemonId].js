import React from 'react'
import { useRouter } from 'next/router'
import { ApolloClient,InMemoryCache,gql } from '@apollo/client'

const PokemonDetails = () => {
    const router = useRouter()
    const pokemonId = router.query.pokemonId
  return (
    <div>Deatils of Pokemon{pokemonId}</div>
  )
}

export default PokemonDetails

export async function getStaticProps(){
    const client = new ApolloClient({
        uri:"https://graphql-pokemon2.vercel.app/",
        cache:new InMemoryCache()
    })

    const data = await client.query({
        query:gql`
        query {
            pokemon($slug:string) {
            name,
            id,
            types,
            height{
              minimum,
              maximum
            }
            weight{
              minimum,
              maximum
            }
            classification
            weaknesses
            resistant
            evolutions {
              id
            }
          }
        }
    }
        `
    })
}
export async function getStaticPaths(){

    return{
        paths: []
    }
}