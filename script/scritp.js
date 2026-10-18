const initialCode = `const { data } = await client.get('/user_timeline', {
  email: user.email,
  count: 100,
  tweet_mode: 'extended',
  created_at: created_at,
});`;

const editor = CodeMirror.fromTextArea(document.getElementById('vim-demo'), {
  lineNumbers: true,         // Нумерация строк
  mode: 'javascript',        // Подсветка JavaScript
  theme: 'dracula',          // Тёмная тема
  keyMap: 'vim',             // ВКЛЮЧАЕМ РЕЖИМ VIM!
  matchBrackets: true,
  tabSize: 2
});

// Устанавливаем начальный код
editor.setValue(initialCode);