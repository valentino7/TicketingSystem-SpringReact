import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Container,Col } from 'reactstrap';

import {
  AppBreadcrumb,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';

import BackgroundImage from 'react-background-image-loader';
import bg from '../../assets/img/sfondo.png';
// routes config
import routes from '../../routes';
import DefaultHeader from './DefaultHeader';

import '../../assets/css/loading-animation.css';

import Cluster from "../../views/Cluster/Cluster/Cluster";
import { connect } from "react-redux";

class DefaultLayout extends Component {


  constructor(props) {
    super(props);


    this.state = {
      change: false
    };

  }
  componentWillReceiveProps(nextProps) {
   // console.log( this.props.location);
    //console.log(nextProps.location);
    if(nextProps.location.pathname === "/target/ListTarget/Cluster" && this.props.location.pathname === "/target/ListTarget")
      this.setState({ change : true})
  }

  render() {
    return (
      <BackgroundImage placeholder={bg} >
      {this.props.isLoading ? <div className="loading" /> : null}

      <div className="app">
        <AppHeader fixed>
          <DefaultHeader logout={this.props.logout}/>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={navigation} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                    return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (

                        (route.name === "Cluster" && this.state.change===true) ?
                          <Cluster {...props}/>

                         :
                          (route.name !== "Cluster" ) ?
                            <route.component {...props} />
                            : null

                        )} />)
                      : (null);
                  },
                )}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Container>
          </main>
        </div>
      </div>
      </BackgroundImage>
    );
  }
}


function mapStateToProps(state) {
  return {
    isLoading: state.loading.isFetching
  };
}

export default connect(mapStateToProps)(DefaultLayout);
//export default DefaultLayout;
