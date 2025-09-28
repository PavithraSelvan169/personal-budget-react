import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Chart, registerables } from "chart.js";
import * as d3 from "d3";

Chart.register(...registerables);

function HomePage() {
  const [budgetData, setBudgetData] = useState([]);
  const chartRef = useRef(null); 
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/budget")
      .then((res) => {
        // debugger;
        const data = res.data.myBudget; 
        setBudgetData(data);

        // Chart.js pie
        createChart(data);

        // D3 chart
        createD3Chart(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const createChart = (data) => {
    if (!chartRef.current) return;

    const chartData = {
      datasets: [
        {
          data: data.map((item) => item.budget),
          backgroundColor: [
            "#ffcd56",
            "#ff6384",
            "#36a2eb",
            "#fd6b19",
            "#4bc0c0",
            "#9966ff",
            "#2ecc71",
            "#20b2aa",
            "#ff7f7f",
            "#c71585",
            "#d2691e",
          ],
        },
      ],
      labels: data.map((item) => item.title),
    };
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      
      chartInstanceRef.current = new Chart(ctx, {
        type: "pie",
        data: chartData,
      });
    }
  };

  const createD3Chart = (data) => {
    const svgContainer = d3.select("#d3-chart-container");

    // remove any previous svg to start a new svg drawing
    svgContainer.selectAll("*").remove();

    const svg = svgContainer
      .append("svg")
      .attr("width", 340)
      .attr("height", 340)
      .append("g");

    svg.append("g").attr("class", "slices");
    svg.append("g").attr("class", "labels");
    svg.append("g").attr("class", "lines");

    const width = 800,
      height = 400,
      radius = Math.min(width, height) / 2;

    const pie = d3
      .pie()
      .sort(null)
      .value((d) => d.value);

    const arc = d3
      .arc()
      .outerRadius(radius * 0.8)
      .innerRadius(radius * 0.4);

    const outerArc = d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    svg.attr("transform", `translate(${width / 2},${height / 2})`);

    const key = (d) => d.data.label;

    const color = d3
      .scaleOrdinal()
      .domain(data.map((item) => item.title))
      .range(["#98abc5", "#0c0c0fff", "#7b6888", "#6b486b"]);

    const formattedData = data.map((item) => ({
      label: item.title,
      value: item.budget,
    }));

    drawChart(svg, pie, arc, outerArc, color, key, radius, formattedData);
  };

  const drawChart = (svg, pie, arc, outerArc, color, key, radius, data) => {
    const slices = svg
      .select(".slices")
      .selectAll("path.slice")
      .data(pie(data), key);

    slices
      .enter()
      .append("path")
      .attr("class", "slice")
      .style("fill", (d) => color(d.data.label))
      .merge(slices)
      .transition()
      .duration(1000)
      .attrTween("d", function (d) {
        this._current = this._current || { ...d };
        const interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(1);
        return (t) => arc(interpolate(t));
      });

    slices.exit().remove();

    const texts = svg.select(".labels").selectAll("text").data(pie(data), key);

    texts
      .enter()
      .append("text")
      .attr("dy", ".35em")
      .text((d) => d.data.label)
      .merge(texts)
      .transition()
      .duration(1000)
      .attrTween("transform", function (d) {
        this._current = this._current || { ...d };
        const interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(1);

        const midAngle = (d) => d.startAngle + (d.endAngle - d.startAngle) / 2;

        return (t) => {
          const d2 = interpolate(t);
          const pos = outerArc.centroid(d2);
          pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
          return `translate(${pos})`;
        };
      })
      .styleTween("text-anchor", function (d) {
        this._current = this._current || { ...d };
        const interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(1);

        const midAngle = (d) => d.startAngle + (d.endAngle - d.startAngle) / 2;

        return (t) => {
          const d2 = interpolate(t);
          return midAngle(d2) < Math.PI ? "start" : "end";
        };
      });

    texts.exit().remove();

    const polylines = svg
      .select(".lines")
      .selectAll("polyline")
      .data(pie(data), key);

    polylines
      .enter()
      .append("polyline")
      .merge(polylines)
      .transition()
      .duration(1000)
      .attrTween("points", function (d) {
        this._current = this._current || { ...d };
        const interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(1);

        const midAngle = (d) => d.startAngle + (d.endAngle - d.startAngle) / 2;

        return (t) => {
          const d2 = interpolate(t);
          const pos = outerArc.centroid(d2);
          pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);

          const points = [arc.centroid(d2), outerArc.centroid(d2), pos]
            .map((p) => p.join(","))
            .join(" ");
          return points;
        };
      });

    polylines.exit().remove();
  };

  return (
    <main role="main" className="center" id="main">
      <div className="page-area">
        <article>
          <h2>Stay on track</h2>
          <p>
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </article>

        <article>
          <h2>Alerts</h2>
          <p>
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.
          </p>
        </article>

        <article>
          <h2>Results</h2>
          <p>
            People who stick to a financial plan, budgeting every expense, get
            out of debt faster! Also, they to live happier lives... since they
            expend without guilt or fear... because they know it is all good and
            accounted for.
          </p>
        </article>

        <article>
          <h2>Free</h2>
          <p>This app is free!!! And you are the only one holding your data!</p>
        </article>

        <article>
          <h2>Stay on track</h2>
          <p>
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </article>

        <article>
          <h2>Alerts</h2>
          <p>
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.
          </p>
        </article>

        <article>
          <h2>Results</h2>
          <p>
            People who stick to a financial plan, budgeting every expense, get
            out of debt faster! Also, they to live happier lives... since they
            expend without guilt or fear... because they know it is all good and
            accounted for.
          </p>
        </article>

        <article>
          <h2>Chart</h2>

          <figure>
            <canvas
              // id="myChart"
              ref={chartRef}
              width="800"
              height="800"
              aria-label="Personal Budget Chart"
            ></canvas>

            <figcaption className="chartcaption">
              A pie chart displaying budget categories and their allocations.
            </figcaption>
          </figure>
        </article>

        <article></article>
      </div>
      <div>
        <h2>D3 Chart</h2>
        <figure id="d3-chart-container" aria-label="Personal Budget D3 Chart">
          <figcaption className="chartcaption">D3 pie chart</figcaption>
        </figure>
      </div>
    </main>
  );
}

export default HomePage;
