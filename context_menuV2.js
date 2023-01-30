
    document.oncontextmenu = function (){return false};
    // прикрепляем обработчик контекстного меню к элементу с классом "menu"
    var selectedCells = new Array();
    var data_status = "";
    document.addEventListener("mousedown", function(event){// $(document).bind("contextmenu", function(event) {
            // отменяем действие браузера по умолчанию
    
        if(event.button != 2){
          return;
        }
        e = document.getElementById(event.target.id);

        if (e==null || e==undefined){
          return
        }
        
    
        hasContext=false;
    
        hasContext = e.hasAttribute("context_menu");
        if(hasContext==true){
          menuString = e.getAttribute("context_menu");
        }
        else{
          return;
        }
        if(menuString==""){
          return;
        }
        
        
    
        createContextMenu(e, menuString);
    
        // показываем наше меню
        const pageWidth = document.documentElement.scrollWidth;
        const pageHeight = document.documentElement.scrollHeight;
    
        menu_top = event.pageY + 15;
        menu_left = event.pageX + 10;
    
        if(menu_left+400>pageWidth){
          menu_left = event.pageX -200; 
        }

        if(menu_left+500>pageHeight){
          menu_top = event.pageY -200; 
        }
    
        $("div.menu")
            .show()
            // привязываем координаты левого верхнего угла к координатам мыши
            .css({top: menu_top, left: menu_left});
            
    
    });
    
    // обработчик клика на странице
    // если кликнуть мимо меню — оно исчезнет
    $(document).click(function() {
        // смотрим, курсор сейчас находится на меню или нет
        // если на меню — он точно над каким-то элементом и этот элемент сейчас имеет псевдокласс hover
      isHovered = $("div.menu").is(":hover");
      
      if (event.target.tagName = "TD"){
        hasContext = event.target.hasAttribute("context_menu");
        if(hasContext==true){
            
            // selecteCells(event);
        }
      }
      // если курсор ни над одним элементом меню
      // if (isHovered == false){
          // скрываем меню
        $("div.menu").fadeOut("fast");
      // }
    });
    
    
    function createContextMenu(e, menuJSON){
        // menuJSON=JSON.parse(menuString);
       
        contextMenu = menuJSON;
        
        if(contextMenu.length==0){
          return
        }
        
      
        e_arr = document.getElementsByClassName('menu-button');
        for (elButton in e_arr){
          id=e_arr[elButton].id;
          if (id!=undefined && id!=""){
            b = document.getElementById(id);
            b.style.display="none";
          } 
        }
        indexBottun=1;

        context_menu_All = opportunity_map.context_menu;
        ids = context_menu_All.map(el => el.id);

        index_context_menu = ids.indexOf(menuJSON);
        if(index_context_menu==-1){
            return
        }
        contextMenu = context_menu_All[index_context_menu].menuJSON;
        for (key in contextMenu){
          subMenu = contextMenu[key];
          if(subMenu.hasOwnProperty("subMenu")){
            b = document.getElementById("button_list_"+indexBottun);
            b.style.display="";
            
            d = document.getElementById("div_button_list_"+indexBottun);
            d.textContent = subMenu.name_menu;
    
            arrSubMenu = subMenu.subMenu;
            indexSubBottun = 1;
            for (let keySubMenu in arrSubMenu){
              eSubMenu = arrSubMenu[keySubMenu];
              b_sub = document.getElementById("button_list_"+indexBottun+"_"+indexSubBottun);
              b_sub.style.display=""; 
              b_sub.setAttribute("status_description",eSubMenu.name);
              b_sub.setAttribute("status_timeBegin",eSubMenu.timeBegin);
              b_sub.setAttribute("status_timeEnd",eSubMenu.timeEnd);
              let status = eSubMenu.status;
              if(status==1){
              b_sub.setAttribute("onclick", "changeStatus(e, 1, this)");
              }else{
              b_sub.setAttribute("onclick", "changeStatus(e, 2, this)");
              }
              
              d_sub = document.getElementById("div_button_list_"+indexBottun+"_"+indexSubBottun);
              d_sub.textContent = eSubMenu.name;
              d_sub.setAttribute("status_description",eSubMenu.name);
              d_sub.setAttribute("status_timeBegin",eSubMenu.timeBegin);
              d_sub.setAttribute("status_timeEnd",eSubMenu.timeEnd);
    
              indexSubBottun=indexSubBottun+1;
            }
           
          }
          
          
          indexBottun=indexBottun+1;
        }
    
        button_arbitrary_time
        b = document.getElementById("button_arbitrary_time");
        b.style.display="";
        b.setAttribute("array_ref", e.getAttribute("array_ref"));
        b.setAttribute("day_ref", e.getAttribute("dayId"));
        b.setAttribute("dayDate", e.getAttribute("dayDate"));
        

        dayId = e.getAttribute("dayId")


        b = document.getElementById("button_delete");
        b.style.display="";
        b.setAttribute("onclick", "changeStatus(e, 0)");
        b = document.getElementById("button_lock");
        b.setAttribute("onclick", "changeStatus(e, 4)");
        b.style.display="";  

        b = document.getElementById("button_delete_tr");
        b.style.display="";
        b.setAttribute("onclick", "delete_tr(e,this)");
    
        b = document.getElementById("button_add_tr");
        b.style.display="";
        b.setAttribute("array_ref", e.getAttribute("array_ref"));

        b = document.getElementById("button_open_doc");
        b.style.display="";
        b.setAttribute("docRef", e.getAttribute("docRef"));

        b = document.getElementById("button_copy");
        b.setAttribute("onclick", "copyDayData(dayId)");
        b.style.display="";  
        b = document.getElementById("button_paste");
        if(clipBoardDayData!=""){
             
            description = "Вставить ("+clipBoardDayData.name+")"; 
            d = document.getElementById("div_button_list_paste");
            d.textContent = subMenu.name_menu;  
            d.textContent = description;
        }
        b.setAttribute("onclick", "pasteDayData(dayId)");
        b.style.display=""; 
    }
    