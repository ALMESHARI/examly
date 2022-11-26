// shift views in mobile between contacts and chat 
const menus = document.querySelector('.side-bar');
const chat = document.querySelector('.content-area');
const examly_icon = document.querySelector('#examly-logo');

chat.addEventListener('click', () => {
        chat.classList.toggle('view')
        menus.classList.toggle('view')
})
/*
change this effect to be for contacts (if he press any contact key he will be in the chat page)
*/
menus.addEventListener('click', () => {
        chat.classList.toggle('view')
        menus.classList.toggle('view')
})

function menuEffect(x) {
        x.classList.toggle("change");
}

