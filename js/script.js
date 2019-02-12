
const mainDiv = document.querySelector("div.page");
const mainUl = mainDiv.querySelector("ul.student-list")
const students = mainUl.children;
let paging;


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
showPageTen(students, 1)


appendPageLinks = list => {

   if (document.querySelector("div.pagination")) {
      let removeDiv = document.querySelector("div.pagination");
      mainDiv.removeChild(removeDiv)
   }

   let pages = Math.ceil(list.length / 10);

   let newDiv = document.createElement("div");
   newDiv.className = "pagination";
   mainDiv.appendChild(newDiv);

   let pagUl = document.createElement("ul");
   pagUl.id = "linkList";
   newDiv.appendChild(pagUl);

   for (let j = 0; j < pages; j++) {

      let li = document.createElement("li")
      pagUl.appendChild(li);

      let a = document.createElement("a");
      a.href = "#";
      a.textContent = j + 1;
      li.appendChild(a);
      a.addEventListener("click", (event) => {
         if (event.target.tagName == "A") {
            showPageTen(list, a.textContent);
            for (i = 0; i < pages; i++) {
               let links = document.querySelectorAll("a");
               links[i].className = "";
               event.target.className = "active";
            }
         }
      })
   }
}
appendPageLinks(students);

searchStudents = list => {

   const pageHeader = document.getElementsByClassName("page-header cf")[0];

   const searchDiv = document.createElement("div");
   searchDiv.className = "student-search"
   pageHeader.appendChild(searchDiv);

   const createInput = document.createElement("input");
   createInput.id = "search";
   createInput.placeholder = "Search All Students";
   searchDiv.appendChild(createInput)

   const createButton = document.createElement("button");
   createButton.id = "button";
   createButton.textContent = "Search";
   searchDiv.appendChild(createButton);

   const createReset = document.createElement("button");
   createReset.id = "reset";
   createReset.textContent = "Home";
   searchDiv.appendChild(createReset);

   ///

   const reset = document.getElementById("reset");
   reset.addEventListener("click", (event) => {
      if (event.target.tagName = "BUTTON") {
         appendPageLinks(students);
         showPageTen(students, 1);
      }
   })

   const button = document.getElementById("button");

   button.addEventListener("click", (event) => {
      if (event.target.tagName == "BUTTON") {

         if (document.getElementById("no-results")) {
            let removeId = document.getElementById("no-results");
            removeId.parentNode.removeChild(removeId)
         }
         let arrayTrue = [];
         let resultsFound = false;
         let searching = button.previousElementSibling.value.toUpperCase
            ();
         for (let i = 0; i < list.length; i++) {
            let student = list[i].firstElementChild.firstElementChild.nextElementSibling.textContent.toUpperCase();
            if (student.includes(searching)) {
               arrayTrue.push(list[i]);
               list[i].style.display = "block";
               resultsFound = true;
            } else {
               list[i].style.display = "none";
            }
            button.previousElementSibling.value = "";

         }
         if (resultsFound != true) {
            let noResults = document.createElement("h2")
            noResults.textContent = "No Results Found. Please Refine Your Search."
            noResults.id = "no-results"
            mainUl.appendChild(noResults);

         }
         appendPageLinks(arrayTrue);
         showPageTen(arrayTrue, 1)
      }
   })

}

searchStudents(students);