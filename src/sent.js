import { html } from 'artworkjs';
import styles from './sent.css' assert { type: 'css' };
import { styled } from './utils.js';

const create = (email) => {
  const { row } = html.createStyled();
  row.append(...styled(email));

  return row;
}

const sent = (emails) => {
  const { table } = html.createStyled();

  const items = emails.map(email => create(email));
  table.append(...items);

  const add = (email) => {
    emails.push(email);
    const row = create(email);
    table.prepend(row);
  }

  return html.register({
    root: table,
    props: { add },
    styles,
    name: 'sent-emails'
  });
}

export default sent;
