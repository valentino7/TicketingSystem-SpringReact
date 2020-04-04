import React from 'react';
import TicketList from "../../views/TicketManagement/TicketList/TicketList";
import {bindActionCreators} from "redux";
import { connect } from 'react-redux';
import { ticketActions } from "../../_actions";

import '../../assets/css/loading-animation.css';
import {
  RESULTS_PER_PAGE_TICKETLIST,
  URL_GET_ALL_TARGETS,
  URL_TOTALPAGES_TICKETS_CATEGORY
} from "../../_constants/configurationConstants";
import {URL_TOTALPAGES_TICKETS,URL_TOTALPAGES_TICKETS_TARGET} from "../../_constants";
import {ticketService} from "../../_services/ticketService";

class TicketListContainer extends React.Component {
    constructor(props) {
        super(props);

      const params = new URLSearchParams(this.props.location.search);
      this.state = {
            currentPage: 1,
            numPages: 0,
            numTargetPaget: 0,
            numCategoryPages : 0,
            allTargets: [],
            selectedTarget :'',
            categoryTarget: params.get('target'),
            category :params.get('category'),
            mod: 0// 0 all , 1 target , 2 category
        };


      //console.log("target",this.state.allTargets);

        /* Binding */
        this.readTicketsPage = this.readTicketsPage.bind(this);
        this.selectPage = this.selectPage.bind(this);
        this.readTicketsTargetPage=this.readTicketsTargetPage.bind(this);
        this.search = this.search.bind(this);
        this.getTotalTicketPage= this.getTotalTicketPage.bind(this);
        this.getTotalTicketTargetPage=this.getTotalTicketTargetPage.bind(this);
        this.getAllTarget=this.getAllTarget.bind(this);
        this.findTargetId=this.findTargetId.bind(this);


    }



    getTotalTicketPage(){
      fetch(URL_TOTALPAGES_TICKETS + '10', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response) => response.text())
        .then(res => {
          this.setState({numPages: res });
        });
    }
  getTotalTicketTargetPage(target){
    fetch(URL_TOTALPAGES_TICKETS_TARGET + target +'/10', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.text())
      .then(res => {
        this.setState({numTargetPaget: res });
      });
  }

    readTicketsPage(cPage) {
        this.setState({currentPage: cPage});
        let page = cPage - 1;

      this.getAllTarget();
        this.getTotalTicketPage();

        if (!this.props.ticketsPages[page % 5] || !this.props.ticketsPages[page % 5].isValid || parseInt(this.props.ticketsPages[page % 5].page) !== parseInt(cPage))
            this.props.actions.getPage(page);

    }

    readTicketsTargetPage(cPage,target) {
        this.setState({currentPage: cPage});
      let page = cPage - 1;


      this.getTotalTicketTargetPage(target);

      if (!this.props.ticketsTarget[page % 5] || !this.props.ticketsTarget[page % 5].isValid || parseInt(this.props.ticketsTarget[page % 5].page) !== parseInt(cPage) || this.props.ticketsTarget[page % 5].target !== this.state.selectedTarget ) {
          this.props.actions.getPageTarget(page, target);
      }

    }

  readTicketsCategoryPage(cPage,target,category) {
    this.setState({currentPage: cPage});
    let page = cPage - 1;

  }

    selectPage(page) {

      if (this.state.mod === 0){
        this.setState({
          currentPage: page
        });
        this.readTicketsPage(page);
      } else if ( this.state.mod === 1 ){
        this.setState({
          currentPage: page
        });
        this.readTicketsTargetPage(page,this.state.selectedTarget)
      }

    }


    selectLastPage() {
      if (this.state.mod === 0){
        this.setState({
          currentPage: this.state.numPages
        });
      } else if ( this.state.mod === 1 ){
        this.setState({
          currentPage: this.state.numTargetPaget
        });
      }

    }

    findTargetId(target){
//this.props.actions.invalidateTicketsCache();
      this.state.allTargets.map( t =>{
        console.log("t", t);
        if ( t.name === target){
          console.log("trovato", t);
          this.state.selectedTarget= t.id;
          return;
        }
      });
    }

    search(modality,target,category){
        //this.props.actions.invalidateTicketsCache();
      this.setState({ mod : modality});



      if (modality === 0){
        this.readTicketsPage(1);
      } else if ( modality === 1 ){

        //console.log("target", target);
       this.findTargetId(target);
        //console.log("selectedTarget", target);
        //console.log("selectedTarget", this.state.selectedTarget);
        this.readTicketsTargetPage(1,this.state.selectedTarget)
      }

    }

    getAllTarget(){
      fetch(URL_GET_ALL_TARGETS, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json())
        .then(res => {
          this.setState({allTargets: res });
        });

    }

    componentWillMount() {

        this.readTicketsPage(1); // Read users list
    }

    render() {
        //console.log(this.props.ticketsPages[0]);
        //let page = (this.state.currentPage === 1) ? 0 : 1;
        let page = this.state.currentPage-1;

        let ticketList;
        if ( this.state.mod === 0) {
          ticketList =(this.props.ticketsPages &&
            this.props.ticketsPages[page % 5]) ?
            <TicketList mod={0}
                        search={this.search}
                        tickets={this.props.ticketsPages[page % 5].tickets}
                        selectPage={this.selectPage} currentPage={this.state.currentPage}
                        numPages={this.state.numPages} /> : <div />
        } else if (this.state.mod === 1 ) {
          ticketList = (this.props.ticketsTarget && this.props.ticketsTarget[page % 5]) ?
            <TicketList mod={1} search={this.search} tickets={this.props.ticketsTarget[page % 5].tickets}
                        selectPage={this.selectPage} currentPage={this.state.currentPage}
                        numPages={this.state.numTargetPaget}/> : <div/>
        }


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
        ticketsPages: state.tickets.ticketsPages,
        ticketsTarget : state.tickets.ticketsTarget,
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
)(TicketListContainer);
