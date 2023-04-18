import React, { useEffect, useState } from 'react'
import { useQuery,gql } from '@apollo/client'
import { LoadPokemons } from '@/GraphQL/Queries'

const GetPokemons = (props) => {


const {error, loading, data} = useQuery(LoadPokemons)
    

const [pokemons,setPokemons] = useState([])
useEffect(()=>{
    if(data){
        setPokemons(data.pokemons)
    }
},[data])




return (
    <div>
        <ul className='pokemon-list'>
        {
            pokemons.map((pokemon,index)=>{
                return <li key={index+1} className='pokemon-card'>
                    <img src={pokemon.image}/>
                    <div className='pokemon-card-info'>
                    <h3>{pokemon.number}</h3>
                <p><strong>{pokemon.name}</strong></p>
                <p><strong>{pokemon.types}</strong></p>
                </div>
                </li>
            })
        }
        </ul>
    </div>
  )
}




export default GetPokemons
