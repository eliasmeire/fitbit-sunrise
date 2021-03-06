export const zeroPad = n => (n < 10 ? `0${n}` : n);

export const hex2a = hex => {
  var str = '';
  for (var index = 0; index < hex.length; index += 2) {
    var val = parseInt(hex.substr(index, 2), 16);
    if (val) str += String.fromCharCode(val);
  }
  return str.toString();
};

export const getMonospaceDigits = digits => {
  var ret = '';
  var str = digits.toString();
  for (var index = 0; index < str.length; index++) {
    var num = str.charAt(index);
    ret = ret.concat(hex2a('0x1' + num));
  }
  return ret;
};

export const parseDate = date => ({
  hours: date.getHours(),
  minutes: date.getMinutes()
});
