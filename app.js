var selectedCells = new Array()
var clipBoardDayData = ''


$(document).click(function (e) {


    if (e.target.tagName = "TD") {
        hasContext = e.target.hasAttribute("dayID");
        if (hasContext == true) {

            selecteCells(e.target.id);

        }
    }

})

function selecteCells(id, doNotDelet = false) {
    elem = document.getElementById(id);



    if (elem.hasAttribute('opacity')) {
        readOnly = elem.getAttribute('opacity')
        if (readOnly != '1') {
            return
        }
    }


    if (elem.style.border == "") {

        elem.style.border = "2px solid #0000FF"
    }
    else {

        elem.style.border = ""
    }

    if (selectedCells.includes(elem) == false) {
        selectedCells.push(elem);
    }
    else {
        if (!doNotDelet) {
            i = selectedCells.indexOf(elem);
            selectedCells.splice(i, 1);

        }

    }

}

function deSelectCells() {
    selectedCells.forEach(function (elem) {
        try {
            elem.style.border = ''
        } catch {

        }
    })
    selectedCells = new Array
}

function createTable1c(days_array_JSON, tablebody_JSON, context_menu_JSON) {

    if (days_array_JSON != ''){
        days_array = JSON.parse(days_array_JSON)

        opportunity_map.change_days(days_array)
    }


    let tablebody_array = JSON.parse(tablebody_JSON)
    let context_menu_array = ''
    if (context_menu_JSON != '') {
        context_menu_array = JSON.parse(context_menu_JSON)
    }
    console.log(context_menu_array)
    // divContextMenu.contextMenuAll = context_menu_array
    opportunity_map.change_body(tablebody_array, context_menu_array)
}
function delete_tr(e, obj) {


    let array_ref = ''
    let hasAttribute = e.hasAttribute('array_ref')
    if (hasAttribute == true) {
        array_ref = e.getAttribute('array_ref')
    } else {
        return
    }

    let ref_array = opportunity_map.tablebody.map(el => el.refArray)
    let indexArray = ref_array.indexOf(array_ref)

    if (indexArray == -1) {
        return
    }

    // Сначала нужно првоерить, если удаляется строка не по копметенции по умолчанию то нужно нужно удалить записи в компетенции по умолчанию
    elem = opportunity_map.tablebody[indexArray]
    let isDefaultCompetence = elem.isDefaultCompetence
    if (!isDefaultCompetence) {
        daysArray = elem.days
        daysArray.forEach(element => {

            if (element.status != 0) {

                oldBoundDay = element.boundDay

                querySelector = `[dayId *= "${oldBoundDay}"]`



                let elem = document.querySelector(querySelector)
                let dayId = elem.getAttribute('dayId')
                let opacity = elem.getAttribute('opacity');
                if (opacity == '1') {

                    trID = elem.getAttribute('array_ref')

                    newElem = {
                        name: '',
                        date: element.date,
                        status: 0,
                        backgroundColor: '',
                        timeBegin: '',
                        timeEnd: '',
                        boundDay: ''

                    }

                    change_day(trID, newElem, dayId, true)
                }

            }



        });
    }

    //    Теперь можно удалить строку

    opportunity_map.tablebody.splice(indexArray, 1)


}

function add_tr(tr_string, old_string, context_menu_string) {
    let newString = JSON.parse(tr_string)

    let ref_array = opportunity_map.tablebody.map(el => el.refArray)
    let indexArray = ref_array.indexOf(newString.refArray)

    if (indexArray != -1 && !newString.isOutstaffing) {
        let textMassege = 'Сотрудник ' + newString.name + ' уже указан для данной компетенции'
        userMassege(textMassege)
        return
    }

    let context_menu_array = JSON.parse(context_menu_string)

    context_menu_array.forEach(function (elem) {
        opportunity_map.context_menu.push(elem)
    })


    indexArray = ref_array.indexOf(old_string)
    if (indexArray == -1) {
        return
    }
    // opportunity_map.tablebody.splice(indexArray + 1, 0, newString)
    opportunity_map.tablebody.push(newString)

}

function userMassege(textMassege) {
    modal_WindowData.showModal = true
    modal_WindowData.UserMesage = textMassege
}

function arbitrary_time(trID, dataJson, dayId) {

    let data = JSON.parse(dataJson)


    let daysArray = new Array


    if (selectedCells.length == 0) {
        daysArray.push(dayId)
    }
    else {
        selectedCells.forEach(function (elem) {
            daysArray.push(elem.getAttribute('dayId'))

        })
    }

    daysArray.forEach(function (elem) {

        change_day(trID, data, elem)
    })


    deSelectCells()

}

function changeStatus(e, dayStatus, buttonContextMenu = undefined) {

    let daysArray = new Array

    if (selectedCells.length == 0) {
        daysArray.push(dayId)
    }
    else {
        selectedCells.forEach(function (elem) {
            daysArray.push(elem.getAttribute('dayId'))

        })
    }

    let backgroundColor = ''
    let name = ''

    let timeBegin = ''
    let timeEnd = ''
    let rate = 0
    let numberOfHours = 0
    let className = 'day-element dash'

    if (buttonContextMenu != undefined) {

        timeBegin = buttonContextMenu.getAttribute('status_timeBegin')
        timeEnd = buttonContextMenu.getAttribute('status_timeEnd')
        name = buttonContextMenu.getAttribute('status_description')


    } else {

    }

    daysArray.forEach(function (elem) {

        querySelector = `[dayId = "${elem}"]`
        cell = document.querySelector(querySelector)



        let trID = cell.getAttribute('array_ref')
        let dayId = cell.getAttribute('dayId')
        let boundDay = cell.getAttribute('boundDay')


        if (dayStatus == 4) {
            backgroundColor = '#5A5A5A'
            name = 'Недоступен'
        }
        let data = {
            name: name,
            backgroundColor: backgroundColor,
            timeBegin: timeBegin,
            timeEnd: timeEnd,
            status: dayStatus,
            boundDay: boundDay,
            rate: rate,
            numberOfHours: numberOfHours,
            className: className,


        }

        change_day(trID, data, elem)

    })


    deSelectCells()


}

function change_day(trID, data, dayId, isBoundDayChange = false) {


    try {


        var ref_array = opportunity_map.tablebody.map(el => el.refArray)

        var indexArray = ref_array.indexOf(trID)

        var itemDays = opportunity_map.tablebody[indexArray].days

        var days_array = itemDays.map(el => el.dayId)

        var indexDay = days_array.indexOf(dayId)


        var dayData = itemDays[indexDay]

    } catch {
        return
    }
    let timeBegin = dayData.timeBegin
    let timeEnd = dayData.timeEnd
    let dayStatus = dayData.status
    let menuJSON = dayData.menuJSON
    let backgroundColor = dayData.backgroundColor
    let name = dayData.name
    let boundDay = dayData.boundDay
    let oldBoundDay = boundDay
    let isDefaultCompetence = dayData.isDefaultCompetence
    let readOnly = dayData.readOnly
    let rate = dayData.rate
    let numberOfHours = dayData.numberOfHours
    let className = dayData.className


    if (data.hasOwnProperty('className')){
        className = data.className
    }
    if (data.hasOwnProperty('rate')) {
        rate = data.rate
    }

    if (data.hasOwnProperty('numberOfHours')) {
        numberOfHours = data.numberOfHours
    }

    if (data.hasOwnProperty('readOnly')) {
        readOnly = data.readOnly
    }

    if (data.hasOwnProperty('timeBegin')) {
        timeBegin = data.timeBegin
    }
    if (data.hasOwnProperty('timeEnd')) {
        timeEnd = data.timeEnd
    }
    if (data.hasOwnProperty('status')) {
        dayStatus = data.status
    }
    if (data.hasOwnProperty('menuJSON')) {
        menuJSON = data.menuJSON
    }
    if (data.hasOwnProperty('backgroundColor')) {
        backgroundColor = data.backgroundColor
    }
    if (data.hasOwnProperty('name')) {
        name = data.name
    }

    if (isBoundDayChange && data.hasOwnProperty('boundDay')) {

        boundDay = data.boundDay
    }

    if (isDefaultCompetence && !isBoundDayChange) {


        boundDay = []
    }


    if ((!isDefaultCompetence || isBoundDayChange) && timeBegin != '') {
        backgroundColor = '#87CEFA'
        dayStatus = 2;
    } else if (!isDefaultCompetence && timeBegin != '') {
        backgroundColor = '#87CEFA'
        dayStatus = 2;
    } else if (timeBegin != '') {
        backgroundColor = '#1E90FF'
        dayStatus = 1;

    } else if (dayStatus == 0) {
        backgroundColor = ''

    } else if (dayStatus == 4) {
        backgroundColor = '#5A5A5A'

    } else {

    }

    newElem = {
        name: name,
        date: dayData.date,
        status: dayStatus,
        menuJSON: menuJSON,
        dayId: dayData.dayId,
        backgroundColor: backgroundColor,
        timeBegin: timeBegin,
        timeEnd: timeEnd,
        boundDay: boundDay,
        isDefaultCompetence: isDefaultCompetence,
        readOnly: readOnly,
        rate: rate,
        numberOfHours: numberOfHours,
        className: className,

    }
    opportunity_map.tablebody[indexArray].days.splice(indexDay, 1)
    opportunity_map.tablebody[indexArray].days.splice(indexDay, 0, newElem)
    // Начало.  Меняем значение у связанной кокмпетенции, Которая  не основная

    if (oldBoundDay.length != 0 && !isBoundDayChange) {

        oldBoundDay.forEach(function (oldBoundDay) {

            let querySelector = `[dayId *= "${oldBoundDay}"]`

            let elem = document.querySelector(querySelector)

            if (elem != null) {

                trID = elem.getAttribute('array_ref')
                DayIdBound = elem.getAttribute('dayId')

                if (isDefaultCompetence) {
                    dayStatus = 0
                    backgroundColor = ''
                    timeBegin = ''
                    timeEnd = ''
                    name = ''

                }


                newElem = {
                    name: name,
                    date: dayData.date,
                    status: dayStatus,
                    // menuJSON: menuJSON, 
                    // dayId: oldBoundDay,
                    backgroundColor: backgroundColor,
                    timeBegin: timeBegin,
                    timeEnd: timeEnd,
                    boundDay: [dayId],
                    readOnly: readOnly

                }

                change_day(trID, newElem, DayIdBound, true)
                // Начало. Удалим строку в связанной компетенции, если там больше нет данных о графике
                try {
                    let ref_array = opportunity_map.tablebody.map(el => el.refArray)
                    let indexArray = ref_array.indexOf(trID)
                    let itemDays = opportunity_map.tablebody[indexArray].days
                    let deleteRow = true
                    itemDays.forEach(function (elem) {
                        if (elem.timeBegin != '' || elem.timeEnd != '') {

                            deleteRow = false

                        }

                    })
                    if (deleteRow) {
                        opportunity_map.tablebody.splice(indexArray, 1)
                    }
                } catch { }
            }
        });
        // Конец. Удалим строку в связанной компетенции, если там больше нет данных о графике
    }
    // Конец.  Меняем значение у связанной кокмпетенции, Которая  не основная
}

function copyDayData(dayId) {

    console.log(dayId);

    if (selectedCells.length==0){
        querySelector = `[dayId *= "${dayId}"]`
        let elem = document.querySelector(querySelector)
        selectedCells.push(elem)
        console.log(elem);

    }

    selectedCells.forEach(element => {

        dayId = element.getAttribute('dayId')

        clipBoardDayData = findElementByDayId(dayId)


    });


    deSelectCells()


}

function pasteDayData(dayId) {

    console.log(dayId);

    if (selectedCells.length==0){
        querySelector = `[dayId *= "${dayId}"]`
        elem = document.querySelector(querySelector)
        selectedCells.push(elem)

    }

    selectedCells.forEach(element => {

        dayId = element.getAttribute('dayId')

        arrayElement = findElementByDayId(dayId)

        arrayElement.backgroundColor = clipBoardDayData.backgroundColor
        arrayElement.fontStyle = clipBoardDayData.fontStyle
        arrayElement.name = clipBoardDayData.name
        arrayElement.numberOfHours = clipBoardDayData.numberOfHours
        arrayElement.rate = clipBoardDayData.rate
        arrayElement.status = clipBoardDayData.status
        arrayElement.textColor = clipBoardDayData.textColor
        arrayElement.timeBegin = clipBoardDayData.timeBegin
        arrayElement.timeEnd = clipBoardDayData.timeEnd


    });


    deSelectCells()
}

function findElementByDayId(dayId) {
    let dataArray = opportunity_map.tablebody
    let findElement

    dataArray.forEach(element => {
        let daysArray = element.days

        daysArray.forEach(day => {
            if (day.dayId == dayId) {

                findElement = day

            }
        });
    });

    return findElement

}

function saveData() {
    dataJson = JSON.stringify(opportunity_map.tablebody)
    return dataJson
}

function showHotKeyHelp() {
    e = document.getElementById('hotKeyTable')
    opportunity_map = document.getElementById('opportunity_map')

    if (e.style.display == 'none') {
        e.style.display = "";
        opportunity_map.style.opacity = '0.1'
    } else {
        e.style.display = 'none'
        opportunity_map.style.opacity = ''

    }
}


