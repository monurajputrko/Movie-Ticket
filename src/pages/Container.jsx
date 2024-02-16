import React,{useEffect, useContext} from "react";
import Contextpage from '../Contextpage'
import Movies from "../components/Movies";
import Searchbar from "../components/Searchbar";
import { useParams } from 'react-router-dom'
import Search from "../pages/Search"
import { MainCarousel } from "../components/MainCarousel";


function Container() {
    const { setMovies } = useContext(Contextpage);
    const { query } = useParams()
    return (
      <>
        <section>
                <MainCarousel />
                <br />
          <Searchbar />
          {query ? <Search query={query} /> : <Movies />}
        </section>
      </>
    );
}

export default Container;