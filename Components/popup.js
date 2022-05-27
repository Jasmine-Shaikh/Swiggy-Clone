function popupHTML(){
    return `<div class="alertBox">
    <span class="alertMSG"></span>
    <span class="closePopup">x</span>
  </div>`;
}

function showAlertPopupOverlay(textMSG){
    document.querySelector('#alertBoxUpperDiv1>.alertBox>.alertMSG').innerText = textMSG;
    document.querySelector('#alertBoxUpperDiv1').style.display = 'block';

    setTimeout(closeAlertPopup1,3000);
}

function showAlertPopupBody(textMSG){
    document.querySelector('#alertBoxUpperDiv2>.alertBox>.alertMSG').innerText = textMSG;
    document.querySelector('#alertBoxUpperDiv2').style.display = 'block';

    setTimeout(closeAlertPopup2,3000);
}

function closeAlertPopup1(){
    document.querySelector('#alertBoxUpperDiv1').style.display = 'none';
    document.querySelector('#alertBoxUpperDiv1>.alertBox>.alertMSG').innerText = '';
}

function closeAlertPopup2(){
    document.querySelector('#alertBoxUpperDiv2').style.display = 'none';
    document.querySelector('#alertBoxUpperDiv2>.alertBox>.alertMSG').innerText = '';
}

export {popupHTML, showAlertPopupOverlay, showAlertPopupBody,closeAlertPopup1,closeAlertPopup2};