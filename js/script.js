// Declares Main Div and Student List Items as Variables
const mainDiv = document.querySelector("div.page");
const mainUl = mainDiv.querySelector("ul.student-list")
const students = mainUl.children;

// Function shows list of 10 students per page based on total amount of students filtered. Results 1 - 10 on page 1, 11 - 20 on page 2, etc.
const showPageTen = (list, page) => {

   for (let i = 0; i < list.length; i++) {
      let firstResult = (page - 1) * 10;
      let lastResult = (firstResult + 9);
      if (i >= firstResult && i <= lastResult) {
         list[i].style.display = "block";
      } else {
         list[i].style.display = "none";
      }
   }
}
showPageTen(students, 1) // Shows list of first 10 students.


 // Function creates elements based on element type
 const createElem = element => document.createElement(element);


// Function creates, appends, and updates pagination list based on user filter method.
appendPageLinks = list => {

   // If pagination from previous query exists, remove previous pagination.
   if (document.querySelector("div.pagination")) {
      let removeDiv = document.querySelector("div.pagination");
      mainDiv.removeChild(removeDiv)
   }

   // Declares total number of pagination links based on total amount of queried students
   let pages = Math.ceil(list.length / 10);

   // Creates new pagination div and ul tags, assigns class/id names, and appends them. These are to hold the pagination links.
   let newDiv = createElem("div");
   let pagUl = createElem("ul");
   newDiv.className = "pagination";
   mainDiv.appendChild(newDiv);
   pagUl.id = "linkList";
   newDiv.appendChild(pagUl);

   // Loop creates and appends pagination while attaching links to each.
   for (let j = 0; j < pages; j++) {

      // Creates list and anchor variables for each pagination.
      let li = createElem("li");
      let a = createElem("a");
      pagUl.appendChild(li);
      a.href = "#";
      a.textContent = j + 1;
      li.appendChild(a);

      // When a pagination link is clicked, update the page to only show the page's assigned records through running the showPageTen function with updated arguments based on the pagination links number (a.textContent) and the student record total (list).
      a.addEventListener("click", (event) => {
         if (event.target.tagName == "A") {
            showPageTen(list, a.textContent);

            // Adds active class to clicked pagination and removes class from other links.
            for (i = 0; i < pages; i++) {
               let links = document.querySelectorAll("a");
               links[i].className = "";
               event.target.className = "active";
            }
         }
      })
   }
}
appendPageLinks(students); // Updates pagination links based on total number of students in students argument. Such as, 33 students will show 4 pagination links.


// Function that allows users to filter results based on their search.
searchStudents = list => {
   // Assigns header div tagt to variable 
   const pageHeader = document.getElementsByClassName("page-header cf")[0];

   // Creates and appends a form that will hold search elements
   const searchForm = createElem("form");
   searchForm.className = "student-search"
   pageHeader.appendChild(searchForm);

   // Creates and appends student search input field
   const createInput = createElem("input");
   createInput.id = "search";
   createInput.placeholder = "Search All Students";
   searchForm.appendChild(createInput)

   // Creates and appends search button for input field
   const createButton = createElem("button");
   createButton.id = "button";
   createButton.textContent = "Search";
   searchForm.appendChild(createButton);

   // Creates and appends a Home button.
   const createReset = createElem("button");
   createReset.id = "reset";
   createReset.textContent = "Home";
   searchForm.appendChild(createReset);

   // When the user clicks the Home button, the showPageTen and appendPageLinks functions run with their default arguments attached.
   const reset = document.getElementById("reset");
   reset.addEventListener("click", (event) => {
      if (event.target.tagName = "BUTTON") {
         event.preventDefault();
         appendPageLinks(students);
         showPageTen(students, 1);
      }
   })

   // When the user clicks the Search button or hits Enter, the value of the search input filters the total student records and displays results and updated pagination links based on the filtered value.
   const button = document.getElementById("button");
   button.addEventListener("click", (event) => {
     if (event.target.tagName == "BUTTON") {
        event.preventDefault();
         // If the no-results heading exists, remove it. This prevents the "no search results" heading from displaying whenever the user decides to input another search query after finding no search results prior.
         if (document.getElementById("no-results")) {
            let removeId = document.getElementById("no-results");
            removeId.parentNode.removeChild(removeId)
         }

         // Assigns positive search results to this array.
         let arrayTrue = [];

         // Changes to true if >= 1 result is found
         let resultsFound = false;

         // Assigns the input field's value to the 'searching' variable
         let searching = button.previousElementSibling.value.toUpperCase
            ();

         // Loop compares 'searching' variable's value with student name strings.
         for (let i = 0; i < list.length; i++) {

            // Captures student names
            let student = list[i].firstElementChild.firstElementChild.nextElementSibling.textContent.toUpperCase();

            // If a student name is included as part of the search input, display that result, push it to the arrayTrue variable, and change resultsFound to true.
            if (student.includes(searching)) {
               arrayTrue.push(list[i]);
               list[i].style.display = "block";
               resultsFound = true;

               // Values that do not match are not displayed.
            } else {
               list[i].style.display = "none";
            }
            // Input field is cleared when a User clicks Search.
            button.previousElementSibling.value = "";
         }
         // If the resultsFound boolean is false, create and append a No Results header to the page.
         if (resultsFound != true) {
            let noResults = createElem("h2")
            noResults.textContent = "No Results Found. Please Refine Your Search."
            noResults.id = "no-results"
            mainUl.appendChild(noResults);
         }
         // Values that were pushed to arrayTrue becomes the total student records argument to the appendPageLinks and showPageTen functions. This is so that the new first 10 results still show on the page, and the pagination links are updated based on the new, filtered total of student records.
         appendPageLinks(arrayTrue);
         showPageTen(arrayTrue, 1)
      }
   })

}
searchStudents(students);

console.log("Working");