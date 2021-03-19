function splitData(rawData) {
  rawData.splice(0, 1);
  const categoryData = [];
  const values = [];
  const volumes = [];
  let prevVolume = 0;
  for (let i = 0; i < rawData.length; i++) {
    categoryData.push(rawData[i].splice(0, 1)[0].slice(2).replace(/(.{2})(.{2})/, '$1-$2-'));
    values.push([rawData[i][0], rawData[i][3], rawData[i][2], rawData[i][1], rawData[i][4]]);
    volumes.push([i, rawData[i][4], rawData[i][4] > prevVolume ? -1 : 1]);
    prevVolume = rawData[i][4];
  }

  return {
    categoryData: categoryData,
    values: values,
    volumes: volumes
  };
}

function calculateMA(dayCount, data) {
  const result = [];
  for (let i = 0, len = data.values.length; i < len; i++) {
    if (i < dayCount) {
      result.push('-');
      continue;
    }
    let sum = 0;
    for (let j = 0; j < dayCount; j++) {
      sum += data.values[i - j][1];
    }
    result.push(+(sum / dayCount).toFixed(0));
  }
  return result;
}


function xhrRequest(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => { if (xhr.readyState === 4) callback(eval(xhr.response)) };
  xhr.open('GET', url, true);
  xhr.send('');
}

export { splitData, calculateMA, xhrRequest };