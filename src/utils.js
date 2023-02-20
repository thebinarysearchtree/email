import { html } from 'artworkjs';

const values = (obj) => {
  const result = {};
  for (const [name, input] of Object.entries(obj)) {
    result[name] = input.value;
  }
  return result;
}

const clear = (obj) => {
  Object.values(obj).forEach(input => input.value = '');
}

const makeButtons = (options) => {
  const buttons = {};
  for (const [key, value] of Object.entries(options)) {
    const button = html.create({
      tag: 'button',
      innerText: key,
      onClick: value
    });
    buttons[key] = button;
  }
  return buttons;
}

const makeActivator = (pairs) => {
  return (activeTab) => {
    pairs.forEach(([button, tab]) => {
      if (tab === activeTab && !button.classList.contains('active')) {
        button.classList.add('active');
        tab.style.display = '';
      }
      else {
        button.classList.remove('active');
        tab.style.display = 'none';
      }
    });
  }
}

const styled = (obj, tag = 'div') => {
  return Object.entries(obj).map(([key, value]) => html.create({
    tag,
    className: key,
    innerText: value
  }));
}

export {
  values,
  clear,
  makeButtons,
  makeActivator,
  styled
}
