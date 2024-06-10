const taskReminder = {
   grid1: document.querySelector(".grid1"),
   grid2: document.querySelector(".grid2"),
   title: document.querySelector(".title"),
   details: document.querySelector(".details"),
   dueDate: document.querySelector(".dueDate"),
   newTask: document.querySelector(".taskNew"),

   //creates new element
   newElement(type) {
      const newItem = document.createElement("type");
      return newItem;
   },

   createForm() {},

   //new task class
   taskNew: {
      constructor(title, dueDate, priority) {
         this.title = title;
         this.dueDate = dueDate;
         this.priority = priority;
      },
   },
};
