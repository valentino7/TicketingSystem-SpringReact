export default {
  items: [
    {
      name: 'Home',
      url: '/dashboard',
      icon: 'fa fa-paper-plane-o',
    },
    {
      name: 'Ticket',
      url: '/ticket',
      icon: 'fa fa-ticket',
      children: [
        {
          name: 'Create new ticket',
          url: '/ticket/create',
          icon: 'fa fa-ticket',
        },
        {
          name: 'Show tickets',
          url: '/tickets',
          icon: 'fa fa-ticket',
        }],
    },
    {
      name: 'Target',
      url: '/target',
      icon: 'fa fa-bullseye',
      children: [
        {
          name: 'Create target',
          url: '/target/CreateTarget',
          icon: 'fa fa-bullseye',
        },
        {
          name: 'Visualize targets',
          url: '/target/ListTarget',
          icon: 'fa fa-bullseye',
        },
      ]
    },
    {
      name: 'Users',
      url: '/users',
      icon: 'icon-user',
    },
    {
      name: 'Teams',
      url: '/teams',
      icon: 'fa fa-group',
    },
    {
      name: 'Machine Learning',
      url: '/machine-learning',
      icon: 'fa fa-cubes',
      children: [
        {
          name: 'Preparation',
          url: '/machine-learning/preparation',
          icon: 'fa fa-cubes',
        },
        {
          name: 'Clustering',
          url: '/machine-learning/clustering',
          icon: 'fa fa-cubes',
        }
      ]
    },
    {
      name: 'Configuration',
      url: '/configuration',
      icon: 'icon-settings',
      children: [
        {
          name: 'Additional Fields',
          url: '/Typology',
          icon: 'icon-settings',
        },
        {
          name: 'Read Configuration',
          url: '/read-configuration',
          icon: 'fa fa-search',
        },
      ]
    },
    {
      divider: true,
    },
  ],
};
