import React ,{useEffect,useState,useRef} from 'react'
import styled from 'styled-components'

const SearchMovies = () => {
    
    const [fetchedData , setFetchedData] = useState(null);
    const [pageUrl, setPageUrl] = useState("https://apimovies.fr/api/movies");
    const [videoId , setVideoId] = useState("");
    const [searchWord, setSearchWord] = useState("");
    const inputSearch = useRef("")
    const apiEndPoint = useRef("https://apimovies.fr/api/movies")

    useEffect(() => {
      fetch(apiEndPoint.current).then((response)=>{
          if(response.ok){
            return  response.json()
          }
      }).then(response => setFetchedData(response)).catch(error => console.log(error))

    },[pageUrl,videoId,searchWord])
   
    const HundleChange = (e) => {   
       setSearchWord(e.target.value)
       if(!e.target.value){
        setPageUrl("https://apimovies.fr/api/movies")
        apiEndPoint.current ="https://apimovies.fr/api/movies"
        return
       }
       setPageUrl(`https://apimovies.fr/api/movies/search?search=${e.target.value}`)
       apiEndPoint.current = `https://apimovies.fr/api/movies/search?search=${e.target.value}`
      }   
if (videoId) {

  return (
    <>
          {fetchedData && <Video>
            <h2>{fetchedData.title}</h2>
            <img src={fetchedData.poster} alt={fetchedData.title} />
            <p>Title : {fetchedData.title}</p>
            <p>duration :{fetchedData.duration}min</p>
            <p>released : {fetchedData.year}</p>
            <p>producer : {fetchedData.director}</p>
            <button onClick={() => {
              apiEndPoint.current = pageUrl
              setVideoId("")
              setFetchedData(null)
            }}>BACK</button>
            </Video>}
    </>
  )
}else{
   if(searchWord && inputSearch.current){
    inputSearch.current.value = searchWord
   } 
  return (
      <>
      <Container>
      <SearchBar>
        <input ref={inputSearch} type="text" onChange={HundleChange}/>
        <button>search</button>
      </SearchBar>
      <Videos>
        {fetchedData ? fetchedData.data.map((v, index) => {
            return (
               <div onClick={() => {
                setVideoId(v.id.toString())
                apiEndPoint.current = `https://apimovies.fr/api/movies/${v.id.toString()}` 
               }} key={index}>
                   <img src={v.poster} alt={v.title}  />
                   <h3>{v.title}</h3>
              </div>
            )
        })
        : <p>API's data has not be fetched </p>}
          </Videos>
          {fetchedData && <PagesList>
          <button onClick={() => {
             apiEndPoint.current = fetchedData.first_page_url
             setPageUrl(fetchedData.first_page_url)
          }}>1</button><span>...</span>
               {fetchedData.prev_page_url && <button onClick={() => {
             apiEndPoint.current = fetchedData.prev_page_url
             setPageUrl(fetchedData.prev_page_url)
           }}>{fetchedData.current_page - 1}</button>} 
          <button style={{background : "white"}}>{fetchedData.current_page}</button>
           {fetchedData.next_page_url && <button onClick={()=>{
             apiEndPoint.current = fetchedData.next_page_url
             setPageUrl(fetchedData.next_page_url)
           }}>{fetchedData.current_page + 1} </button>} 
         <span>...</span>
          <button onClick={() => {
            apiEndPoint.current = fetchedData.last_page_url
            setPageUrl(fetchedData.last_page_url)
          }}>{fetchedData.last_page}</button>
          </PagesList>} 
          <p>page</p>
    </Container>
      </>
  )
}
}

export default SearchMovies

const Container = styled.div`
  display: flex;
  flex-direction: column;
  p{
    text-align: center;
    font-size: large;
  }
`
const Videos = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1rem;
    margin: 0 auto;
    text-align: center;
    font-family: monospace;
 
     img{
        height: 200px;
        width: 150px;
        object-fit: cover;
        cursor: pointer;
        &:hover{
          box-shadow: 0 0 0 2px black ;
        }
  }
`
const SearchBar = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: larger;
  width: 100%;
  input{
    width: 100%;
    padding: .5rem;
    font-size: large;
  }
  button{
    padding: 0.5rem;
    cursor: pointer;
    border: none;
    font-size: inherit;
  }
  `
  const PagesList = styled.div`
    margin: 1.5rem 0;
    display: flex;
    flex-direction: row;
    justify-content:  center;
    font-size: large;
    button{
      margin: 0 .2rem;
      cursor: pointer;
      padding: .4rem .5rem;
      border: .5px solid grey;
      font-size: inherit;
    }
    span{
      font-size: larger;
    }
  `
  const Video = styled.div`
  font-size: larger;
  text-align: center;
  img{
    width: 300px;
    height: 400px;
  }
  button{
    cursor: pointer;
    font-size: larger;
    border: none;
    padding: .5rem 1.2rem;
    border-radius: 5px;
  }
  `