import './App.css';
import React, {useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter,
  // Routes,
  Route,
  Routes
  // Link,
  // Outlet
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'




const App = ()=> {
  
  const page = 7;
  const[progress,setProgress] = useState(0)
  


    return (
      <div>
        <BrowserRouter>
        <Navbar/>
        <LoadingBar
        height= {3}
        color='#f11946'
        progress={progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        <Routes>
        <Route exact path="/" element={<News setProgress={setProgress} key={"general"} pageSize={page} country={'in'} category={'general'} />} />
        <Route exact path="/business" element={<News setProgress={setProgress} key={"business"} pageSize={page} country={'in'} category={'business'} />} />
        <Route exact path="/entertainment" element={<News setProgress={setProgress} key={"entertainment"} pageSize={page} country={'in'} category={'entertainment'} />} />
        <Route exact path="/health" element={<News setProgress={setProgress}  key={"health"} pageSize={page} country={'in'} category={'health'} />} />
        <Route exact path="/science" element={<News setProgress={setProgress}  key={"science"} pageSize={page} country={'in'} category={'science'} />} />
        <Route exact path="/sports" element={<News setProgress={setProgress}  key={"sports"} pageSize={page} country={'in'} category={'sports'} />} />
        <Route exact path="/technology" element={<News setProgress={setProgress}  key={"technology"} pageSize={page} country={'in'} category={'technology'} />} />
        </Routes>
        </BrowserRouter>
      </div>
    )
  
}

export default App;

