import React, {Component} from 'react';
import {somethingElse} from 'underscore';
import 'url-search-params-polyfill';
import * as d3 from 'd3';
import { json } from './miserable';
import {
  Button,
  Card,
  CardFooter,
  Table,
  Row,
  CardHeader,
  Col,
  CardBody,
  Form,
} from 'reactstrap';

import '../../../assets/css/tooltip-style.css';
import {URL_GET_LINKS_STATISTICS} from '../../../_constants/configurationConstants';


class Cluster extends Component {

  constructor(props) {
    super(props);

      /* EXAMPLES
        let json = [];
        json[0] = {
            purity: 0,
            mutual_information: 1,
            cluster_entropy: 2,
            class_entropy: 3,
            date: 4
        };
        json[1] = {
            name_target:[],
            links:{
                source:
                target:
                distance:
            }
        }
        /* END EXAMPLES */



      /* EXAMPLES
      let clusterStats = [];
      clusterStats[0] = {
          purity: 0,
          mutual_information: 1,
          cluster_entropy: 2,
          class_entropy: 3,
          date: 4
      };
      clusterStats[1] = {
          purity: 5,
          mutual_information: 6,
          cluster_entropy: 7,
          class_entropy: 8,
          date: 9
      };
      /* END EXAMPLES */

    const params = new URLSearchParams(this.props.location.search);
    //alert(params.get('param'));
    this.state={
      targetId: params.get('param'),
      hiddenStatistics: false,
      hiddenCategories: false,
      clusterStats: '',
      json: {},
      isJsonValid: false
    };

    this.createGraph = this.createGraph.bind(this);
    this.hiddenCat = this.hiddenCat.bind(this);
    this.hiddenStat = this.hiddenStat.bind(this);
    this.getLinksAndStatistics = this.getLinksAndStatistics.bind(this);

    this.onClick = this.onClick.bind(this);
    /* TEST */
    //this.state.json = jsonExample;

  }

  hiddenStat(){
    this.setState({hiddenStatistics: !this.state.hiddenStatistics});
    if(this.state.hiddenStatistics)
      document.getElementById("card-stat").style.display = "block";
    else
      document.getElementById("card-stat").style.display = "none";
  }

  hiddenCat(){
    this.setState({hiddenCategories: !this.state.hiddenCategories});
    if(this.state.hiddenCategories)
      document.getElementById("card-cat").style.display = "block";
    else
      document.getElementById("card-cat").style.display = "none";
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

  mouseover = (div) => {
    return (d) => {
      div.transition()
          .duration(200)
          .style("opacity", 1);

      div.html("Numero documenti all'interno")
          .style("left", ( d3.mouse(d3.select(".svg").node())[0] + 20) + "px")
          .style("top", ( d3.mouse(d3.select(".svg").node())[1] - 30) + "px")
    }
  };

  mousemove = (div) => {
    return (d) => {
      div
          .style("left", ( d3.mouse(d3.select(".svg").node())[0] + 20) + "px")
          .style("top", ( d3.mouse(d3.select(".svg").node())[1] - 30) + "px")
    }
  };

  mouseout = (div) => {
    return () => {
      div.transition()
        .duration(500)
        .style("opacity", 0);
    }
  };

  getLinksAndStatistics(){
    fetch(URL_GET_LINKS_STATISTICS + this.state.targetId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then(res => {
        console.log(URL_GET_LINKS_STATISTICS + this.state.targetId);
        console.log("res", res);
        console.log("links", res.links)
        this.setState({json: res.links });
        this.setState({clusterStats: res.statistic });
        this.setState({isJsonValid: true});
      });
  }


  componentDidMount() {
    this.getLinksAndStatistics();
    if (this.state.json && this.state.isJsonValid) {
      console.log("JSON", this.state.json);
      this.createGraph();
      window.addEventListener("resize", this.createGraph);
    }
  }

  componentDidUpdate() {
   // this.getLinksAndStatistics();
    if (this.state.json && this.state.isJsonValid) {
        //alert("will update");
        console.log("JSON", this.state.json);
        this.createGraph();
    }
  }

    onClick(d, i) {
      window.location.href = 'http://35.238.15.22:3000/#/ListCategory?target='+this.state.targetId+"&category="+d.name;
    }

  createGraph() {

      console.log(this.state.json.link);
      console.log(this.state.json.name);

      const svgRef = this.svgRef;

      let aspect = 4/3;
      this.width = document.getElementById("svg-div").getBoundingClientRect().width;
      this.height = this.width / aspect;

      this.svg = d3.select(svgRef)
          .attr("width", this.width)
          .attr("height", this.height);

      this.svg.selectAll("*").remove();
      this.svg.selectAll("*").remove();

    this.simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function (d) {
        return d.name;
      }).distance(function (d) {
          //let distance = 0;
          return d.value;
      }))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(this.width / 2, this.height / 2));

    //div(.svg-container)-> div(per tooltip)->
    // svg-> glinks-> line
    //svg-> gnodes-> g-> nodes
    //alert(this.state.json.link);


    let link = this.svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(this.state.json.link)
      .enter().append("line");

    let div = d3.select(".svg-container").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);


    let nodeContainer = this.svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(this.state.json.name)
      .enter().append("g"); //crea un "g" element per ogni element nell array


   // alert(this.state.targetId);
    let node = nodeContainer.append("circle")
      .attr("r", 34)
      .on('click', this.onClick)
      .style("cursor", "pointer")
      .attr("stroke", "black")  // colore bordo
      .attr("stroke-width", 2)   // spessore bordo
      .attr("fill", d3.rgb(106,174,214))  // colore dell'oggetto
      .attr("opacity",0.9)
      .call(d3.drag()
        .on("start", this.dragstarted)
        .on("drag", this.dragged)
        .on("end", this.dragended))
      //.on("mouseover", this.mouseover(div))
      //.on("mousemove", this.mouseover(div))
      //.on("mouseout", this.mouseout(div));

    let nodeText = nodeContainer.append("text")
        .html(function(d) {
            return d.name;
        })
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold");



    this.simulation
      .nodes(this.state.json.name)
      .on("tick", ticked);

    this.simulation.force("link")
      .links(this.state.json.link);

    function ticked() {
      link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

      node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

      nodeText
        .attr("dx", function(d) { return d.x; })
        .attr("dy", function(d) { return d.y; });
    }

  }




  render() {
    let tableHeader, tableRows;
    if (!this.state.clusterStats) {
      tableHeader = null;
      tableRows = null;
    } else {
        tableHeader = Object.keys(this.state.clusterStats).map(field =>
            (field !== 'target_reference' && field !== 'id') ? <th key={field} style={{"textAlign": "center"}}>{field}</th> : null
        );

        /*
        tableRows = this.state.clusterStats.map(stat =>
            <tr>
                {
                    Object.keys(stat).map(key =>
                        <td style={{"textAlign": "center"}} key={key}>{stat[key]}</td>
                    )
                }
            </tr>
        );
        */

        tableRows =
        <tr>
            {
                Object.keys(this.state.clusterStats).map(key =>
                    (key !== 'target_reference' && key !== 'id') ? <td style={{"textAlign": "center"}} key={key}>{this.state.clusterStats[key]}</td> : null
                )
            }
        </tr>

    }

    return (
      <React.Fragment>
        <Row>
          <Col md="8" >
            <Card>
               <CardHeader> <i className="fa fa-align-justify" onClick={this.hiddenStat} style={{cursor:"pointer"}}/>
                <strong>Statistics</strong>
              </CardHeader>
              <Card id="card-stat" style={{display: 'block'}}>
                <Table style={{tableLayout:"fixed"}} responsive striped size="sm">
                  <thead bgcolor="#ADD8E6">
                    <tr>
                        {tableHeader}
                    </tr>

                  </thead>

                  <tbody>
                    {tableRows}
                  </tbody>
                </Table>
              </Card>
            </Card>
          </Col>
        </Row>

        <Row  style={{display: 'flex', justifyContent: 'left' }}>
            <Col md="8"  >
              <Card>
                <CardHeader> <i className="fa fa-align-justify" onClick={this.hiddenCat} style={{cursor:"pointer"}}/>
                  <strong>Categories</strong>
                </CardHeader>
                  <Card id="card-cat" style={{display: 'block'}}>
                    <CardBody id="card-body">
                      <div id="svg-div" className="svg-container"><svg className="svg" ref={svgRef => this.svgRef = svgRef} /></div>
                    </CardBody>
                  </Card>
              </Card>
            </Col>
        </Row>

      </React.Fragment>
    );
  }
}
export default Cluster;
