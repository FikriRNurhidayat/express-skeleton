String.prototype.capitalize = function() {
  tmp = this.split("")
  tmp[0] = tmp[0].toUpperCase();
  return tmp.join("")
}

String.prototype.decapitalize = function() {
  tmp = this.split("")
  tmp[0] = tmp[0].toLowerCase();
  return tmp.join("")
}
