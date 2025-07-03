var URLinput=document.getElementById("URLinput");
var NameInput=document.getElementById("NameInput");
var btn1=document.getElementById("btn1");

var indexs=[];

function validURL(){
    var regexURLinput=/^https?:\/\/(www\.)?[a-zA-Z0-9.-]+\.com(\/.*)?$/; 
    var regexinputName=/^[a-zA-Z]{3,}$/;
    if(regexURLinput.test(URLinput.value) && (regexinputName.test(NameInput.value))){
     console.log("valid");
     URLinput.classList.add("is-valid");
     URLinput.classList.remove("is-invalid");
     NameInput.classList.add("is-valid");
     NameInput.classList.remove("is-invalid");
     displayData();
     return true;
     
    
    }else{
        console.log("notvalid");
        URLinput.classList.add("is-invalid");
        URLinput.classList.remove("is-valid");
        NameInput.classList.add("is-invalid");
        NameInput.classList.remove("is-valid");
    return false;
    }
}


function displayData() {
    var cartoona = "";
    for (var i = 0; i < indexs.length; i++) {
        cartoona += `
        <tr>
            <td>${i + 1}</td>
            <td>${indexs[i].name}</td>
            <td><button class="btn btn2 border-2 visit-btn" data-url="${indexs[i].url}"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
            <td><button class="btn btn-danger border-2 delete-btn" data-index="${i}"><i class="fa-solid fa-trash can pe-2"></i>Delete</button></td>
        </tr>`;
    }
    document.getElementById("row").innerHTML = cartoona;
    
    
     var visitButtons = document.querySelectorAll(".visit-btn");

     for (var i = 0; i < visitButtons.length; i++) {
         visitButtons[i].addEventListener("click", function () {
             var url = this.getAttribute("data-url");
             window.open(url, "_blank");
         });
     }
     var deleteButtons = document.querySelectorAll(".delete-btn");

for (let i = 0; i < deleteButtons.length; i++) {
  deleteButtons[i].onclick = function () {
    let index = this.getAttribute("data-index");
    indexs.splice(index, 1); // نحذف العنصر من المصفوفة
    displayData(); // نعرض الجدول من جديد
  };
}
 
}


function addSite() {
    if(validURL()){    // نتحقق قبل الإضافة
        var site = {
            name: NameInput.value,
            url: URLinput.value
        };
        indexs.push(site);  // ضيف العنصر للمصفوفة
        displayData();      // حدث العرض
        // ممكن تمسح الحقول بعد الإضافة لو حبيتي
        NameInput.value = "";
        URLinput.value = "";
        // وكمان نقدر نعيد تعيين الصلاحيات عشان ما تكونش valid
        URLinput.classList.remove("is-valid");
        NameInput.classList.remove("is-valid");
    } else {
        alert("Please enter valid name and URL.");
    }
}


btn1.addEventListener("click", addSite);
URLinput.addEventListener("input", validURL);
NameInput.addEventListener("input", validURL);
