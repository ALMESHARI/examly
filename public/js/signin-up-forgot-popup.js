    let popupVar = document.getElementById("popup");
    let popupTickVar = document.getElementById("popup-tick");

    let forgotpopupVar = document.getElementById("forgotpopup");
    let forgotpopupTickVar = document.getElementById("forgotpopup-tick");

    let signuppopupVar = document.getElementById("signuppopup");
    let signuppopupickVar = document.getElementById("signuppopup-tick");

    
    //for upper-right-corner close button
    function terminalPopup(){
      popupVar.classList.remove("open-popup");
      popupTickVar.classList.remove("open-popup");

      forgotpopupVar.classList.remove("open-popup");
      forgotpopupTickVar.classList.remove("open-popup");

      signuppopupVar.classList.remove("open-popup");
      signuppopupickVar.classList.remove("open-popup");
    }
//    //to open popup after click button
    function openPopup(){
    signuppopupVar.classList.remove("open-popup");
    forgotpopupVar.classList.remove("open-popup");

    
      popupVar.classList.add("open-popup");
    }
//    //to close popup after click button (ex: signin, signup,...)
    function closePopup(){
    signuppopupVar.classList.remove("open-popup");
    forgotpopupVar.classList.remove("open-popup");
    
      popupVar.classList.remove("open-popup");
      popupTickVar.classList.add("open-popup");
    }
//      //to close popup after click button (ex: continue,...)
    function closePopupTick(){
    signuppopupVar.classList.remove("open-popup");
    forgotpopupVar.classList.remove("open-popup");

      popupTickVar.classList.remove("open-popup");
    } 

    

    //    //to open popup after click button
    function openSignupPopup(){
    popupVar.classList.remove("open-popup");
    forgotpopupVar.classList.remove("open-popup");


    signuppopupVar.classList.add("open-popup");
    }
//    //to close popup after click button (ex: signin, signup,...)
    function closeSignupPopup(){
    popupVar.classList.remove("open-popup");
    forgotpopupVar.classList.remove("open-popup");

    signuppopupVar.classList.remove("open-popup");
    signuppopupickVar.classList.add("open-popup");
    }
//      //to close popup after click button (ex: continue,...)
    function closeSignupPopupTick(){
    popupVar.classList.remove("open-popup");
    forgotpopupVar.classList.remove("open-popup");

    signuppopupickVar.classList.remove("open-popup");
    } 



    //    //to open popup after click button
    function openForgotPopup(){
    popupVar.classList.remove("open-popup");
    signuppopupVar.classList.remove("open-popup");

    forgotpopupVar.classList.add("open-popup");
    }
//    //to close popup after click button (ex: signin, signup,...)
    function closeForgotPopup(){
    popupVar.classList.remove("open-popup");
    signuppopupVar.classList.remove("open-popup");

    forgotpopupVar.classList.remove("open-popup");
    forgotpopupTickVar.classList.add("open-popup");
    }
//      //to close popup after click button (ex: continue,...)
    function closeForgotPopupTick(){
    popupVar.classList.remove("open-popup");
    signuppopupVar.classList.remove("open-popup");

    forgotpopupTickVar.classList.remove("open-popup");
    } 
