import * as d3 from 'd3';
import { weeklyData } from './func';

const drawChart = (display, margin, element, tip) => {
  d3.json(process.env.REACT_APP_DATA_API).then((res) => {
    const data = weeklyData(res.data);

    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', display.width - 100)
      .attr('height', display.height - 100)
      .attr('viewBox', [0, 0, display.width, display.height]);

    const x = d3
      .scaleBand()
      .domain(d3.range(1, data.length - 1))
      .range([margin, display.width - margin])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.total), d3.max(data, (d) => d.total)])
      .range([display.height - margin, margin]);

    const chart = svg
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (d, i) => x(i))
      .attr('y', (d, i) => y(d.total))
      .attr('width', x.bandwidth())
      .attr('height', (d) => y(0) - y(d.total))
      .attr('fill', 'royalblue')
      .attr('class', 'bar');

    svg
      .append('g')
      .attr('transform', `translate(0,${display.height - margin})`)
      .call(d3.axisBottom(x))
      .append('text')
      .attr('class', 'label')
      .text('Weeks');

    svg
      .append('g')
      .attr('transform', `translate(${margin}, 0)`)
      .call(d3.axisLeft(y).tickFormat((d) => d / 1e6 + ' M'));

    chart
      .on('mouseover', (e, j) => {
        tip.setTipData(j);
        tip.setShowTip(true);
      })
      .on('mousemove', (e) => {
        d3.select('#tooltip').style('left', `${e.pageX}px`).style('top', '300px');
      })
      .on('mouseout', () => {
        tip.setShowTip(false);
      });
  });
};

export default drawChart;
