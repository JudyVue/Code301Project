(function(module) {
  function Complaint(opts){
    Object.keys(opts).forEach(function(ele, index, keys){
      this[ele] = opts[ele];
      //TODO: unpack geodata
    }, this);
  }

  Complaint.allComplaints = [];

  Complaint.selectUniqueInColumn = function(column) {
    var allunique = [];
    webDB.execute('SELECT DISTINCT ' + column + ' FROM complaints;', function(rows){
      rows.forEach(function(ele){
        allunique.push(ele[column]);
      });
    });
    return allunique;
  };


  Complaint.nameArray = [];
  Complaint.searchByName = function(query, callback){

    webDB.execute('SELECT * FROM complaints WHERE business = "' + query + '"' + ';', function(rows){
      rows.forEach(function(ele){
        var complaint = new Complaint(ele);
        Complaint.nameArray.push(complaint);
      });
      callback();
    });
  };

  Complaint.searchByCategory = function(query){
    var categoryArray = [];
    webDB.execute('SELECT * FROM complaints WHERE businesscategory = "' + query + '"' + ';', function(rows){
      rows.forEach(function(ele){
        categoryArray.push(ele);
      });
    });
    return categoryArray;
  };

  Complaint.openClaims = function(array) {
    // return percentage of open claims of specific business location
    var totalOpenArray = [];
    array.map(function(ele) {
      if (ele.status !== 'Closed') {
        totalOpenArray.push(ele);
      }
    });
    console.log('total open status claims: ' + totalOpenArray.length);
    return totalOpenArray.length;
  };

  Complaint.numOfLocs = function() {
  //return number of locations of business that matched searched name
  };


  Complaint.numOfBusiness = function() {
  // return num of business within a category
  };


  Complaint.loadAll = function(rows){
    Complaint.allComplaints = rows.map(function(ele){
      return new Complaint(ele);
    });
  };

  Complaint.dropTable = function(){
    webDB.execute(
      'DROP TABLE complaints;'
    );
  };

  Complaint.prototype.insertRecord = function(){
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO complaints (actualsavings, '+
          'business, '+
          'business_id, '+
          'businesscategory, '+
          'businesscity, '+
          'businessstate, '+
          'businessstreetline1, '+
          'businesszip, ' +
          'estimatedsavings, ' +
          'geocode0, ' +
          'geocode1, ' +
          'geocode_city, ' +
          'geocode_state, ' +
          'geocode_zip, ' +
          'complaint_id, ' +
          'naics, ' +
          'naicsname, ' +
          'openeddate, ' +
          'openedyear, ' +
          'status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);',
          'data': [this.actualsavings, this.business, this.business_id, this.businesscategory, this.businesscity, this.businessstate, this.businessstreetline1, this.businesszip, this.estimatedsavings, this.geocode0, this.geocode1, this.geocode_city, this.geocode_state, this.geocode_zip, this.complaint_id, this.naics, this.naicsname, this.openeddate, this.openedyear, this.status]
        }]
    );
  };

  Complaint.createTable = function(){
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS complaints (' +
        'id INTEGER PRIMARY KEY,'+
        'actualsavings VARCHAR,'+
        'business VARCHAR,'+
        'business_id INTEGER,'+
        'businesscategory VARCHAR,'+
        'businesscity VARCHAR,'+
        'businessstate VARCHAR,'+
        'businessstreetline1 VARCHAR,'+
        'businesszip INTEGER,' +
        'estimatedsavings VARCHAR,' +
        'geocode0 VARCHAR,' +
        'geocode1 VARCHAR,' +
        'geocode_city VARCHAR,' +
        'geocode_state VARCHAR,' +
        'geocode_zip VARCHAR,' +
        'complaint_id VARCHAR,' +
        'naics VARCHAR,' +
        'naicsname VARCHAR,' +
        'openeddate DATETIME,' +
        'openedyear VARCHAR,' +
        'status VARCHAR);',
    function(){
      console.log('Set up complaints table.');
    }
  );
  };

  Complaint.updateData = function(callback) {
    webDB.execute('SELECT * FROM complaints', function(rows) {
      if (!rows.length){
        $.get('https://data.wa.gov/resource/fuxx-yeeu.json?&$$app_token=fi6PA6s5JICb5OJ323FV5nYsy&$limit=10')
        .done(function(data) {
          data.forEach(function(item){
            //TODO: DONE load into table here.
            var business = item.business.trim();
            if (business !== 'Unknown') {
              var complaint = new Complaint(item);
              complaint.insertRecord();
              Complaint.allComplaints.push(complaint);
            }
            else {
              console.log('business name is unknown', item.business);
            }
          });
          callback();
        });
      }
      else{
        Complaint.loadAll(rows);
        callback();
      }
    });
  };

  Complaint.withAttribute = function(attr) {
    return Complaint.allComplaints.filter(function(complaint) {
      return complaint[attr];
    });
  };

  Complaint.createTable();
  module.Complaint = Complaint;
})(window);
