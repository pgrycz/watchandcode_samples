# watchandcode_samples

This repository is intended to follow watchandcode.com approach of practical JS

This simple Todolist is constructed, as I understand it, in simple MVC pattern with project divided to three sections, model as object with its methods and logic, controller with all handlers which binds buttons and inputs with model object methods and view which operates on what is visible in the browser.

Some parts may be tricky for a newbies like me like how the overall used pattern is set (how to think this way as normal habit), especially view section, the 'this' depending on which scope we are operating is clear and understandable. The view module is challenging anyway as at the start displayTasks method is placed in model object module and operates on tasks array items so to see everyhing in browser's console and then is migrated to view module to operate thru tasks array on each html ul and li tag with additional attribute done/undone so to be seen in browser window.

This approach is helpful for anybody who feels the need of structurise the js code to stop creates spaghetti, improvised code and to have clear, as I understand it, practical insight into separation of concerns which when finally set and divided properly, really helps to provide further code in more clear, readable way.