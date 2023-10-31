(function () {
    const PASSWORD = 'a5211ce461fbfdfa1d891be3754643e4f47e0e04ce811a1652abd3257530b35c';
    const DIV_BACKGROUND_COLOR = 'var(--body-background)';
    const DIV_ID = 'draft_div';
    const TEXTDIV_ID = 'text_div';
    const INPUT_ID = 'draft_input';
  
    const createDiv = () => {
      const div = document.createElement('div');
      div.id = DIV_ID;
      div.style.display = 'flex';
      div.style.flexDirection = 'column';
      div.style.justifyContent = 'center';
      div.style.alignItems = 'center';
      div.style.position = 'fixed';
      div.style.zIndex = '10';
      div.style.top = 0;
      div.style.left = 0;
      div.style.width = '100%';
      div.style.height = '100%';
      div.style.backgroundColor = DIV_BACKGROUND_COLOR;
      return div;
    };
  
    const removeDiv = () => {
      const div = document.getElementById(DIV_ID);
      div.remove();
    };
  
    const handleSubmit = event => {
      event.preventDefault();
      const inputPassword = document.getElementById(INPUT_ID).value;
      const shaObj = new jsSHA('SHA-256', 'TEXT');
      shaObj.update(inputPassword);
      const inputPasswordHash =  shaObj.getHash('HEX');
      if (inputPasswordHash === PASSWORD) {
        removeDiv();
      }
    };

    const createForm = () => {
      const form = document.createElement('form');
      form.addEventListener('submit', handleSubmit);
      return form;
    };

    const createTextDiv = () => {
        const div = document.createElement('div');
        div.id = TEXTDIV_ID;
        div.style.padding = '20px 0px';
        div.style.zIndex = '10';
        div.style.width = '200px';
        div.style.backgroundColor = DIV_BACKGROUND_COLOR;
        div.style.color = 'var(--body-text-color)';
        div.innerHTML = '啊哦，这是隐私文章哦，请输入密码查看（防君子不防小人）';
        div.style.fontSize = '1.6rem';
        div.style.lineHeight = '2.4rem';
        div.style.whiteSpace = 'normal';
        div.style.wordBreak = 'break-all';
        return div;
    }
  
    const createInput = () => {
      const input = document.createElement('input');
      input.id = INPUT_ID;
      input.type = 'password';
      input.style.padding = '0px 10px';
      input.style.width = '200px';
      input.style.height = '4rem';
      input.style.borderRadius = '5px';
      input.style.border = 'none';
      input.style.outline = 'none';
      input.style.color = 'var(--card-text-color-main)';
      input.autocomplete = 'one-time-code';
      input.placeholder = 'Password';
      input.style.backgroundColor = 'var(--card-background)';
      return input;
    };
  
    const main = () => {
      const div = createDiv();
      const div2 = createTextDiv();
      const form = createForm();
      const input = createInput();
      form.appendChild(input);
      div.appendChild(div2);
      div.appendChild(form);
      document.body.appendChild(div);
    };
  
    main();

    console.log('好吧我相信你的能力能绕过这个防君子不防小人的加密了，但是真的值得吗？');
    console.log('好吧我相信你的能力能绕过这个防君子不防小人的加密了，但是真的值得吗？');
    console.log('好吧我相信你的能力能绕过这个防君子不防小人的加密了，但是真的值得吗？');
  })();