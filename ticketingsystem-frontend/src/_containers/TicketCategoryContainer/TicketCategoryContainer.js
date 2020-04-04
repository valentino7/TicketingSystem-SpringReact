import React from 'react';
import TicketList from "../../views/TicketManagement/TicketList/TicketList";
import {bindActionCreators} from "redux";
import { connect } from 'react-redux';
import { ticketActions } from "../../_actions/index";

import '../../assets/css/loading-animation.css';
import {
  RESULTS_PER_PAGE_TICKETLIST,
  URL_GET_ALL_TARGETS,
  URL_TOTALPAGES_TICKETS_CATEGORY
} from "../../_constants/configurationConstants";
import {URL_TOTALPAGES_TICKETS,URL_TOTALPAGES_TICKETS_TARGET} from "../../_constants";
import {ticketService} from "../../_services/ticketService";

class TicketCategoryContainer extends React.Component {
  constructor(props) {
    super(props);

    const params = new URLSearchParams(this.props.location.search);
    this.state = {
      currentPage: 1,
      numCategoryPages : 0,
      selectedTarget : params.get('target'),
      category :params.get('category'),
    };

    console.log("target",this.state.selectedTarget);
    console.log("category",this.state.category);

    this.selectPage = this.selectPage.bind(this);
    this.search = this.search.bind(this);
    this.getTotalTicketCategoryPage=this.getTotalTicketCategoryPage.bind(this);


  }

  getTotalTicketCategoryPage(target, category){
    fetch(URL_TOTALPAGES_TICKETS_CATEGORY + target +"/" + category +'/10', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.text())
      .then(res => {
        this.setState({numCategoryPages: res });
      });
  }

  readTicketsCategoryPage(cPage,target,category) {
    this.setState({currentPage: cPage});
    let page = cPage - 1;


    this.getTotalTicketCategoryPage(target,category);

    if (!this.props.ticketsCategory[page % 5] || !this.props.ticketsCategory[page % 5].isValid || parseInt(this.props.ticketsCategory[page % 5].page) !== parseInt(cPage) || this.props.ticketsCategory[page % 5].target !== this.state.selectedTarget ) {
      this.props.actions.getPageCategory(page, target,category);
    }

  }

  selectPage(page) {

      this.setState({
        currentPage: page
      });

  }


  selectLastPage() {

      this.setState({
        currentPage: this.state.numCategoryPages
      });

  }

  search(modality,target,category){
    //this.props.actions.invalidateTicketsCache();

      this.readTicketsCategoryPage(1,target,category);


  }

  componentWillMount() {

    this.search(1,this.state.selectedTarget,this.state.category); // Read users list
  }

  render() {
    //console.log(this.props.ticketsPages[0]);
    //let page = (this.state.currentPage === 1) ? 0 : 1;
    let page = this.state.currentPage-1;


    let ticketList =(this.props.ticketsCategory && this.props.ticketsCategory[page % 5]) ? <TicketList mod={2} search={this.search} tickets={this.props.ticketsCategory[page % 5].tickets} selectPage={this.selectPage} currentPage={this.state.currentPage} numPages={this.state.numCategoryPages} /> : <div />



    return(
      <React.Fragment>
        {ticketList}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  //console.log(state.tickets);
  return {
    ticketsCategory:  state.tickets.ticketsCategory,
    isValid: state.tickets.isValid,
    isLoading: state.tickets.isFetching
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(ticketActions, dispatch) }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketCategoryContainer);
