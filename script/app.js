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

  const codeLines = [
    "const test = 1;",
    "function sendGreeting() {",
    '    console.log("Hello, world!");',
    "}",
    "const test = 1;",
  ];

  let isRunning = false;
  let intervalId = null;
  let currentStep = 0;

  // Сценарий анимации: координаты курсора [строка, символ] на каждом шаге
  const steps = [
    { row: 0, col: 6 },
    { row: 1, col: 9 },
    { row: 2, col: 12 },
    { row: 2, col: 25 },
    { row: 4, col: 6 },
  ];

  const toggleBtn = document.getElementById("toggle-btn");
  const editorScreen = document.getElementById("editor-screen");
  const codeOutput = document.getElementById("code-output");

  // Функция отрисовки кода с учетом позиции курсора
  function renderCode(cursorRow, cursorCol) {
    codeOutput.innerHTML = "";

    codeLines.forEach((lineText, rIndex) => {
      const lineDiv = document.createElement("div");
      lineDiv.className = "code-line";

      // Простая имитация подсветки ключевых слов для красоты
      if (rIndex === 0 || rIndex === 4) {
        lineDiv.innerHTML = lineText.replace(
          "const",
          '<span class="keyword">const</span>',
        );
      } else if (rIndex === 1) {
        lineDiv.innerHTML = lineText
          .replace("function", '<span class="keyword">function</span>')
          .replace(
            "sendGreeting",
            '<span class="function">sendGreeting</span>',
          );
      } else if (rIndex === 2) {
        lineDiv.innerHTML = lineText
          .replace("console.log", '<span class="function">console.log</span>')
          .replace(
            '"Hello, world!"',
            '<span class="string">"Hello, world!"</span>',
          );
      } else {
        lineDiv.textContent = lineText;
      }

      // Если на этой строке должен стоять курсор
      if (rIndex === cursorRow) {
        let chars = lineText.split("");
        if (chars[cursorCol] !== undefined) {
          chars[cursorCol] =
            `<span class="vim-cursor">${chars[cursorCol]}</span>`;
          // Пересобираем строку с учетом вставленного курсора
          if (rIndex === 0 || rIndex === 4) {
            lineDiv.innerHTML = chars
              .join("")
              .replace("const", '<span class="keyword">const</span>');
          } else {
            lineDiv.textContent = "";
            lineDiv.innerHTML = chars.join("");
          }
        }
      }

      codeOutput.appendChild(lineDiv);
    });
  }

  // Запуск анимации шагов
  function startAnimation() {
    editorScreen.classList.add("active");
    toggleBtn.innerHTML =
      '<span class="icon">■</span> <span class="btn-text">stop example</span>';
    isRunning = true;
    currentStep = 0;

    renderCode(steps[0].row, steps[0].col);

    intervalId = setInterval(() => {
      currentStep++;
      if (currentStep >= steps.length) {
        currentStep = 0; // Зацикливаем анимацию
      }
      const step = steps[currentStep];
      renderCode(step.row, step.col);
    }, 800); // Скорость смены шагов (мс)
  }

  // Остановка анимации
  function stopAnimation() {
    clearInterval(intervalId);
    editorScreen.classList.remove("active");
    toggleBtn.innerHTML =
      '<span class="icon">▶</span> <span class="btn-text">show example</span>';
    isRunning = false;
  }

  // Обработчик клика по кнопке
  toggleBtn.addEventListener("click", () => {
    if (!isRunning) {
      startAnimation();
    } else {
      stopAnimation();
    }
  });
});
