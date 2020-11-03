/**
 * Verkefni 8 – Caesar dulmál með vefviðmóti
 *
 * Verður að passa _nákvæmlega_ við gefið HTML, mun annars brotna.
 * Þ.e.a.s., ekki þarf að skrifa meðhöndlun á HTML elementum sem vantar
 */

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode (str, n, alphabet = '')
{
  return shifter(str, alphabet, n);
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n, alphabet = '') {
  return shifter(str, alphabet, alphabet.length - n);
}


/**
 * Generate shifter alphabet
 *
 * @param {string} text to be shifted
 * @param {string} alphabet to be ysed
 * @param {number} shift by number
 * @return {string} shifted text
 */
function shifter (text, alphabet, shift)
{
  const position = shift % alphabet.length;
  const lower = alphabet.toLowerCase();
  const prepared_text = [...text.trim().toLowerCase()];
  const shifted = [[...(lower.slice(position) + lower.slice(0, position))], [...lower]];
  return prepared_text.reduce((acc, cur) => (acc += shifted[0][shifted[1].indexOf(cur)] ?? cur, acc), "");
}

const Caesar = (() => {
  // Default stafróf, uppfært þegar slegið inn í "alphabet"
  let alphabet = 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ';

  // Default type, uppfært af radio input
  let type = 'encode';

  // Default hliðrun, uppfært af "shift"
  let shift = 3;

  // text data
  let text = '';

  function init(el) {
    // Setja event handlera á viðeigandi element
    const range = el.querySelector('.shiftValue');
    el.querySelector('#alphabet').addEventListener('keyup', (e) => { alphabet = e.target.value });
    el.querySelector('.radio').addEventListener('click', (e) => { type = e.target.value });
    el.querySelector('#shift').addEventListener('change', (e) => { shift = e.target.value ; range.innerText = e.target.value});
    el.querySelector('#input').addEventListener('keyup', (e) => { text = e.target.value });

    shiftValue = el.querySelector('.shiftValue')
    result = el.querySelector('.result');

    const compute = () =>
    {
      if (alphabet.length > 0 && text.length > 0)
      {
        result.innerText = type === 'encode' ? encode(text, shift, alphabet) : decode(text, shift, alphabet);
      }
    }
    el.addEventListener('change', e => compute());
    el.addEventListener('click', e => compute());
    el.addEventListener('keyup', e => compute());
  }


  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const ceasarForm = document.querySelector('.ceasar');

  Caesar.init(ceasarForm);
});