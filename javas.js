//if user adds a note , add it to local Storage
showNotes();
let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById("addTxt");
    let  addTitle= document.getElementById("addTitle");
    let notes = localStorage.getItem("notes"); //grab everthing present in localStorage key value " notes"

    if (notes == null) {
         notesObj = [];   //is an array of objects
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let myObj={
        title:addTitle.value,
        text:addTxt.value
    }
    //update localStorage with new added note and title
    notesObj.push(myObj);
    localStorage.setItem("notes",JSON.stringify(notesObj));

    //clean the text area
    addTxt.value = "";
    addTitle.value = "";

    //function to add note in the note section 
    showNotes();
});

//function to display added notes , usinglocalStorage

function showNotes()
{
    let notes=localStorage.getItem("notes");  //grab everthing present in localStorage key value " notes"
    if (notes == null) {
        notesObj=[]
    }
    else {
        notesObj = JSON.parse(notes); 
    }

    let html="";
    notesObj.forEach(function(element,index)
    {
      html+=`
      <div class="noteCard card my-2 mx-2" style="width: 18rem; background-color: #FDEFEF">
          <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
              <p class="card-text">${element.text}</p>
              <button class="btn btn-primary" id="${index}" onclick="deleteNote(this.id)"
                  style="background-color:#F999B7;border-color: pink; margin-top:10px;">Delete Note</button>
          </div>
      </div>`
    });

    let notesElm=document.getElementById("notes");
    if(notesObj.length!=0)
    {
        notesElm.innerHTML=html;
    }
    else{
        notesElm.innerHTML=`<h6>Nothing to show!! Use "Add a Note" section above to add Notes</h6>` ;
    }
}

function deleteNote(index)
{
    let notes=localStorage.getItem("notes");  //grab everthing present in localStorage key value " notes"
    if (notes == null) {
        notesObj=[]
    }
    else {
        notesObj = JSON.parse(notes); 
    }
    notesObj.splice(index,1);

    //we have to update local storage 
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();


}

let search=document.getElementById("searchTxt");
search.addEventListener("input",function()
{
    let inputVal=search.value.toLowerCase();
    let noteCard=document.getElementsByClassName("noteCard");
    Array.from(noteCard).forEach(function(element)
    {
        let cardTxt=element.getElementsByTagName("P")[0].innerText;
        if(cardTxt.includes(inputVal))
        {
          element.style.display="block";
        }
        else{
            element.style.display="none";
        }

    })

})
