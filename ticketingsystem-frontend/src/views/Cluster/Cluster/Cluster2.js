import React, { Component} from 'react';
import { somethingElse } from 'underscore';
import _ from 'lodash';
import * as d3 from "d3";
import PropTypes from 'prop-types';
import 'url-search-params-polyfill';

import {
  Button, Card, CardBody, CardHeader,  Form,  CardFooter,

} from 'reactstrap';

const useLabels=1;
const rawdata = _.map(_.range(3), () => {
  return {
    v: _.random(10, 100)
  };
});
console.log(rawdata);
const rawdata1 = [32, 57, 77, 40];
console.log(rawdata1);

class Cluster extends Component {


  static propTypes = {
    data: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number,
    useLabels: PropTypes.bool
  };

  static defaultProps = {
    data: [],
    useLabels: false,
    width: '100%',
    height: '500px'
  };


  constructor(props) {
    super(props);

    this.minValue = 1;
    this.maxValue = 100;
    this.mounted = false;



    this.state = {
      data: []
    };

    const params = new URLSearchParams(this.props.location.search);
    const param = params.get('param');

    this.radiusScale = this.radiusScale.bind(this);
    this.simulatePositions = this.simulatePositions.bind(this);
    this.renderBubbles = this.renderBubbles.bind(this);
  }


  componentWillMount() {
    this.mounted = true;
  }

  componentDidMount() {
    if (rawdata.length > 0) {
      this.minValue =
        0.95 *
        d3.min(rawdata, item => {
          return item.v;
        });

      this.maxValue =
        1.05 *
        d3.max(rawdata, item => {
          return item.v;
        });

      this.simulatePositions(rawdata);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  radiusScale = value => {
    const fx = d3
      .scaleSqrt()
      .range([1, 70])
      .domain([this.minValue, this.maxValue]);

    return fx(value);
  };


  simulatePositions = data => {
    this.simulation = d3
      .forceSimulation()
      .nodes(data)
      .velocityDecay(0.8)
      //.force("x", d3.forceX().strength(0.1))
      //.force("y", d3.forceY().strength(0.05))
      .force("link", d3.forceLink().id(function(d) { return d.id; }))
      .force("charge", d3.forceManyBody().strength((d, i)=> {
        let a = i;
        a===0 ? a=-300 : a=-100+d.v;
        console.log(a+d);
        return a;
      }))
      .on("tick", () => {
        if (this.mounted) {
          this.setState({ data });
        }
      });
  };

  renderBubbles = data => {
    const minValue =
      0.95 *
      d3.min(data, item => {
        return item.v;
      });

    const maxValue =
      1.05 *
      d3.max(data, item => {
        return item.v;
      });

    const color = d3
      .scaleLinear()
      .domain([minValue, maxValue])
      .interpolate(d3.interpolateHcl)
      .range(["#eb001b", "#f79e1b"]);


    // render simple circle element
    if (!useLabels) {
      const circles = _.map(data, (item, index) => {
        return (

          <circle
            key={index}
            r={this.radiusScale(item.v)}
            cx={100+item.v}
            cy={100+item.v}
            fill={color(item.v)}
            stroke={d3.rgb(color(item.v)).brighter(2)}
            strokeWidth="2"
          />
        );
      });

      return (
        <g
          transform={`translate(${this.props.width / 2}, ${this.props
            .height / 2})`}
        >

        </g>
      );
    }

    function test(){
      alert("yyyy")
    }
    // render circle and text elements inside a group
    const texts = _.map(data, (item, index) => {
      const props = this.props;
      var style = {
        transform: "translate(50%,50%)"
      };

      const fontSize = this.radiusScale(item.v) / 2;
      return (

        <g
          key={index}
          //centrare il cluster sullo schermo
          style={style}
        >
          <circle
            onClick={test}
            r={this.radiusScale(item.v)}
            fill={color(item.v)}
            style={{"cursor":"pointer"}}
            cx={item.x}
            cy={item.y}
            stroke={d3.rgb(color(item.v)).brighter(2)}
            strokeWidth="2"
          />
          <text
            dy={item.y}
            dx={item.x}
            fill="#fff"
            text-anchor="middle"
            fontSize={`${fontSize}px`}
            fontWeight="bold"
          >
            {item.v}
          </text>
        </g>
      );
    });

    return texts;
  };

  render() {
    return(
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"/><strong>Cluster</strong>
          </CardHeader>
          <CardBody>
            <svg width={this.props.width} height={this.props.height}>
              {this.renderBubbles(rawdata)}
            </svg>

          </CardBody>
        </Card>


      </div>




    );
  }
}
export default Cluster;


