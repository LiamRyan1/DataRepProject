
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Edit from './components/edit';
import Read from './components/read';
import Create  from './components/create';
function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Read />} />
        <Route path="/create" element={<Create />} />
        <Route path='/edit/title' element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
