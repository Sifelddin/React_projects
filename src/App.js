import Currency from './components/Currency';
import Home from './components/Home';
import Nav from './components/Nav';
import { Routes, Route } from "react-router-dom";
import './App.css';
import styled from 'styled-components';
import Calculator from './components/Calculator';
import SearchMovies from './components/SearchVideo';


function App() {
  return (
    <>
    <Title> Small Projects</Title>
    <Container>
   <Nav/>
   <Main>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/currency" element={<Currency />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/searchvideo" element={<SearchMovies />} />
    </Routes>
    </Main>
    </Container>
    </>
  );
}

export default App;
const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  letter-spacing: 2px;
`
const Container = styled.div`
display: flex;
`
const Main = styled.main`
width: 75%;

display: flex;
align-items: center;
justify-content: center;
`