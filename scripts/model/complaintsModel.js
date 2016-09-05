(function(module) {
  function Complaint(opts){
    Object.keys(opts).forEach(function(ele, index, keys){
      this[ele] = opts[ele];
    }, this);
  }

  Complaint.allComplaints = [];

  Complaint.loadAll = function(rows){
    Complaint.all = rows.map(function(ele){
      return new Complaint(ele);
      console.log('all complaints are loaded into Complaint.allComplaints');
    });
  };

  Complaint.createTable = function(){
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS complaints (' +
        'id INTEGER PRIMARY KEY,'+
        'actualsavings VARCHAR,'+
        'business VARCHAR,'+
        'business_id VARCHAR,'+
        'businesscategory VARCHAR,'+
        'businesscity VARCHAR,'+
        'businessstate VARCHAR,'+
        'businessstreetline1 VARCHAR,'+
        'businesszip VARCHAR,' +
        'estimatedsavings VARCHAR,' +
        'geocode0 VARCHAR,' +
        'geocode1 VARCHAR,' +
        'geocode_city VARCHAR,' +
        'geocode_state VARCHAR,' +
        'geocode_zip VARCHAR,' +
        'complaint_id VARCHAR,' +
        'naics VARCHAR,' +
        'naicsname VARCHAR,' +
        'openeddate VARCHAR,' +
        'openedyear VARCHAR,' +
        'status VARCHAR);',
    function(){
      console.log('Set up complaints table.');
    }
  );};

  Complaint.updateData = function() {
  //   webDB.execute('SELECT * FROM complaints', function(rows) {
  // );
  //   if (!rows.length){
      $.get('https://data.wa.gov/resource/fuxx-yeeu.json?&$$app_token=fi6PA6s5JICb5OJ323FV5nYsy')
      .done(function(data) {
        Complaint.allComplaints = data;
      });
    }
  //   else{
  //     Complaint.loadAll(rows);
  //   }
  // };

  Complaint.withAttribute = function(attr) {
    return Complaint.allComplaints.filter(function(complaint) {
      return complaint[attr];
    });
  };

  Complaint.createTable();
  Complaint.updateData();
  module.Complaint = Complaint;
})(window);
