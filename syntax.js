(function () {
  const el = document.querySelector("pre#code");
  if (!el) return;

  const KEYWORDS = [
    "function", "return", "if", "else", "for", "while",
    "let", "const", "var", "true", "false", "null", "undefined",
    "new", "this", "class"
  ];

  const BUILTINS = [
    "console", "log", "Math", "Date", "Array", "Object", "String", "Number"
  ];

  function escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function highlight(code) {
    code = escapeHTML(code);

    // comments
    code = code.replace(/(\/\/.*)/g, '<span class="tok-comment">$1</span>');

    // strings
    code = code.replace(/(["'`])([^"'`]*?)\1/g, '<span class="tok-string">$&</span>');

    // numbers
    code = code.replace(/\b(\d+)\b/g, '<span class="tok-number">$1</span>');

    // keywords
    const kwRegex = new RegExp("\\b(" + KEYWORDS.join("|") + ")\\b", "g");
    code = code.replace(kwRegex, '<span class="tok-keyword">$1</span>');

    // built-ins
    const biRegex = new RegExp("\\b(" + BUILTINS.join("|") + ")\\b", "g");
    code = code.replace(biRegex, '<span class="tok-builtin">$1</span>');

    return code;
  }

  function update() {
    const selection = window.getSelection();
    const cursorOffset = selection.focusOffset;

    const text = el.textContent;
    el.innerHTML = highlight(text);

    // basic cursor restore (not perfect but works for simple cases)
    const range = document.createRange();
    const sel = window.getSelection();

    if (el.firstChild) {
      range.setStart(el.firstChild, Math.min(cursorOffset, el.firstChild.length));
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  // make editable if not already
  el.setAttribute("contenteditable", "true");

  el.addEventListener("input", update);

  // initial highlight
  update();
})();