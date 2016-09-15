export default {

  inbox: {
    initialRoute: true,

    title: 'Tasks',
    component: require('./scenes/Inbox').default,

  },

  calendar: {
    title: 'Calendar',
    component: require('./scenes/CalendarView').default
  },

  projects: {
    title: 'Projects',
    component: require('./scenes/Projects').default
  },

  labels: {
    title: 'Labels',
    component: require('./scenes/Labels').default
  },

  themes: {
    title: 'Change Theme',
    component: require('./scenes/Themes').default
  },

  settings: {
    title: 'Settings',
    component: require('./scenes/Settings').default,

    children: {
      accounts: {
        component: require('./scenes/Accounts').default
      }
    }
  }

}