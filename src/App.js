import { useState, useRef, Fragment} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './components/Gallery';
import SearchBar from './components/SearchBar';
import AlbumView from './components/AlbumView';
import ArtistView from './components/ArtistView';
import { DataContext } from './context/DataContext';
import { SearchContext } from './context/SearchContext';

function App() {
  let [message, setMessage] = useState('Seach for music')
  let [data, setData] = useState([])
  let searchInput = useRef('')
  const API_URL = 'https://itunes.apple.com/search?term='
  
  const handleSearch = (e, term) => {
    e.preventDefault();
    const fetchData = async () => {
      document.title = `${term} music`
      const response = await fetch(API_URL + term)
      const resData = await response.json()
      if(resData.results.length > 0){
        setData(resData.results)
      }else{
        setMessage('Not Found')
      }
    }
    fetchData()
    
  }
  return (
    <div className="App">
       <Router>
              <Routes>
                  <Route path="/" element={
                      <Fragment>
                          <SearchBar handleSearch = {handleSearch}/>
                          <Gallery data={data} />
                      </Fragment>
                  } />
                  <Route path="/album/:id" element={<AlbumView />} />
                  <Route path="/artist/:id" element={<ArtistView />} />
              </Routes>
          </Router>
    </div>
  );
}
export default App;
