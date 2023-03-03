// vertical pages (explore, settigns.. etc)
menuButtons = document.querySelectorAll('.menu-element')
menuItemsNum = menuButtons.length//how many menu items depends on type of user
pages = document.getElementsByClassName('pages')[0]
pages.style.height=(menuItemsNum+'00%')


menuButtons.forEach((element,index) => {
        element.addEventListener('click',()=>{
                [...pages.children].forEach((el)=>{
                        el.style.transform = 'translateY(-' + (index) + '00%)'
                })
        })
});


//horizontal sub pages(e.g. explore pages)
// [...pages.children].forEach((el) => {
//         subpages = el.children.length -1  //includeing the link of css file
//         el.style.width=subpages+ '00%'
// })