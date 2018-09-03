let taskList = {
  tasks: [],
  addTask: function(taskText) {
    this.tasks.push({
      taskText: taskText,
      completed: false
    });
  },
  changeTask: function(position, taskText) {
    this.tasks[position].taskText = taskText;
  },
  deleteTask: function(position) {
    this.tasks.splice(position, 1);
  },
  toggleCompleted: function(position) {
    let task = this.tasks[position];
    task.completed = !task.completed;
  },
  toggleAll: function() {
    let totalTasks = this.tasks.length;
    let completedTasks = 0;
    
    // forEach instead of for loops    
    this.tasks.forEach( function(task) {
      if (task.completed === true) {
        completedTasks++;
      }
    } );
    // forEach instead of for loops
    this.tasks.forEach( function(task) {
    // ternary operator instead of using if else statement     
      task.completed = completedTasks === totalTasks ? false : true;
    } );
    
  }
};

let handlers = {
  addTask: function() {
    let addTaskTextInput = document.getElementById('addTaskTextInput');
    taskList.addTask(addTaskTextInput.value);
    addTaskTextInput.value = '';
    view.displayTasks();
  },
  changeTask: function() {
    let changeTaskPositionInput = document.getElementById('changeTaskPositionInput');
    let changeTaskTextInput = document.getElementById('changeTaskTextInput');
    taskList.changeTask(changeTaskPositionInput.valueAsNumber, changeTaskTextInput.value);
    changeTaskPositionInput.value = '';
    changeTaskTextInput.value = '';
    view.displayTasks();
  },
  deleteTask: function(position) {
    taskList.deleteTask(position);
    view.displayTasks();
  },
  toggleCompleted: function() {
    let toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    taskList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTasks();
  },
  toggleAll: function() {
    taskList.toggleAll();
    view.displayTasks();
  }  
};

let view = {
  displayTasks: function() {
    let tasksUl = document.querySelector('ul');
    tasksUl.innerHTML = '';
    
    /* forEach instead of for loops   
       instead of ES5 standard the ES6 can be used:
       here arrow function to correct the use of 'this' context */
    taskList.tasks.forEach( function(task, position) { // taskList.tasks.forEach((task, position) => {...
      let taskLi = document.createElement('li');
      let taskTextWithCompletion = '';
    // ternary operator instead of using if else statement 
      taskTextWithCompletion = task.completed === true ? '(x) ' + task.taskText : '( ) ' + task.taskText;
      taskLi.id = position;
      taskLi.textContent = taskTextWithCompletion;
      taskLi.appendChild(this.createDeleteButton());
      tasksUl.appendChild(taskLi);
    }, this );  // ...});    
    /* ES6: when arrow function used 'this' as an second parameter isn't needed
       as arrow function doesn't create its own 'this' context,
       ES5: callback function as first parameter inside forEach creates its own scope
       so the additional second parameter 'this' after callback is needed to make
       'this' from higher scope (view) accesible inside callback , so 'this' as 'view' object context
       so 'this.createDeleteButton()' is properly recognized,
       Other way to work around 'this' in ES5 is to declare variable e.g let that = this; 
       inside view.displaytasks method and use 'that' variable as 'this' in nested scopes */
    
  },
  createDeleteButton: function() {
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setupEventListeners: function() {
    let tasksUl = document.querySelector('ul');

    tasksUl.addEventListener('click', function(event) {
      let elementClicked = event.target;

      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTask(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

view.setupEventListeners();