import React from 'react';
import Typography from '@material-ui/core/Typography';

function Tooltip({ data }) {
  return (
    <div id="tooltip">
      <Typography variant="h6" align="center">
        Covid Week {data.week}
      </Typography>
      <Typography variant="subtitle1" align="center">
        {data.start} - {data.end}
      </Typography>
      <Typography variant="body1">Total: {data.total}</Typography>
      <Typography variant="body1">New Cases: {data.count}</Typography>
    </div>
  );
}

export default Tooltip;
