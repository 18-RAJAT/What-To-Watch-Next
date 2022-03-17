import { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";

//API KEY
export const API_KEY = "a0dd99c5";


const Container = styled.div`
display:flex;
flex-direction:column;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

//Creating a header
const Header = styled.div`
 display:flex;
 flex-direction:row;
 background-color:black;
 color:white;
 padding:10px;
 font-size:25px;
 font-weight:bold;
 box-shadow:0 3px 6px 0 #555;
 justify-content:space-between;
 align-item:center;
`;

const MovieImage = styled.img`
width:48px;
height:48px;
margin:15px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 5px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
  height:5vh
`;

const SearchIcon = styled.img`
width:20px;
height:20px;
`;

const SearchInput = styled.input`
color:black;
font-size: 16px;
font-weight: bold;
border: none;
outline: none;
margin-left: 15px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 50px;
  gap: 25px;
  justify-content: space-evenly;;
  background-color:lightskyblue;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 100%;
`;


function App() {

  const [searchQuery, updateSearchQuery] = useState("");

  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [timeoutId, updateTimeoutId] = useState();

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    updateMovieList(response.data.Search);
  };

  const onTextChange = (e) => {
    onMovieSelect("")
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);

    const Timeout = setTimeout(() => fetchData(e.target.value), 100);
    updateTimeoutId(Timeout);
  };
  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="movie-icon.png" />
          Movie App
        </AppName>
        <SearchBox>
          <SearchIcon src="search-icon.png" />
          <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <Placeholder src="1.png" />
        )}

      </MovieListContainer>
      
    </Container>
  );
}

export default App;