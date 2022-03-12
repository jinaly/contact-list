import { Container } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Add from './component/Add';
import Home from './component/Home';

function App() {
  return (
    <>
      <Container maxWidth='sm'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/add' element={<Add />} />

          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
