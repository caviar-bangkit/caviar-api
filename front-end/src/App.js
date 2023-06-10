import "firebase/compat/auth";
import "firebase/compat/firestore";
import { Route, Routes } from 'react-router-dom';
import Crossings from "./pages/crossings";
import Home from './pages/home';
import Login from './pages/login';

function App() {
  return (
    <div>
        {/* <button onClick={() => navigate(-1)}>go back</button> */}
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/crossings" element={<Crossings/>}/>
        </Routes>
      </div>
  );
}

export default App;
