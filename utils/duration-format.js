function duration_format (minutes) {
    var num = minutes;
    var hours  = (num / 60);
    var rhours = Math.floor(hours);
    var minutes  = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + " hora(s) y " + rminutes + " minuto(s).";
}

module.exports = duration_format;