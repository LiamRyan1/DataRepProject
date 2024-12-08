
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Edit from './components/edit';
import Read from './components/read';
import Create  from './components/create';
import Statistics from './components/statistics';
function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Read />} />
        <Route path="/create" element={<Create />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/stats' element={<Statistics/>} />
      </Routes>
    </Router>
  );
}

export default App;
