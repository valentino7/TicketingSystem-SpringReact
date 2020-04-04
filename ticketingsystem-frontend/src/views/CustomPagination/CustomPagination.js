import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import {DEBUG_CUSTOMPAGINATION_LIFECYCLE} from "../../_constants/debugConstants";


class CustomPagination extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();

    let currentPage;
    if (event.target.id === 'first') {
      currentPage = 1;
      this.props.selectPage(currentPage);
    } else if (event.target.id === 'last') {
      currentPage = this.props.numPages;
      this.props.selectPage(currentPage);
    } else if (event.target.id === 'prev') {
      currentPage = Math.max(parseInt(this.props.currentPage - 1), 1);
      this.props.selectPage(currentPage);
    } else if (event.target.id === 'next') {
      currentPage = Math.min(parseInt(this.props.currentPage + 1), this.props.numPages);
      this.props.selectPage(currentPage);
    } else {
      currentPage = event.target.id;
      this.props.selectPage(currentPage);
    }
  }

  componentWillMount() {
    if (DEBUG_CUSTOMPAGINATION_LIFECYCLE)
      alert("CustomPagination will mount");
  }

  componentDidMount() {
    if (DEBUG_CUSTOMPAGINATION_LIFECYCLE)
      alert("CustomPagination did mount");
  }

  componentWillUpdate(nextProps) {
    if (DEBUG_CUSTOMPAGINATION_LIFECYCLE)
      alert("CustomPagination will update");
  }

  componentDidUpdate() {
    if (DEBUG_CUSTOMPAGINATION_LIFECYCLE)
      alert("CustomPagination did update");
  }

  componentWillUnmount() {
    if (DEBUG_CUSTOMPAGINATION_LIFECYCLE)
      alert("CustomPagination will unmount");
  }

  render() {
    if (DEBUG_CUSTOMPAGINATION_LIFECYCLE)
      alert("CustomPagination will render");

    const numPages = parseInt(this.props.numPages);
    const currentPage = parseInt(this.props.currentPage);
    let paginationItems = [];
    let cutFirst = false;
    let cutLast = false;
    for (let i = 1; i <= numPages; i++) {
      if (i <= currentPage - 3) {
        if (!cutFirst) {
            paginationItems.push(
                <b style={{color: '#20a8d8', marginLeft: "5px", marginRight: "5px", fontSize: '20px'}}>...</b>
            );
            cutFirst = true;
        }
      } else if (i >= currentPage + 3) {
        if (!cutLast) {
          paginationItems.push(
              <b style={{color: '#20a8d8', marginLeft: "5px", marginRight: "5px", fontSize: '20px'}}>...</b>
          );
          cutLast = true;
        }
      } else {
          paginationItems.push(
              <PaginationItem key={i} active={currentPage === i}>
                  <PaginationLink onClick={this.handleClick} id={i}>
                      {i}
                  </PaginationLink>
              </PaginationItem>
          );
      }
    }

    //alert(this.props.currentPage);
    return(
      <Pagination aria-label="Page navigation example">
        <PaginationItem disabled={parseInt(this.props.currentPage) === 1}>
            <PaginationLink onClick={this.handleClick} id={'first'}>
                {"|<"}
            </PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={parseInt(this.props.currentPage) === 1}>
          <PaginationLink onClick={this.handleClick} id={'prev'}>
            {"<"}
          </PaginationLink>
        </PaginationItem>
          {paginationItems}
        <PaginationItem disabled={parseInt(this.props.currentPage) === parseInt(this.props.numPages)}>
          <PaginationLink onClick={this.handleClick} id={'next'}>
            {">"}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={parseInt(this.props.currentPage) === parseInt(this.props.numPages)}>
            <PaginationLink onClick={this.handleClick} id={'last'}>
                {">|"}
            </PaginationLink>
        </PaginationItem>
      </Pagination>
    );
  }

}

export default CustomPagination;
