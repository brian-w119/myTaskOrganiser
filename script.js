const taskReminder = {
   grid1: document.querySelector(".grid1"),
   grid2: document.querySelector(".grid2"),
   title: document.querySelector("#title"),
   details: document.querySelector("#details"),
   dueDate: document.querySelector("#date"),
   form: document.querySelector("#form"),
   priority: document.querySelector("#details"),
   newTask: document.querySelector("#taskNew"),
   container: document.querySelector("#container"),
   enter: document.querySelector("#enter"),
   clear: document.querySelector("#clear"),
   enterClearBox: document.querySelector(".buttonsLower"),
   pendingTasks: document.querySelector(".pendingTasks"),

   //creates new element
   newElement(type) {
      const newItem = document.createElement("type");
      return newItem;
   },

   //new task class
   taskNew: {
      constructor(title, details, dueDate, priority) {
         this.title = "title";
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
      this.grid2.removeChild(this.pendingTasks);
   },

   //adds user input fields to the DOM
   addInterface() {
      const buttons = [this.container, this.enterClearBox];
      for (let i = 0; i < buttons.length; i++) {
         this.grid1.appendChild(buttons[i]);
      }
      this.grid2.appendChild(this.pendingTasks);
   },

   //captures data from input field
   captureInputData() {
      const arr = [];
      this.enter.addEventListener("click", () => {
         const input = [
            this.title.value,
            this.details.value,
            this.dueDate.value,
            this.priority.value,
         ];

         for (let i = 0; i < input.length; i++) {
            arr.push(input[i]);
         }
         console.log(arr);
      });
   },

   //resets form to accept new input
   clearInputFields() {
      this.clear.addEventListener("click", () => {
         this.form.reset();
      });
   },

   init() {
      window.addEventListener("load", () => {
         this.defaultCondition();
      });
      this.newTask.addEventListener("click", () => {
         this.addInterface();
      });
      this.captureInputData();
      this.clearInputFields();
   },
};
taskReminder.init();
