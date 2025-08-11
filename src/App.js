import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Landing from './components/Landing';
import Testing from './components/Testing';
import Results from './components/Results';
import Select from './components/Select';
import Summary from './components/Summary';

function App() {
  return (
    <Router>
      <div className='App'>
        <Nav />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/testing" element={<Testing />} />
          <Route path="/results" element={<Results />} />
          <Route path="/select" element={<Select />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
