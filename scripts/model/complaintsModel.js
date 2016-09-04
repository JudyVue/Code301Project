(function(module) {
  var complaintsObj = {};

  complaintsObj.all = [];

  complaintsObj.requestComplaints = function() {
    $.get('https://data.wa.gov/resource/fuxx-yeeu.json?&$$app_token=fi6PA6s5JICb5OJ323FV5nYsy')
    .done(function(data) {
      complaintsObj.all = data;
    })
    .done();
    console.log(complaintsObj);
  };

  complaintsObj.with = function(attr) {
    return complaintsObj.all.filter(function(complaint) {
      return complaint[attr];
    });
  };
  complaintsObj.requestComplaints();
  module.complaintsObj = complaintsObj;
})(window);
