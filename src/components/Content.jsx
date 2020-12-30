import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import * as d3 from 'd3';

function Content({ data }) {
  const [display] = useState({
    width: 1400,
    height: 700,
    barWidth: 20,
  });
  const [margin] = useState({
    top: 50,
    bottom: 50,
    left: 50,
    right: 50,
  });

  const drawChart = () => {
    const svg = d3
      .select('#barchart')
      .append('svg')
      .attr('width', display.width - 100)
      .attr('height', display.height - 100)
      .attr('viewBox', [0, 0, display.width, display.height]);

    const x = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, display.width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.count), d3.max(data, (d) => d.count)])
      .range([display.height - margin.bottom, margin.top]);

    svg
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (d, i) => x(i))
      .attr('y', (d, i) => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', (d) => y(0) - y(d.count))
      .attr('fill', 'royalblue');

    svg
      .append('g')
      .attr('transform', `translate(0,${display.height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append('g').attr('transform', `translate(${margin.left}, 0)`).call(d3.axisLeft(y));
  };

  useEffect(() => {
    if (data.length > 0) {
      drawChart();
    }
  }, [data]);

  return (
    <Container>
      <div id="barchart" className="chart"></div>
    </Container>
  );
}

export default Content;
