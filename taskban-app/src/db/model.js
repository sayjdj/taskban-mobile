'use strict';

import Realm from 'realm';

class Profile extends Realm.Object {
}
Profile.schema = {
  name: 'Profile',
  properties: {
    projects: {type: 'list', objectType: 'Project'}
  }
};

class Project extends Realm.Object {
}
Project.schema = {
  name: 'Project',
  properties: {
    name: 'string',
    boards: {type: 'list', objectType: 'Board'}
  }
};

class Board extends Realm.Object {
}
Board.schema = {
  name: 'Board',
  properties: {
    name: 'string',
    tasks: {type: 'list', objectType: 'Task'}
  }
};

class Task extends Realm.Object {
}
Task.schema = {
  name: 'Task',
  properties: {
    done: {type: 'bool', default: false},
    text: 'string',
    subTasks: {type: 'list', objectType: 'Task'},
    createdDate: {'date'},
    dueDate: {'date'},
    alerts: {type: 'list', objectType: 'Alert'}
  }
};

class Tag extends Realm.Object {
}
Tag.schema = {
  name: 'Tag',
  properties: {
    name: 'string',
    icon: 'string',
    color: 'string'
  }
};

class Calendar extends Realm.Object {
}
Calendar.schema = {
  name: 'Calendar',
  properties: {
    year: 'int',
    month: 'int',
    days: {type: 'list', objectType: 'int'},
    isLeapYear: 'bool',

  }
};



