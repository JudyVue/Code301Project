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



  Complaint.searchByName = function(query){
    var nameArray = [];
    webDB.execute('SELECT * FROM complaints WHERE business = "' + query + '"' + ';', function(rows){
      rows.forEach(function(ele){
        nameArray.push(ele);
      });
      console.log(nameArray, 'is the returned array when user searches by name');
    });
    return nameArray;
  };

  Complaint.searchByCategory = function(query){
    var categoryArray = [];
    webDB.execute('SELECT * FROM complaints WHERE businesscategory = "' + query + '"' + ';', function(rows){
      rows.forEach(function(ele){
        categoryArray.push(ele);
      });
      console.log(categoryArray, 'is the returned array when user searches by biz category');
    });
    return categoryArray;
  };

  Complaint.numOfLocs = function() {
  //return number of locations of business that matched searched name
  };

  Complaint.openClaims = function() {
  // return percentage of open claims of specific busness location
  };

  Complaint.numOfBusiness  = function() {
  // return num of business within a category
  };


  Complaint.loadAll = function(rows){
    //TODO: DONE Don't load if buisness name is unknown.
    Complaint.allComplaints = rows.map(function(ele){
      return new Complaint(ele);
    });
  };

  Complaint.dropTable = function(){
    webDB.execute(
      'DROP TABLE complaints;'
    );
    console.log('dropped table');
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
        $.get('https://data.wa.gov/resource/fuxx-yeeu.json?&$$app_token=fi6PA6s5JICb5OJ323FV5nYsy&$limit=50')
        .done(function(data) {
          data.forEach(function(item){
            //TODO: DONE load into table here.
            var business = item.business.trim();
            if (business !== 'Unknown') {
              console.log('business name is not unknown', item.business, typeof(item.business));
              var complaint = new Complaint(item);
              complaint.insertRecord();
              Complaint.allComplaints.push(item);
            }
            else {
              console.log('business name is unknown', item.business)
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
