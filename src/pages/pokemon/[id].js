import React from 'react'
import { useRouter } from 'next/router'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const PokemonDetails = () => {
  const router = useRouter()
  // const pokemonId = router.query && router.query.id
  return (
    <div>Deatils of Pokemon</div>
  )
}

export default PokemonDetails

export async function getServerSideProps(context) {
  const { slug } = context.params
  const client = new ApolloClient({
    uri: "https://graphql-pokemon2.vercel.app/",
    cache: new InMemoryCache()
  })

  const { data } = await client.query({
    query: gql`
    query pokemon($slug:String!,$name: String){
      pokemon(id:"UG9rZW1vbjowMDE=",name: "Bulbasaur") {
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
  }`
  }
  )

  return {
    props: {
      pokemondata: data
    }
  }
}