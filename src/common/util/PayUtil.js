import urlencode from 'urlencode';

export function getPayParamsText(obj) {
  // for(let i in obj) {
  //   console.log(i);
  // }
  let paramsText = "";
  let keys = Object.keys(obj);
  keys.sort();
  keys.forEach(key => {
    let str = "";
    if(obj[key] instanceof Object) {
      str = JSON.stringify(obj[key]);
    } else {
      str = obj[key];
    }
    paramsText += key + "=" + str + "&";
  });
  paramsText = paramsText.substring(0, paramsText.length - 1);
  return paramsText;
}
