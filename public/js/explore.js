const explorePages = document.getElementById('explore-pages')
const departments = document.getElementsByClassName('cards-container-body courses')
const backToExplorebtn = document.getElementById('backToExplore')



// recieve string of explore page name
function changePage(page) {
        switch(page) {
                case 'explore-page':
                        translatePages(0);
                        break;
                case 'course-page':
                        translatePages(1)
                        break;
                case 'exams-page':
                        translatePages(2)
                        break;
                case 'take-exam-page':
                        translatePages(3)
                        break;
        }
}
// this will recieve the translate value in order to show the page
function translatePages(value) {
        [...explorePages.children].forEach((el) => {
                el.style.transform  = 'translateX(-'+(value) + '00%)'
        })
}

//@param: recieve an id of course 
function renderCoursePage(id) {
        // add an data base request to course here

        // dommy objects
        let quizzes = [{
                header: 'quiz1-wasfi-183',
                description: 'this cover all chapter 1'
        },{
                header: 'quiz2-alherz-201',
                description: 'this cover all chapter 3'
                }]
        
        let majors = [{
                header: 'major1-wasfi-183',
                description: 'this cover all chapter 1'
        },{
                header: 'major2-alherz-201',
                description: 'this cover all chapter 3'
                }]
}