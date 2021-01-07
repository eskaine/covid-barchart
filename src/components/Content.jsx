import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import drawChart from '../helpers/chart';
import Tooltip from './Tooltip';

function Content({ data }) {
  const [display] = useState({
    width: 1400,
    height: 700,
  });
  const [margin] = useState(80);
  const [tipData, setTipData] = useState({});
  const [showTip, setShowTip] = useState(false);
  const tip = {
    setTipData,
    setShowTip,
  };

  useEffect(() => {
    if (data.length > 0) {
      drawChart(display, margin, '#barchart', data, tip);
    }
  }, [data]);

  return (
    <Container className="chart">
      {showTip && <Tooltip data={tipData} />}
      <Typography variant="h4" component="h4" align="center">
        Global Covid Cases - Weekly (Past 1 Year)
      </Typography>
      <div id="barchart"></div>
    </Container>
  );
}

export default Content;
