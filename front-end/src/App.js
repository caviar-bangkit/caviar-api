
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useNavigate, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import Crossings from "./pages/crossings";

function App() {
  const navigate = useNavigate();
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
