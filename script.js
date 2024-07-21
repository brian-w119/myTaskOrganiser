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
   newPriority: null,
   storageArr: [],
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
      // this.task += 1;
      let input = 0;
      const priority = this.currentInputArr[3];
      this.addStyling(priority);
   },

   addStyling(priority) {
      this.task++;
      const box = this.newElement("div");
      box.classList.add("inputInfo");
      box.id = `task${this.task}`;
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
      //removes duplicate taskId
      //if (!this.currentInputArr.includes(box.id)) {
      //this.currentInputArr.pop();
      // }
      this.currentInputArr.push(box.id);

      switch (priority) {
         case "low":
            box.classList.add("lowPri");
            this.lowPriority.appendChild(box);
            break;
         case "medium":
            this.medPriority.appendChild(box);
            break;
         case "high":
            this.highPriority.appendChild(box);
            break;
      }
      // this.currentInputArr.pop(); //removes rogue index
      this.storageArr.push(this.currentInputArr);
      this.mouseOverEvent(box, this.task);

      //removes duplicate value from end of storageArr
      const storageArray = [...this.storageArr];
      for (let i = 0; i < storageArray.length; i++) {
         if (this.storageArr[i].length > 5) {
            this.storageArr[i].pop();
         }
      }
      console.log("StorageArray: ", this.storageArr);
   },

   mouseOverEvent(element, task) {
      element.addEventListener("mousedown", () => {
         console.log("task id: ", element.id);
         this.taskReAssign(element);
         console.log(this.storageArr);
         //this.priorityChangePt2(element);
      });
   },
   //updates localStorage on task priority change
   localStorageUpdate(elementID, newPriority) {
      const tempArr = [...this.storageArr];
      for (let i = 0; i < tempArr.length; i++) {
         if (tempArr[i].includes(elementID)) {
            this.storageArr = [];
            tempArr[3] = newPriority;
            this.storageArr = [...tempArr];
            console.log("Storage array re-written: ", this.storageArr);
         }
      }
   },
   /*
   //priority buttons calling function to update localStorage
   priorityChange() {
      const low = document.querySelector("#Low");
      const med = document.querySelector("#Med");
      co
      */

   //
   updateLocalStorage() {
      console.log(this.storageArr);
      const data = JSON.stringify(this.storageArr);
      localStorage.setItem("input", data);
   },

   //retrieves data and writes to columns
   retrieveLocalStorage() {
      this.storageArr = [];
      const data = localStorage.getItem("input");
      let outputData = JSON.parse(data);
      //this.storageArr = [...outputData];
      console.log("Retrieved from localStorage :", outputData);
      //console.log(this.storageArr);

      for (const output of outputData) {
         this.currentInputArr = output;
         const priority = output[3];
         this.addStyling(priority);
      }

      this.currentInputArr = [...outputData];
      console.log(this.currentInputArr);
   },

   taskReAssign(element) {
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

      //creates button to delete specific task
      const deletetask = this.newElement("button");
      deletetask.id = "deleteTask";
      newDiv.appendChild(deletetask);
      this.priorityChange(element);

      //create reAssign window close button and function
      const button = this.newElement("button");
      button.id = "closeReAssign";
      button.innerText = "X";
      newDiv.appendChild(button);

      button.addEventListener("click", () => {
         this.grid2.removeChild(newDiv);
      });
   },

   removeThisTask(element) {
      const button = document.querySelector("#deleTask");
   },

   selectPriButtons() {
      const low = document.querySelector("#Low");
      const med = document.querySelector("#Med");
      const high = document.querySelector("#High");
      return [low, med, high];
   },

   priorityChange(element) {
      let tempStorage = [];
      const container = document.querySelector("#reAssign");
      /*
      const low = document.querySelector("#Low");
      const med = document.querySelector("#Med");
      const high = document.querySelector("#High");
      console.log(this.task);
      */
      const priButtons = this.selectPriButtons();
      const low = priButtons[0];
      const med = priButtons[1];
      const high = priButtons[2];

      const buttons = [low, med, high];
      for (const button of buttons) {
         button.addEventListener("click", () => {
            if (button === low) {
               this.lowPriority.appendChild(element);
               element.classList.remove("medPri", "highPri");
               element.classList.add("inputInfo", "lowPri");
               this.updateTaskPri("low", element);
               //
            } else if (button === med) {
               this.medPriority.appendChild(element);
               element.classList.remove("highPri", "lowPri");
               element.classList.add("inputInfo", "medPri");
               this.updateTaskPri("medium", element);
               //
            } else {
               this.highPriority.appendChild(element);
               element.classList.remove("lowPri", "medPri");
               element.classList.add("inputInfo", "highPri");
               this.updateTaskPri("high", element);
            }
            //removes pop up screen when priority has been changed
            this.grid2.removeChild(container);
            console.log(element.id, "-element on priority change");
            console.log(this.currentInputArr);
         });
      }
   },

   //updates task's priority in its array
   updateTaskPri(priority, element) {
      //this.currentInputArr = [];
      const temp = [];
      for (const index of this.currentInputArr) {
         if (index.includes(element.id)) {
            localStorage.clear();
            index[3] = priority;
            console.log(this.currentInputArr.indexOf(index));
            temp.push(index);
         }
         if (!index.includes(element.id)) {
            // index[3] = priority;
            // console.log(this.currentInputArr.indexOf(index));
            temp.push(index);
         }
      }
      this.updateLocalStorage();
      this.currentInputArr = [...temp];
      console.log(temp);
   },

   //updates local storage on priority change
   priorityChangePt2(element) {
      let tempStorage = [...this.currentInputArr];
      const priButtons = this.selectPriButtons();
      const low = priButtons[0];
      const med = priButtons[1];
      const high = priButtons[2];

      const buttons = [low, med, high];

      for (const button of buttons) {
         button.addEventListener("click", () => {
            switch (button) {
               case low:
                  console.log("low pressed: ", element.id);
                  /*
                  for (const thisIndex of tempStorage) {
                     if (thisIndex.includes(element.id)) {
                        thisIndex[3] = "low";
                        this.currentInputArr = [];
                        this.storageArr = [];
                        localStorage.clear();
                        this.storageArr = [...tempStorage];
                        this.updateLocalStorage();
                     }
                  }
                     */
                  this.intFuncPriChange(tempStorage, element, "low");
                  break;
               case med:
                  console.log("med pressed", element.id);
                  this.intFuncPriChange(tempStorage, element, "med");
                  break;
               default:
                  console.log("High pressed", element.id);
                  this.intFuncPriChange(tempStorage, element, "high");
            }
         });
      }
   },

   //intemediate step in priority change after etrieval from locaStorage
   intFuncPriChange(arr, element, newPri) {
      for (const thisIndex of arr) {
         if (thisIndex.includes(element.id)) {
            thisIndex[3] = newPri;
            this.currentInputArr = [];
            this.storageArr = [];
            localStorage.clear();
            this.storageArr = [...arr];
            this.updateLocalStorage();
         }
      }
   },

   removeDuplicate(arr) {
      let arrlength = arr.length;
      if (arrlength > 5) {
         arr.pop();
         this.removeDuplicate(arr);
      }
   },
   /*
   //updates localStorage on prioroty change
   updateLocalSto(taskId, newPriority) {
      for (const task of this.storageArr) {
         if(task[4] === taskId){
            //task[3] = newPriority;
         }
      }
   },
   */

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
         this.currentInputArr = [];
         this.task = 0;
         localStorage.clear();
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

   init() {
      window.addEventListener("load", () => {
         this.defaultCondition();
         document.body.removeChild(this.wipeConfirmBox);
         document.body.removeChild(this.wipeAll);
         // this.task = 0;
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
         localStorage.clear();
         this.task = 0;
         console.log("clear all clicked");
         console.log("task: ", this.task);
         location.reload(true);
      });
      this.enter.addEventListener("click", () => {
         this.inputToPriority();
         this.updateLocalStorage();
      });
      window.addEventListener("load", () => {
         this.retrieveLocalStorage();
         this.addInterface();
         document.body.appendChild(this.wipeAll);
      });
   },
};
taskReminder.init();
