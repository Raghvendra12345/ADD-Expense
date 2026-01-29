
window.addEventListener("DOMContentLoaded",initialize);
function initialize() {
  const ul = document.querySelector("ul");
  ul.innerHTML = ""; // clear list before rendering

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i); // email
    const expense = JSON.parse(localStorage.getItem(key));
    displayy(expense,key);
  }
}


function handleFormSubmit(event){
   event.preventDefault();
   const amount=event.target.amount.value
   const description=event.target.description.value
   const category=event.target.category.value

   const obj={amount,description,category}
   const stringobj=JSON.stringify(obj)
   const idd=Date.now()
   localStorage.setItem(idd,stringobj)

   displayy(obj,idd)
}

function displayy(obj,id){
    const ul=document.querySelector('ul')
    const li=document.createElement('li')

    li.textContent=obj.amount+" "+obj.description+" "+obj.category

    const deletebtn=document.createElement('button')
    const deletevalue=document.createTextNode("Delete")
    deletebtn.appendChild(deletevalue)
  
    li.appendChild(deletebtn)
    
    deletebtn.addEventListener("click",(event)=>{
        li.remove();
        localStorage.removeItem(id)
    })
    ul.appendChild(li)

}