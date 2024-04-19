import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Join from './Components/Join';
import Chat from './Components/Chat';


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Join/>}/>
        <Route path='/client' element={<Chat/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
