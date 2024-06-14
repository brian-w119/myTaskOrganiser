const taskReminder = {
   grid1: document.querySelector(".grid1"),
   grid2: document.querySelector(".grid2"),
   title: null,
   details: null,
   dueDate: null,
   priority: null,
   newTask: document.querySelector("#taskNew"),
   container: document.querySelector("#container"),
   enter: document.querySelector("#enter"),
   clear: document.querySelector("#clear"),
   enterClearBox: document.querySelector(".buttonsLower"),

   //creates new element
   newElement(type) {
      const newItem = document.createElement("type");
      return newItem;
   },

   createForm() {
      this.title = this.newElement("input");
      this.title.setAttribute("id", "title");
      this.title.style.backgroundColor = "brown";
      this.container.appendChild(this.title);
   },

   //new task class
   taskNew: {
      constructor(title, details, dueDate, priority) {
         this.title = title;
         this.details = details;
         this.dueDate = dueDate;
         this.priority = priority;
      },
   },

   defaultCondition() {
      //removes input fields, enter and clear buttons
      const buttons = [this.container, this.enterClearBox];
      for (let i = 0; i < buttons.length; i++) {
         this.grid1.removeChild(buttons[i]);
      }
   },

   //adds user input field to the DOM
   addInterface() {
      const buttons = [this.container, this.enterClearBox];
      for (let i = 0; i < buttons.length; i++) {
         this.grid1.appendChild(buttons[i]);
      }
   },

   init() {
      window.addEventListener("load", () => {
         this.defaultCondition();
      });
      this.newTask.addEventListener("click", () => {
         this.addInterface();
      });
   },
};
taskReminder.init();
