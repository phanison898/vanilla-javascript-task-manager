
export function getData(key) {
    let data;
    if (localStorage.getItem(key) === null) {
      data = [];
    } else {
      data = JSON.parse(localStorage.getItem(key));
    }
    return data;
  }
  
  export function setData(key, inputData) {
    let data = getData(key);
    data.push(inputData);
    localStorage.setItem(key, JSON.stringify(data));
  }
  
  export function modifyData(key, newData) {
    localStorage.setItem(key, JSON.stringify(newData));
  }
  