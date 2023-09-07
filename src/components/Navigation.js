import { NavLink } from 'react-router-dom'
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import logo from '../assets/images/logo.png';
import HomeIcon from '@mui/icons-material/Home';

const appBarStyle={
    height: {
        xs: 80,
        md: 60,
    },
    backgroundColor: "#fafafa",
    width: 1
}

const toolBarStyle = {
    display: 'flex',
    flexDirection: {
        xs: 'column',
        md: 'row',
    },
    justifyContent: {
        xs: 'center',
        md: 'space-between'
    },
    width: 0.9,
    margin: '0 auto'
}

const logoStyle={
    height: 50,
}

const buttonStyle={
    color: '#2D1C07',
    '&:hover':{
            color: '#00A4BD',
            textDecoration: 'underline',
            fontWeight: 'bold',
    },
}

const Navigation = () => {
    return (
      <AppBar position='fixed' sx={appBarStyle}>
        <Toolbar sx={toolBarStyle}>
            <Box component="img" src={logo} alt={"Ticket trove logo"} edge='start' aria-label='logo' sx={logoStyle}/>
            <Button sx={buttonStyle} component={NavLink} to="/"><HomeIcon />Home</Button>
        </Toolbar>
      </AppBar>
    );
  }
  
  export default Navigation;