/**----------------------------------------------------------*
 *                         Main Menu                         *
 *-----------------------------------------------------------*/
const btnMenu = document.querySelectorAll('.nav-menu li');
const popupWindow = document.querySelectorAll('.pop-up>li');
const btnClose = document.querySelectorAll('button.close');
const btnCancel = document.querySelectorAll('button.cancel');

let n = 0;

const btnClick = () => {
    btnMenu.forEach((item, i, arr) => {
        item.addEventListener('click', () => {
            popupWindow[n].className = '';
            popupWindow[i].className = 'show';
            n = i;
        })
    });
};

const close = action => {
    action.forEach((item, i, arr) => {
        item.addEventListener('click', () => {
            popupWindow[n].className = '';
        })
    });
};

btnClick();
close(btnClose);
close(btnCancel);
