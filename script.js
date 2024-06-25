const taskReminder = {
   grid1: document.querySelector(".grid1"),
   grid2: document.querySelector(".grid2"),
   title: document.querySelector("#title"),
   details: document.querySelector("#details"),
   dueDate: document.querySelector("#date"),
   form: document.querySelector("#form"),
   priority: document.querySelector("#priority"),
   newTask: document.querySelector("#taskNew"),
   container: document.querySelector("#container"),
   enter: document.querySelector("#enter"),
   clear: document.querySelector("#clear"),
   enterClearBox: document.querySelector(".buttonsLower"),
   pendingTasks: document.querySelector(".pendingTasks"),
   lowPriority: document.querySelector(".lowP"),
   medPriority: document.querySelector(".medP"),
   highPriority: document.querySelector(".highP"),
   wipeConfirmBox: document.querySelector("#confirm"),
   wipeAll: document.querySelector("#wipe"),
   no: document.querySelector("#no"),
   yes: document.querySelector("#yes"),
   currentInputArr: [],
   headingLow: document.querySelector(".lowP"),
   headingMed: document.querySelector(".medP"),
   headingHigh: document.querySelector(".highP"),
   activeTask: null,
   // taskId: null,
   task: 0,

   //creates new element
   newElement(type) {
      const newItem = document.createElement(type);
      return newItem;
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
      let arr = [];
      this.currentInputArr = [];

      this.enter.addEventListener("click", () => {
         arr = [
            this.title.value,
            this.details.value,
            this.dueDate.value,
            this.priority.value,
         ];
         this.currentInputArr = [...arr];
         console.log(this.currentInputArr);
      });
   },

   //resets form to accept new input
   clearInputFields() {
      this.clear.addEventListener("click", () => {
         this.form.reset();
      });
   },

   //transfers input data from form to priority columns
   inputToPriority() {
      this.task += 1;
      const priority = this.currentInputArr[3];
      const box = this.newElement("div");
      box.classList.add("inputInfo");

      for (let i = 0; i < 3; i++) {
         const newDiv = this.newElement("div");
         newDiv.classList.add("transferredInput");

         if (i % 2 === 0) {
            newDiv.style.backgroundColor = "grey";
         } else {
            newDiv.style.backgroundColor = "lightGrey";
         }
         // console.log(newDiv);
         newDiv.innerText = this.currentInputArr[i];
         box.appendChild(newDiv);
      }

      switch (priority) {
         case "low":
            this.lowPriority.appendChild(box);
            break;
         case "medium":
            this.medPriority.appendChild(box);
            break;
         case "high":
            this.highPriority.appendChild(box);
            break;
      }
      this.mouseOverEvent(box, this.task);
   },

   mouseOverEvent(element, task) {
      element.addEventListener("mousedown", () => {
         element.id = `Task${task}`;
         console.log("MOUSE DOWN");
         this.taskReAssign();
      });
   },

   taskReAssign() {
      const newDiv = this.newElement("div");
      newDiv.id = "reAssign";
      this.grid2.appendChild(newDiv);
      console.log("new div appended");

      //container to hold task re-assign buttons
      const div2 = this.newElement("div");
      div2.id = "reAssign2";
      newDiv.appendChild(div2);

      //text instructing user
      const text = this.newElement("div");
      text.id = "h2Text";
      text.innerText = "Change Priority";
      newDiv.appendChild(text);

      //creation of buttons to change task's priority
      const buttons = ["Low", "Med", "High"];
      for (let i = 0; i < 3; i++) {
         const button = this.newElement("button");
         button.id = `${buttons[i]}`;
         button.innerText = buttons[i];
         //button.style.hover = "transform(scale(1.2, 1.2))";
         div2.appendChild(button);
      }

      //create reAssign window close button and function
      const button = this.newElement("button");
      button.id = "closeReAssign";
      button.innerText = "X";
      newDiv.appendChild(button);

      button.addEventListener("click", () => {
         this.grid2.removeChild(newDiv);
         this.removeTaskId(button);
      });
   },

   //removes task id
   removeTaskId(close) {
      const taskId = document.querySelectorAll(".inputInfo");
      for (let i = 0; i < taskId.length; i++) {
         taskId[i].removeAttribute("id");
      }
      console.log("close clicked");
   },

   clearAllPriorities() {
      //adds the confirmation box to the screen
      this.wipeAll.addEventListener("click", () => {
         document.body.appendChild(this.wipeConfirmBox);
      });

      this.no.addEventListener("click", () => {
         document.body.removeChild(this.wipeConfirmBox);
      });

      const columns = [this.lowPriority, this.medPriority, this.highPriority];
      this.yes.addEventListener("click", () => {
         for (let i = 0; i < columns.length; i++) {
            columns[i].innerHTML = null;
         }
         document.body.removeChild(this.wipeConfirmBox);
      });
   },

   //recreates and adds the priority headings back to the the top of the columns after all column contents have been deleted
   addHeadings() {
      const columnHeading = [
         this.headingLow,
         this.headingMed,
         this.headingHigh,
      ];
      const heading = ["Low Priority", "Medium Priority", "High Priority"];
      const classIdentifiers = ["pLow", "pMed", "pHigh"];

      for (let i = 0; i < columnHeading.length; i++) {
         const div = this.newElement("div");
         div.classList.add(classIdentifiers[i]);
         div.classList.add("heading");
         div.innerText = heading[i];
         div.draggable = "true";
         columnHeading[i].appendChild(div);
         console.log(div);
      }
   },
   /*
   taskZoom() {
      // const thisTask = document.querySelectorAll(".inputInfo");
      this.thisTask.forEach((element) => {
         element.addEventListener("mouseover", () => console.log("ok"));
      });
      console.log(this.thisTask);
   },
   */

   init() {
      window.addEventListener("load", () => {
         this.defaultCondition();
         document.body.removeChild(this.wipeConfirmBox);
         document.body.removeChild(this.wipeAll);
      });
      this.newTask.addEventListener("click", () => {
         this.addInterface();
         document.body.appendChild(this.wipeAll);
      });
      this.captureInputData();
      this.clearInputFields();
      this.clearAllPriorities();
      this.yes.addEventListener("click", () => {
         this.addHeadings();
      });
      this.enter.addEventListener("click", () => {
         this.inputToPriority();
      });
   },
};
taskReminder.init();
