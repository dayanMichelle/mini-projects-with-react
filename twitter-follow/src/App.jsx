import React from 'react'
import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

const user = [{
    userName: 'midudev',
    name: 'Miguel Angel'
},
{
    userName: 'TMChein',
    name:'Tomas'
},
{
    userName: 'dayan_developer',
    name:'Dayan developer'
}]
export function App(){
   return(
        <section className='App'>
        {
            user.map(({userName, name}) =>  (
                    <TwitterFollowCard 
                    key={userName}
                    username={userName}>
                        {name}
                    </TwitterFollowCard>
                )
            )
        } 
        </section>
   )
}