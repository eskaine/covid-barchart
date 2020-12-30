import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import drawChart from '../helpers/chart';

function Content({ data }) {
  const [display] = useState({
    width: 1400,
    height: 700,
  });
  const [margin] = useState(80);

  useEffect(() => {
    if (data.length > 0) {
      drawChart(display, margin, '#barchart', data);
    }
  }, [data]);

  return (
    <Container className="chart">
      <Typography variant="h4" component="h4" align="center">
        Global Covid Cases - Weekly (Past 1 Year)
      </Typography>
      <div id="barchart"></div>
    </Container>
  );
}

export default Content;
