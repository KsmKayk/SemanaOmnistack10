// Arquivo para separar stings para array

module.exports = function parseStringAsArray(arrayAsString) {
  return arrayAsString.split(",").map(tech => tech.trim());
};
