        var newMemberAddBtn = document.querySelector('.addMemberBtn'),
darkBg = document.querySelector('.dark_bg'),
popupForm = document.querySelector('.popup'),
crossBtn = document.querySelector('.closeBtn'),
submitBtn = document.querySelector('.submitBtn'),
modalTitle = document.querySelector('.modalTitle'),
popupFooter = document.querySelector('.popupFooter'),
form = document.querySelector('form'),
formInputFields = document.querySelectorAll('form input'),
uploadimg = document.querySelector("#uploadimg"),
fName = document.getElementById("fName"),
position = document.getElementById("position"),
sDate = document.getElementById("sDate"),
entries = document.querySelector(".showEntries"),
tabSize = document.getElementById("table_size"),
userInfo = document.querySelector(".userInfo"),
table = document.querySelector("table"),
filterData = document.getElementById("search")

let originalData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []
let getData = [...originalData]


let isEdit = false, editId

var arrayLength = 0
var tableSize = 10
var startIndex = 1
var endIndex = 0
var currentIndex = 1
var maxIndex = 0

showInfo()


newMemberAddBtn.addEventListener('click', ()=> {
    isEdit = false
    submitBtn.innerHTML = "Enviar"
    modalTitle.innerHTML = "Preencha os campos"
    popupFooter.style.display = "block"
    darkBg.classList.add('active')
    popupForm.classList.add('active')
})

crossBtn.addEventListener('click', ()=>{
    darkBg.classList.remove('active')
    popupForm.classList.remove('active')
    form.reset()
})

function preLoadCalculations(){
    array = getData
    arrayLength = array.length
    maxIndex = arrayLength / tableSize

    if((arrayLength % tableSize) > 0){
        maxIndex++
    }
}

function displayIndexBtn(){
    preLoadCalculations()

    const pagination = document.querySelector('.pagination')

    pagination.innerHTML = ""

    pagination.innerHTML = '<button onclick="prev()" class="prev">Anterior</button>'

    for(let i=1; i<=maxIndex; i++){
        pagination.innerHTML += '<button onclick= "paginationBtn('+i+')" index="'+i+'">'+i+'</button>'
    }

    pagination.innerHTML += '<button onclick="next()" class="next">Próxima</button>'

    highlightIndexBtn()
}


function highlightIndexBtn(){
    startIndex = ((currentIndex - 1) * tableSize) + 1
    endIndex = (startIndex + tableSize) - 1

    if(endIndex > arrayLength){
        endIndex = arrayLength
    }

    if(maxIndex >= 2){
        var nextBtn = document.querySelector(".next")
        nextBtn.classList.add("act")
    }


    entries.textContent = `Mostrando ${startIndex} a ${endIndex} de ${arrayLength} tarefas`

    var paginationBtns = document.querySelectorAll('.pagination button')
    paginationBtns.forEach(btn => {
        btn.classList.remove('active')
        if(btn.getAttribute('index') === currentIndex.toString()){
            btn.classList.add('active')
        }
    })


    showInfo()
}




function showInfo(){
    document.querySelectorAll(".employeeDetails").forEach(info => info.remove())

    var tab_start = startIndex - 1
    var tab_end = endIndex

    if(getData.length > 0){
        for(var i=tab_start; i<tab_end; i++){
            var staff = getData[i]


            if(staff){
                let createElement = `<tr class = "employeeDetails">
                <td>${i+1}</td>
                <td>${staff.fName}</td>
                <td>${staff.positionVal}</td>
                <td>${staff.sDateVal}</td>
                <td>
                    <button onclick="readInfo('${staff.fName}', '${staff.positionVal}', '${staff.sDateVal}')"><i class="fa-regular fa-eye"></i></button>

                    <button onclick="editInfo('${i}', '${staff.fName}', '${staff.positionVal}', '${staff.sDateVal}')"><i class="fa-regular fa-pen-to-square"></i></button>


                    <button onclick = "deleteInfo(${i})"><i class="fa-regular fa-trash-can"></i></button>
                </td>
            </tr>`

                userInfo.innerHTML += createElement
                table.style.minWidth = "1400px"
            }
        }
    }


    else{
        userInfo.innerHTML = `<tr class="employeeDetails"><td class="empty" colspan="11" align="center">Sem dados disponíveis</td></tr>`
        table.style.minWidth = "1400px"
    }
}

showInfo()


function readInfo(fname, Position, SDate){
    fName.value = fname
    position.value = Position
    sDate.value = SDate

    darkBg.classList.add('active')
    popupForm.classList.add('active')
    popupFooter.style.display = "none"
    modalTitle.innerHTML = "Tarefa"
    formInputFields.forEach(input => {
        input.disabled = true
    })
}

function editInfo(id, fname, Position, SDate){
    isEdit = true
    editId = id

    // Find the index of the item to edit in the original data based on id
    const originalIndex = originalData.findIndex(item => item.id === id)

    // Update the original data
    originalData[originalIndex] = {
        id: id,
        fName: fname,
        positionVal: Position,
        sDateVal: SDate,
    }

    fName.value = fname
    position.value = Position
    sDate.value = SDate


    darkBg.classList.add('active')
    popupForm.classList.add('active')
    popupFooter.style.display = "block"
    modalTitle.innerHTML = "Atualize a tarefa"
    submitBtn.innerHTML = "Atualizar"
    formInputFields.forEach(input => {
        input.disabled = false
    })


    imgHolder.style.pointerEvents = "auto"
}

function deleteInfo(index){
    if(confirm("Deseja excluir a tarefa?")){
        originalData.splice(index, 1);
        localStorage.setItem("userProfile", JSON.stringify(originalData));
        
        // Update getData after deleting the record
        getData = [...originalData];

        preLoadCalculations()

        if(getData.length === 0){
            currentIndex = 1
            startIndex = 1
            endIndex = 0
        }
        else if(currentIndex > maxIndex){
            currentIndex = maxIndex
        }

        showInfo()
        highlightIndexBtn()
        displayIndexBtn()

        var nextBtn = document.querySelector('.next')
        var prevBtn = document.querySelector('.prev')

        if(Math.floor(maxIndex) > currentIndex){
            nextBtn.classList.add("act")
        }
        else{
            nextBtn.classList.remove("act")
        }


        if(currentIndex > 1){
            prevBtn.classList.add('act')
        }
    }
}


form.addEventListener('submit', (e)=> {
    e.preventDefault()

    const information = {
        id: Date.now(),
        fName: fName.value,
        positionVal: position.value,
        sDateVal: sDate.value,
    }

    if(!isEdit){
        originalData.unshift(information)
    }
    else{
        originalData[editId] = information
    }
    getData = [...originalData]
    localStorage.setItem('userProfile', JSON.stringify(originalData))

    submitBtn.innerHTML = "Enviar"
    modalTitle.innerHTML = "Preencha os campos"

    darkBg.classList.remove('active')
    popupForm.classList.remove('active')
    form.reset()


    highlightIndexBtn()
    displayIndexBtn()
    showInfo()

    var nextBtn = document.querySelector(".next")
    var prevBtn = document.querySelector(".prev")
    if(Math.floor(maxIndex) > currentIndex){
        nextBtn.classList.add("act")
    }
    else{
        nextBtn.classList.remove("act")
    }


    if(currentIndex > 1){
        prevBtn.classList.add("act")
    }
})


function next(){
    var prevBtn = document.querySelector('.prev')
    var nextBtn = document.querySelector('.next')

    if(currentIndex <= maxIndex - 1){
        currentIndex++
        prevBtn.classList.add("act")

        highlightIndexBtn()
    }

    if(currentIndex > maxIndex - 1){
        nextBtn.classList.remove("act")
    }
}


function prev(){
    var prevBtn = document.querySelector('.prev')

    if(currentIndex > 1){
        currentIndex--
        prevBtn.classList.add("act")
        highlightIndexBtn()
    }

    if(currentIndex < 2){
        prevBtn.classList.remove("act")
    }
}


function paginationBtn(i){
    currentIndex = i

    var prevBtn = document.querySelector('.prev')
    var nextBtn = document.querySelector('.next')

    highlightIndexBtn()

    if(currentIndex > maxIndex - 1){
        nextBtn.classList.remove('act')
    }
    else{
        nextBtn.classList.add("act")
    }


    if(currentIndex > 1){
        prevBtn.classList.add("act")
    }

    if(currentIndex < 2){
        prevBtn.classList.remove("act")
    }
}



tabSize.addEventListener('change', ()=>{
    var selectedValue = parseInt(tabSize.value)
    tableSize = selectedValue
    currentIndex = 1
    startIndex = 1
    displayIndexBtn()
})



filterData.addEventListener("input", ()=> {
    const searchTerm = filterData.value.toLowerCase().trim()

    if(searchTerm !== ""){

        const filteredData = originalData.filter((item) => {
            const fullName = (item.fName).toLowerCase()
            const position = item.positionVal.toLowerCase()

            return(
                fullName.includes(searchTerm) ||
                position.includes(searchTerm)
            )
        })

        // Update the current data with filtered data
        getData = filteredData
    }

    else{
        getData = JSON.parse(localStorage.getItem('userProfile')) || []
    }


    currentIndex = 1
    startIndex = 1
    displayIndexBtn()
})


displayIndexBtn()

$(document).ready(function(){
    $('#birth-date').mask('00/00/0000');
    $('#phone-number').mask('0000-0000');
  });