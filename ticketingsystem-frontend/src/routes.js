import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div className="loading">Loading&#8230;</div>
  //return <div>Loading...</div>;
}



const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});

const Cluster = Loadable({
  loader: () => import('./views/Cluster/Cluster'),
  loading: Loading,
});

const TeamList = Loadable({
  loader: () => import('./views/TeamManagement/TeamList'),
  loading: Loading,
});

const CreateTicket = Loadable({
  loader: () => import('./_containers/CreateTicketContainer/CreateTicketContainer'),
  loading: Loading,
});

const CreateTarget = Loadable({
  loader: () => import('./views/Target/ControlCreateTarget'),
  loading: Loading,
});

const Targets = Loadable({
  loader: () => import('./views/Target/ListTarget'),
  loading: Loading,
});

const Typology = Loadable({
  loader: () => import('./views/Administrator/Typologies'),
  loading: Loading,
});

const ReadConfiguration = Loadable({
  loader: () => import('./views/Administrator/ReadConfiguration'),
  loading: Loading,
});

const Clustering = Loadable({
  loader: () => import('./views/MachineLearning/Clustering/Clustering'),
  loading: Loading
});

const Preparation = Loadable({
  loader: () => import('./views/MachineLearning/Preparation/Preparation'),
  loading: Loading
});

const EditProfileContainer = Loadable({
  loader: () => import('./_containers/EditProfileContainer/EditProfileContainer'),
  loading: Loading,
});

const UserListContainer = Loadable({
  loader: () => import('./_containers/UserListContainer/UserListContainer'),
  loading: Loading,
});

const TicketListContainer = Loadable({
  loader: () => import('./_containers/TicketListContainer/TicketListContainer'),
  loading: Loading,
});

const TicketCategoryContainer = Loadable({
  loader: () => import('./_containers/TicketCategoryContainer/TicketCategoryContainer'),
  loading: Loading,
});

const TeamListContainer = Loadable({
  loader: () => import('./_containers/TeamListContainer/TeamListContainer'),
  loading: Loading,
});


const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/ticket', exact: true, name: 'Ticket', component: CreateTicket },
  { path: '/target/ListTarget/Cluster', exact: true,name: 'Cluster', component: Cluster },
  { path: '/ticket/create', name: 'TicketCustomer', component: CreateTicket },
  { path: '/users', name: 'UserList', component: UserListContainer },
  { path: '/teams', name: 'TeamList', component: TeamListContainer },
  { path: '/target/CreateTarget', name: 'Create target', component: CreateTarget },
  { path: '/target/ListTarget', ecxactname: 'Visualize targets', component: Targets },
  { path: '/Typology', name: 'typology', component: Typology },
  { path: '/read-configuration', name: 'ReadConfiguration', component: ReadConfiguration },
  { path: '/editprofile', name: 'Edit Profile', component: EditProfileContainer },
  { path: '/tickets', name: 'Tickets', component: TicketListContainer },
  { path: '/ListCategory', name: 'TicketsCategory', component: TicketCategoryContainer },
  { path: '/machine-learning/clustering', name: 'Clustering', component: Clustering},
  { path: '/machine-learning/preparation', name: 'Preparation', component: Preparation}
];

export default routes;
