import { html, htmlFor } from 'artworkjs';
import styles from './form.css' assert { type: 'css' };
import { values, clear } from './utils.js';

const label = (inputs) => {
  return Object.entries(inputs).map(([name, input]) => {
    const { div, label } = html.create();
    label.innerText = name;
    input.required = true;
    if (input instanceof HTMLTextAreaElement) {
      input.rows = 10;
    }
    else {
      input.type = 'text';
    }
    htmlFor(label, input, name);
    div.append(label, input);
    return div;
  });
}

const sendForm = (onSubmit) => {
  const { 
    form,
    input: to,
    input: subject,
    textarea: message,
    p: error
  } = html.create();

  const inputs = {
    to,
    subject,
    message
  };

  const controls = label(inputs);

  const button = html.create({
    tag: 'button',
    type: 'submit',
    innerText: 'send'
  });

  message.addEventListener('input', (e) => {
    const overflow = message.value.length - 50;
    if (overflow > 0) {
      error.style.visibility = '';
      button.disabled = true;
      error.innerText = `Message is ${overflow} characters over the limit`;
    }
    else {
      error.style.visibility = 'hidden';
      button.disabled = false;
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = values(inputs);
    onSubmit(email);
    clear(inputs);
  });

  form.append(...controls, button, error);

  return html.register({
    root: form,
    styles,
    name: 'send-form'
  });
}

export default sendForm;
