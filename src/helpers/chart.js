import * as d3 from 'd3';

const drawChart = (display, margin, element, data) => {
  const svg = d3
    .select(element)
    .append('svg')
    .attr('width', display.width - 100)
    .attr('height', display.height - 100)
    .attr('viewBox', [0, 0, display.width, display.height]);

  const x = d3
    .scaleBand()
    .domain(d3.range(data.length))
    .range([margin, display.width - margin])
    .padding(0.1);

  const y = d3
    .scaleLinear()
    .domain([d3.min(data, (d) => d.count), d3.max(data, (d) => d.count)])
    .range([display.height - margin, margin]);

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
    .attr('transform', `translate(0,${display.height - margin})`)
    .call(d3.axisBottom(x))
    .append('text')
    .attr('class', 'label')
    .text('Weeks');

  svg
    .append('g')
    .attr('transform', `translate(${margin}, 0)`)
    .call(d3.axisLeft(y).tickFormat((d) => d / 1e6 + ' M'));
};

export default drawChart;
