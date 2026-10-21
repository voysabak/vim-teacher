window.addEventListener("load", function () {
  const lessonsSelectables = document.querySelectorAll(".lesson-select");
  const lessonsContent = document.querySelectorAll(".lesson-content");

  console.log(lessonsContent, lessonsSelectables);

  for (let i = 0; i < lessonsSelectables.length; i++) {
    const element = lessonsSelectables[i];
    element.addEventListener("click", function () {
      let lessonId = this.getAttribute("href");
      for (let i = 0; i < lessonsContent.length; i++) {
        const element = lessonsContent[i];
        element.style.display = "none";
      }
      let lessonText = document.getElementById(lessonId);
      lessonText.style.display = "block";
      clearActiveClass();
      this.classList.add("active");
    });
  }

  function clearActiveClass() {
    for (let i = 0; i < lessonsSelectables.length; i++) {
      const element = lessonsSelectables[i];
      element.classList.remove("active");
    }
  }

  // -------------------------------------------------------------------

  const codesExamplesObj = {
    dataCode1: ``,

    dataCode2: `console.log(secondCode)`,
  };

  const toggleBtns = document.querySelectorAll(".example-btn");
  const editorDemoBlocks = document.querySelectorAll(".editor-content");

  for (let i = 0; i < toggleBtns.length; i++) {
    const element = toggleBtns[i];
    element.addEventListener("click", function () {
      let codeExampleNum = +this.getAttribute("id").at(-1);
      // console.log(codeExampleNum);
      let codeDemoBlock = document.getElementById(
        `editor-screen-${codeExampleNum}`,
      );
      // console.log(codeDemoBlock);

      // this.innerHTML = `<span class="icon">◼</span> <span class="btn-text">stop example</span>`;
      if (this.getAttribute("class") == "example-btn active") {
        this.innerHTML = `<span class="icon">▶</span> <span class="btn-text">show example</span>`;
        codeDemoBlock.classList.remove("active");
      } else {
        this.innerHTML = `<span class="icon">◼</span> <span class="btn-text">stop example</span>`;
        codeDemoBlock.classList.add("active");
      }
      this.classList.toggle("active");
      // console.log(this.getAttribute("class"));
    });
  }



  const vimCursor = document.querySelector('.vim-cursor');
  setInterval(() => {
    vimCursor.style.opacity = "0";
  }, 500);
  setInterval(() => {
    vimCursor.style.opacity = "0.5";
  }, 1000);
});
