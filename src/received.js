import { html } from 'artworkjs';
import styles from './received.css' assert { type: 'css' };
import { styled } from './utils.js';

const createRow = (email, onChange) => {
  const { row } = html.createStyled();
  if (email.read) {
    row.classList.add('read');
  }
  const { read, ...details } = email;
  const checkbox = html.create({
    tag: 'input',
    type: 'checkbox',
    checked: read,
    onClick: () => {
      email.read = !email.read;
      row.classList[email.read ? 'add' : 'remove']('read');
      onChange();
    }
  });
  row.append(...styled(details), checkbox);

  return {
    root: row,
    text: email.from + ' ' + email.subject + ' ' + email.message,
    email,
    checkbox
  };
}

const received = (emails, onChange) => {
  const { table } = html.createStyled();
  const rows = emails.map(email => createRow(email, onChange));
  table.append(...rows.map(r => r.root));

  const add = (email) => {
    const row = createRow(email, onChange);
    rows.push(row);
    table.prepend(row.root);
    onChange();
  }

  const readAll = () => {
    rows.forEach(row => {
      const { root, email, checkbox } = row;
      root.classList.add('read');
      email.read = true;
      checkbox.checked = true;
    });
  }

  const filter = (term) => {
    rows.forEach(row => {
      const { root, text } = row;
      const match = text.includes(term) || term === '';
      root.style.display = match ? '' : 'none';
    });
  }

  return html.register({
    root: table,
    props: { add, readAll, filter },
    styles,
    name: 'received-emails'
  });
}

export default received;
