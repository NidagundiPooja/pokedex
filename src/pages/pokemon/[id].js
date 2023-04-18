import React from 'react'
import { useRouter } from 'next/router'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const PokemonDetails = (props) => {
  const { pokemondata } = props;
  const router = useRouter();
  const pokemon = pokemondata && pokemondata.pokemon;

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.image} alt={pokemon.name} />
      <p>Number: {pokemon.number}</p>
      <p>Classification: {pokemon.classification}</p>
      <p>Types: {pokemon.types.join(', ')}</p>
      <p>Resistant: {pokemon.resistant.join(', ')}</p>
      <p>Weaknesses: {pokemon.weaknesses.join(', ')}</p>
    </div>
  );
};

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