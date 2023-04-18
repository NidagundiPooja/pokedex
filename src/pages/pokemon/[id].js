import React from 'react'
import { useRouter } from 'next/router'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const PokemonDetails = (props) => {
  const router = useRouter()
  // const pokemonId = router.query && router.query.id
  console.log("props=====>",props)
  return (
    <div>Deatils of Pokemon</div>
  )
}

export default PokemonDetails

export async function getServerSideProps(context) {
  const { id } = context.params
  const client = new ApolloClient({
    uri: "https://graphql-pokemon2.vercel.app/",
    cache:new InMemoryCache()
  })

  const { data } = await client.query({
    query: gql `query pokemon($id: String){
      pokemon(id: $id){
        id
        number
        name
        weight{
          minimum
          maximum
        }
        height{
          minimum
          maximum
        }
        classification
        types
        resistant
        weaknesses
        fleeRate
        maxCP
        maxHP
        image
      }
    }`,
    variables:{
       id
    }
  })

  return {
    props: {
      pokemondata: data
    }
  }
}