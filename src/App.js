import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Navbar from './components/Navbar';
import Content from './components/Content';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { weeklyData } from './helpers/func';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

function App() {
  const classes = useStyles();
  const [covidData, setCovidData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_DATA_API);
      if (res.status === 200) {
        setCovidData(weeklyData(res.data.data));
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Content data={covidData} />
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}

export default App;
