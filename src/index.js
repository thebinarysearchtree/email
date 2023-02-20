import { html } from 'artworkjs';
import sendForm from './form.js';
import receivedList from './received.js';
import sentList from './sent.js';
import styles from './home.css' assert { type: 'css' };
import { makeButtons, makeActivator } from './utils.js';

const receivedEmails = [
  {
    from: 'elon@tesla.com',
    subject: 'cybertruck order',
    message: 'Hi Andrew, your order is on its way',
    read: false
  },
  {
    from: 'hitomi@gmail.com',
    subject: 'business deal',
    message: 'Yeah, I think that is a good idea',
    read: false
  }
];

const sentEmails = [
  {
    to: 'elon@tesla.com',
    subject: 're: cybertruck order',
    message: 'Thanks Elon.'
  },
  {
    to: 'hitomi@gmail.com',
    subject: 're: business deal',
    message: 'We will make lots of money!'
  }
];

const futureEmails = [
  {
    from: 'lykke@gmail.com',
    subject: 'new song',
    message: 'Hey, do you like my new song?'
  },
  {
    from: 'lana@gmail.com',
    subject: 'new song',
    message: 'What do you think of my new song?'
  }
];

const getEmail = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const email = { ...futureEmails[Math.round(Math.random() % 2)] };
      resolve(email);
    }, 200);
  });
}

const root = document.getElementById('root');

const home = () => {
  const { main, section, input } = html.create();

  let buttons, activate;
  const updateCount = () => buttons.received.innerText = `received (${receivedEmails.length})`;

  buttons = makeButtons({
    sent: () => activate(sentTab),
    received: () => activate(receivedTab),
    clear: null,
    check: async (button) => {
      button.disabled = true;
      const email = await getEmail();
      receivedEmails.push(email);
      receivedTab.add(email);
      button.disabled = false;
      updateCount();
    },
    read: (button) => {
      receivedTab.readAll();
      button.disabled = true;
    }
  });
  updateCount();

  const { sent, received, clear, check, read } = buttons;

  const sentTab = sentList(sentEmails);
  const receivedTab = receivedList(receivedEmails, () => read.disabled = receivedEmails.every(e => e.read));

  const form = sendForm((email) => sentTab.add(email));
  form.className = 'form';

  activate = makeActivator([
    [sent, sentTab],
    [received, receivedTab]
  ]);

  activate(sentTab);

  input.addEventListener('keyup', () => receivedTab.filter(input.value));

  const { toolbar, left, right } = html.createStyled();
  left.append(sent, received);
  right.append(input, clear, check, read);
  toolbar.append(left, right);

  section.append(toolbar, sentTab, receivedTab);
  main.append(form, section);

  return html.register({
    root: main,
    styles,
    name: 'home-page'
  });
}

const content = home();

root.append(content);
