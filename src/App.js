import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from './components/Nav';
import Landing from './components/Landing';

function App() {
  return (
    <Router>
      <div className='App'>
        <Nav />
        <Landing />
      </div>
    </Router>
  )
}

export default App;
