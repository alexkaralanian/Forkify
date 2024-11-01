import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} seconds`));
    }, s * 1000);
  });
  q;
};

export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url);
    // Promise.race takes 2 promises: whichever rejects or fulfills first gets executed
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    // we throw err again to propagate error to the model (calling function)
    throw err;
  }
};
