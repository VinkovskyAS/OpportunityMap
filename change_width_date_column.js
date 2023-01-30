// Сворачивание и разворачиване колонок
var dayCollapse = true
document.addEventListener('DOMContentLoaded', docReady);
function docReady() {
  document.getElementById('report_tab').addEventListener('click', roleIn);
  document.getElementById('collapseExpandDays').addEventListener('click', collapseExpandDays);
}

function collapseExpandDays() {
  let style = 'none'
  let width = '10px'
  
  if (dayCollapse) {
    style = ''
    width = '100px'
  }


  let table = document.getElementById('report_tab');

  let neededRow = table.rows[0]

  

  neededCells = neededRow.cells

  elems = Array.prototype.slice.call(neededCells);
  

  elems.forEach(function (elem) {

    collapseExpandDay(elem.id, style, width)
    


  })

  dayCollapse = !dayCollapse

}

function collapseExpandDay(dayId, style, width){

  let elemId = dayId.slice(0, 3);

    querySelector = 'div[id$="' + dayId + '"]';
    m_div = document.querySelectorAll(querySelector);

    

    if (elemId == 'day') {

      let object = document.getElementById(dayId);
      object.style.width = width;

      for (let e_div of m_div) {
        e_div.style.display = style;

      }


    }


}

function roleIn(e) {

  if (e.target.tagName != 'TH') {
    return;
  }
  else {
    querySelector = 'div[id$="' + e.target.id + '"]';
    m_div = document.querySelectorAll(querySelector);
    // m_div = $(querySelector);
    // [id$="\\23"]
    let id_ = e.target.id.slice(0, 3);

    switch (id_) {
      case 'day':
        let object = document.getElementById(e.target.id);

        if (object.style.width == '100px') {
          object.style.width = '10px';
          //   m_div =.;;//document.getElementsByClassName(e.target.id);
          for (let e_div of m_div) {
            e_div.style.display = "none";

          }


        }
        else {
          object.style.width = '100px';


          for (let e_div of m_div) {

            e_div.style.display = "";

          }

        }
        break;
      default:
        return;
        break;
    }
  }
} 