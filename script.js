
let listToAdd = document.querySelector('.listToAdd');
let addListButton = document.querySelector('.addList');
let addedList = document.querySelector('.listAdded');
let remainingWork = document.querySelector('.displayNoOfWork');
let counterValue = 1;

const displayList = () =>{
    addedList.innerHTML ='';
    for(let i = 0; i < sessionStorage.length; i++){
        let key = sessionStorage.key(i);
        if(key !== "IsThisFirstTime_Log_From_LiveServer"){
            let value = sessionStorage.getItem(key);
            let listItem = document.createElement('div');
            listItem.innerHTML = `<div class="bodyMain">
                                    <div class=leftValue> ${value}</div>
                                    <div class='rightValue'> 
                                        <button class="editButton" data-key="${key}">Edit</button>
                                        <button class="deleteButton" data-key="${key}">Delete</button>
                                    </div>                                       
                                  </div>`
            addedList.appendChild(listItem);

        }
    }

    let editButton = document.querySelectorAll('.editButton');
    editButton.forEach(button =>{
        button.addEventListener('click',(event)=>{
            let keyToEdit = event.target.getAttribute('data-key');
            let valueToEdit = sessionStorage.getItem(keyToEdit);
            listToAdd.innerHTML=valueToEdit;
            sessionStorage.removeItem(keyToEdit)
            remainingWork.innerHTML=`Your Remaining Work is ${sessionStorage.length-1}`

            displayList()
            
        })
    })
    
    let deleteButtons = document.querySelectorAll('.deleteButton');
    // Attach event listener to each delete button
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            let keyToDelete = event.target.getAttribute('data-key');
            console.log(keyToDelete);
            // Optionally, you can remove the item from sessionStorage here
            sessionStorage.removeItem(keyToDelete);
            // And update the displayed list
            remainingWork.innerHTML=`Your Remaining Work is ${sessionStorage.length-1}`
            displayList();
        });
    });
}

addListButton.addEventListener('click',() =>{
    let valueStoreInSessionStorage = listToAdd.value;
    if(valueStoreInSessionStorage.length !== 0){
        let keyValue = "Task" + counterValue;
        sessionStorage.setItem(keyValue, valueStoreInSessionStorage);
        displayList(); // Update the displayed list
        let remainingWorkSessionStorage = sessionStorage.length;
        remainingWork.innerHTML = `Your Remaining Work is ${remainingWorkSessionStorage-1}`;
        counterValue++;
    }    
});
