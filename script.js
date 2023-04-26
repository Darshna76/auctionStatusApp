
var arr = [];
async function getDataFromApi() {
    document.getElementById("loader").style.display="block";
    try{
        const response = await fetch("https://gauravgitacc.github.io/postAppData/auctionData.json");
        arr=await response.json();
        sessionStorage.setItem("myArr" ,JSON.stringify(arr));

        if(arr){
            console.log("data",arr);
            showData(arr);
            document.getElementById("loader").style.display="none";
        

        }

    }catch (e) {
        console.log("Error--" , e);
    }
    
}

if(sessionStorage.getItem("myArr")){
    var myArr = JSON.parse(sessionStorage.getItem("myArr"));
    showData(myArr);
    arr = myArr;
  } else {
    getDataFromApi();
  }
  document.getElementById("search").addEventListener("input" , ()=> {
       var newArr = arr.filter((item)=>
       item.status
      .toLowerCase()
      .includes(document.getElementById("search").value.trim().toLowerCase()) 
      
  );
  showData(newArr);

  })

function showData(myArr){
    document.getElementById("container").innerHtml="";
    let innerHTML="";
    myArr.forEach((item)=>{
        innerHTML+= `<div class="myDiv">
                       <div class="flex-info">
                       <div>
                       <div class ="chip ${
                        item.status=="PENDING"? "yellow"
                        : item.status=="CANCELLED" ? "red"
                        : item.status=="APPROVED" ? "blue"
                        : ""
                       }">${item.status}</div>
                       <p class="case-number">${item.caseNumber}</p>
                   </div>
                   <p>${item.date}</p>
               </div>
               <hr/>
               <div>
                       <strong>${item.toLocation}</strong>
                       <p>${
                         item.fromLocation
                       } <span style='float:right;'>${item.fare}</span></p>
               </div>
           </div>
           `;
    });
    document.getElementById("container").innerHTML=innerHTML;
}