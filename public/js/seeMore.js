// closing/expanding cards container
const hideButtons =document.getElementsByClassName('hide-cards-btn')

Array.from(hideButtons).forEach(element => {
        element.addEventListener('click',(event)=>{
        event.target.previousElementSibling.classList.toggle('hidden-cards-container')
        if (!event.target.previousElementSibling.classList.contains('hidden-cards-container')) {
                element.innerHTML= '- See less'
        }
        else {
                element.innerHTML = '+ See more'
        }
})
});


