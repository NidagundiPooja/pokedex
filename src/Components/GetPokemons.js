import React, { useEffect, useState } from 'react'
import { useQuery,gql } from '@apollo/client'
import { LoadPokemons } from '@/GraphQL/Queries'
import {  useRouter } from 'next/router'

const GetPokemons = (props) => {

const [pokemons,setPokemons] = useState([])
const [count,setCount] = useState(20)

const {error, loading, data,fetchMore} = useQuery(LoadPokemons,{
    variables:{
        first:count
    }
})

const router=useRouter()


useEffect(()=>{
    if(data){
        setPokemons(data.pokemons)
    }
},[data])

const handleClick = ()=>{
    setCount(count+20)
    fetchMore({
        variables:{
            first:count+20
        }
    })
    
}

const handleClickCard = (id,name)=>{
    console.log("id-->",id)
    router.push(`/pokemon/'${id}`,)
}

return (
    <div>
        <ul className='pokemon-list'>
        {
            pokemons.map((pokemon,index)=>{
                return <li key={index+1} className='pokemon-card' onClick={()=>handleClickCard(pokemon.id,pokemon.name)}>
                    <img width="100%" src={pokemon.image}/>
                    <div className='pokemon-card-info'>
                    <h3>{pokemon.number}</h3>
                <p><strong>{pokemon.name}</strong></p>
                <p><strong>{pokemon.types}</strong></p>

                </div>
                </li>
            })
        }
        </ul>
        <button onClick={handleClick}>Next </button>
    </div>
  )
}




export default GetPokemons
