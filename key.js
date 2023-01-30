var keyDown = false
document.addEventListener('keydown', function (e) {


   

    
    if (e.repeat || keyDown) {
        return

    }

    // console.log(e.keyCode);


    

    let arrowKey = [39, 37]// клавишы стрелки вправо влево



    if (e.ctrlKey && arrowKey.includes(e.keyCode)) {

        keySelectCell(e)


    }
    else if (e.ctrlKey && e.keyCode == 65) {

        keySelectAll(e)

    }
    else if (e.keyCode==46){
        keyDell(e)
    }
    else if (e.keyCode==67){
        keyCopy(e)
    }
    else if (e.keyCode==86){
        keyPaste(e)
    }

});

function keyCopy(e){
    keyDown = true
    e.preventDefault()
    

    copyDayData()

}

function keyPaste(e){

    keyDown = true
    e.preventDefault()
    

    pasteDayData()

}

function keyDell(e){
    keyDown = true
    e.preventDefault()
    
    if (selectedCells.length == 0) {
        return
    }
    changeStatus(e,0)
}

function keySelectAll(e) {



    keyDown = true
    e.preventDefault()

    querySelector = '.day-element'

    let elements = document.querySelectorAll(querySelector)

    if (elements.length == 0) {
        return
    }

    elements.forEach(element => {

        let dayId = element.getAttribute('dayId')
        if (dayId != '') {

            selecteCells(element.id)
        }
    });

    

}

function keySelectCell(e) {

    if (selectedCells.length == 0) {
        return
    }

    keyDown = true

    let curentCell = selectedCells[selectedCells.length - 1]


    


    if (curentCell != undefined && curentCell.hasAttribute('dayId')) {

        if (e.keyCode == 39) {
            nextCell = curentCell.nextElementSibling
        } else {
            nextCell = curentCell
        }

        


        if (nextCell != undefined && nextCell != null && nextCell.hasAttribute('dayId')) {
            selecteCells(nextCell.id)
        }

    }

}

document.addEventListener('keyup', function (e) {

  
        keyDown = false
    
})