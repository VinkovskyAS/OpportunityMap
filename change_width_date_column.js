// Сворачивание и разворачиване колонок

document.addEventListener('DOMContentLoaded', docReady);
function docReady()
{
    document.getElementById('report_tab').addEventListener('click', roleIn);
}
function roleIn(e)

{

  if(e.target.tagName != 'TH')
  {
    return;
  }
  else
  {
    querySelector = 'div[id$="'+e.target.id+'"]';
    m_div =  document.querySelectorAll(querySelector);
    // m_div = $(querySelector);
    // [id$="\\23"]
    let id_ = e.target.id.slice(0, 3);
    
    switch(id_)
    {
        case 'day':
          let object = document.getElementById(e.target.id);
        
        if (object.style.width == '100px')
        {
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