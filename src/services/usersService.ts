import axios from 'axios';

export const getUsers = async () => {
  try {
    return await axios.get('https://run.mocky.io/v3/b34664cd-397c-4237-ab70-2bc777aed008');
  } catch (e) {
    return e;
  }
}
