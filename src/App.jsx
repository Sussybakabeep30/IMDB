import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Watchlist from "./Components/Watchlist";
import Movies from "./Components/Movies";
import Recom from "./Components/Recom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from "./Components/Banner";


function App() {
  const [watchList, setWatchList] = useState([]);

  function handleAddToWatchList(movieObj){
    const update = [...watchList, movieObj]
    setWatchList(update);
    console.log(update)

  }
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner /> <Movies HandleWatchList={handleAddToWatchList} watchList={watchList} />
              </>
            }
          />
          <Route path="/watchlist" element={<Watchlist watchList={watchList} setWatchList={setWatchList} />} />
          <Route path="/recommend" element={<Recom />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
