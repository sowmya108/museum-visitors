const getTotal = (inputObject) => {
   return Object.keys(inputObject).reduce((sum, key) => sum + parseInt(inputObject[key] || 0), 0);
}

const getMaxValueKey = (inputObject) => {
    return Object.keys(inputObject).reduce((a, b) => parseInt(inputObject[a]) > parseInt(inputObject[b]) ? a : b);
}

const getMinValueKey = (inputObject) => {
    return Object.keys(inputObject).reduce((a, b) => parseInt(inputObject[a]) < parseInt(inputObject[b]) ? a : b);
}

module.exports = { getTotal, getMaxValueKey, getMinValueKey };
