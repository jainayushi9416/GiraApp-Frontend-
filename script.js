let addbtn=document.querySelector('.add');
let body=document.querySelector('body');

let grid=document.querySelector('.grid');

let colors=["pink","blue","green","black"] 


let deleteBtn=document.querySelector(".delete");
let deleteMode =false;

if(localStorage.getItem("AllTickets") == undefined){//to create empty allTicket object and store if no AllTicket object exists
    let allTickets = {};
    allTickets = JSON.stringify(allTickets);
    localStorage.setItem("AllTickets",allTickets);
}





deleteBtn.addEventListener("click",function(e){
if(e.currentTarget.classList.contains("deleteselected")){
    e.currentTarget.classList.remove("deleteselected");
    deleteMode=false;
}else{
e.currentTarget.classList.add("deleteselected");
deleteMode=true;
}


});




addbtn.addEventListener("click",function(){
    //off the delete mode 
    deleteBtn.classList.remove("deleteselected")
    deleteMode=false;

    let preModal=document.querySelector(".modal")
    if(preModal!=null){
        return;
    }

    let div=document.createElement('div');// <div></div>
    div.classList.add("modal");// <div class="modal"></div>
    div.innerHTML= `<div class="tasksection">
    <div class="taskinnercontainer" contenteditable="true"></div>
</div>
<div class="modalprioritysection">
    <div class="priorityinnercontainer">
        <div class="modalpriority pink"></div>
        <div class="modalpriority blue"></div>
        <div class="modalpriority green"></div>
        <div class="modalpriority black selected "></div>
    </div>
</div> `
let ticketColor="black";
let allModalPriority=div.querySelectorAll(".modalpriority");

for(let i=0;i<allModalPriority.length;i++){
    allModalPriority[i].addEventListener("click",function(e){
         for(let j=0;j<allModalPriority.length;j++){
             allModalPriority[j].classList.remove("selected");
         }
        e.currentTarget.classList.add("selected");
        ticketColor=e.currentTarget.classList[1];
    });
}



let taskinnercontainer=div.querySelector('.taskinnercontainer')
taskinnercontainer.addEventListener("keydown",function(e){
    if(e.key=="Enter"){
        let id=uid()
        let task=e.currentTarget.innerText;

        // to save the created ticket

        //1. To bring all the data on localStorage

        let allTickets=JSON.parse( localStorage.getItem("AllTickets"));


        //2. To update the data
        let ticketObj={
            color:ticketColor,
            taskValue:task
        };
        allTickets[id]=ticketObj;


        //3. To save the updated data to local Storage 

        localStorage.setItem("AllTickets",JSON.stringify(allTickets));
        





        let ticketDiv = document.createElement("div");
        ticketDiv.classList.add("ticket");
        ticketDiv.innerHTML=`<div class="ticket">
        <div class="ticket-color ${ticketColor}"></div>
        <div class="ticketId">
          #${id}
        </div>
        <div class="actualTask">
          ${task}
        </div>
      </div> `
      
      ticketDiv.addEventListener("click",function(e){
          if(deleteMode){
              e.currentTarget.remove();
          }

      });



      let ticketColorDiv=ticketDiv.querySelector(".ticket-color")
        ticketColorDiv.addEventListener("click",function(e){
            let currColor = e.currentTarget.classList[1];
            let index=-1;
            for(let i=0;i<colors.length;i++){
                if(colors[i]==currColor) index=i;
            }
            index++;
            index=index%4;
            let newColor=colors[index];
            ticketColorDiv.classList.remove(currColor);
            ticketColorDiv.classList.add(newColor);
        })
      grid.append(ticketDiv);
        
        div.remove()
    }
    else if(e.key === "Escape"){
        div.remove()
    }
});

    body.append(div);
    

});


