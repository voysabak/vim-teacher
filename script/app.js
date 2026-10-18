window.addEventListener('load', function () {
   const lessonsSelectables = document.querySelectorAll('.lesson-select');
   const lessonsContent = document.querySelectorAll('.lesson-content')

   console.log(lessonsContent, lessonsSelectables);
   

   for (let i = 0; i < lessonsSelectables.length; i++) {
    const element = lessonsSelectables[i];
    element.addEventListener('click', function () {
        let lessonId = this.getAttribute('href');
        for (let i = 0; i < lessonsContent.length; i++) {
            const element = lessonsContent[i];
            element.style.display = "none"
        }
        let lessonText = document.getElementById(lessonId)
        lessonText.style.display = "block"
        clearActiveClass();
        this.classList.add('active')
    })
   }

   function clearActiveClass() {
    for (let i = 0; i < lessonsSelectables.length; i++) {
        const element = lessonsSelectables[i];
        element.classList.remove('active')
    }
   }
});