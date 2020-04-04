import React, {Component} from 'react';
import {somethingElse} from 'underscore';
import 'url-search-params-polyfill';
import * as d3 from 'd3';
import { json } from './miserable';

import { Card, CardBody } from 'reactstrap';


class Cluster extends Component {

  constructor(props) {
    super(props);
    this.createGraph = this.createGraph.bind(this);
  }


  dragstarted = (d) => {
    //alert("drag starded");
    if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  };

  dragged = (d) => {
    //alert("dragged");
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  };


  dragended = (d) => {
    //alert("dragended");
    if (!d3.event.active)
      this.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  };

  componentDidMount() {
    this.createGraph();
  }

  componentDidUpdate() {
    this.createGraph();
  }

  createGraph() {
    const svgRef = this.svgRef;

    this.width = 600;
    this.height = 600;

    this.svg = d3.select(svgRef)
      .attr("width", this.width)
      .attr("height", this.height);

    this.simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function (d) {
        return d.id;
      }))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(this.width / 2, this.height / 2));



    let link = this.svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(json.links)
      .enter().append("line");

    let node = this.svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(json.nodes)
      .enter().append("circle")
      .attr("r", 10.5)
      .attr("stroke", "black")  // colore bordo
      .attr("stroke-width", 2)   // spessore bordo
      .attr("fill", "red")  // colore dell'oggetto
      .call(d3.drag()
        .on("start", this.dragstarted)
        .on("drag", this.dragged)
        .on("end", this.dragended));

    node.append("title")
      .text(function (d) {
        return d.id;
      });

    this.simulation
      .nodes(json.nodes)
      .on("tick", ticked);

    this.simulation.force("link")
      .links(json.links);

    function ticked() {
      link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });


      node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
    }

  }


  render() {

    return (
      <Card>
        <CardBody>
          <div><svg ref={svgRef => this.svgRef = svgRef} /></div>
        </CardBody>
      </Card>
    );
  }
}
export default Cluster;
