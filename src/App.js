import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Landing from './components/Landing';
import Testing from './components/Testing';

function App() {
  return (
    <Router>
      <div className='App'>
        <Nav />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/testing" element={<Testing />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
