import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Nav = () => {
  return (
    <SideBar>
        <h2> Projects list </h2>
        <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/currency">Currency</Link></li>
        <li><Link to="/calculator">Calculator</Link></li>
        <li><Link to="/searchvideo">Search-movies</Link></li>
        </ul>
    </SideBar>
  )
}

export default Nav

const SideBar = styled.aside`

background-color: rgba(245, 248, 250, .8);
display: flex;
flex-direction: column;
padding: 1rem;
height: 100vh;
width: 25%;
font-size: large;
line-height: 1.5;
a{
    text-decoration: none;
}
ul{
list-style: none;
}

`