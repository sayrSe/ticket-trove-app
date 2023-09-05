import './styles/App.css';
import { Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import { Box } from '@mui/material';

const contentStyle={
  marginTop: {
    xs: 12,
    md: 10,
  }
}

function App() {
  return (
    <div className="App">
      <Navigation />
      <Box sx={contentStyle}><Outlet /></Box>
    </div>
  );
}

export default App;
