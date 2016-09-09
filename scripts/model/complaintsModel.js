'use strict';

(function(module) {

  //creates an object constructor that deletes backslashes from the business name field and replaces with a dash via Regex
  function Complaint(opts){
    Object.keys(opts).forEach(function(ele){
      this[ele] = opts[ele];
      this.business = opts.business.replace(/\//g, '-').replace(/\+/g, '-');
      this.businesscategory = opts.businesscategory.replace(/\//g, '-').replace(/\+/g, '-');
    }, this);
  }

  //'global' array of all complaints returned from AJAX call
  Complaint.allComplaints = [];

  //returns an array of unique field values from the SQL table based off the provided column
  Complaint.selectUniqueInColumn = function(column) {
    var allunique = [];
    webDB.execute('SELECT DISTINCT ' + column + ' FROM complaints ORDER BY ' + column + ' ASC;', function(rows){
      rows.forEach(function(ele){
        allunique.push(ele[column]);
      });
    });
    return allunique;
  };

  //creates an array of objects where the business name matches the user's query
  Complaint.searchByName = function(query, callback){
    var nameArray = [];
    webDB.execute('SELECT * FROM complaints WHERE business = "' + query + '"' + ';', function(rows){
      rows.forEach(function(ele){
        var complaint = new Complaint(ele);
        nameArray.push(complaint);
      });
      callback(nameArray);
    });
  };

  //creates an array of objects where the 'businesscategory' field matches the user's query
  Complaint.searchByCategory = function(query, callback){
    var categoryArray = [];
    webDB.execute('SELECT * FROM complaints WHERE businesscategory = "' + query + '"' + ';', function(rows){
      rows.forEach(function(ele){
        var complaint = new Complaint(ele);
        categoryArray.push(complaint);
      });
      callback(categoryArray);
    });
  };


  // after user enters their search query, this method returns the number of open claims that query has. The return value is then used to calculate a total percentage of open claims (used in complaintsView.returnSearch on complaintsView.js)
  Complaint.openClaims = function(array) {
    var totalOpenArray = [];
    array.map(function(ele) {
      if (ele.status !== 'Closed') {
        totalOpenArray.push(ele);
      }
    });
    return totalOpenArray.length;
  };

  // return most recent open claim after a seach query
  Complaint.getMostRecent = function(array) {
    var mostRecentComplaint = null;
    array.map(function(ele) {
      if (mostRecentComplaint === null) {
        mostRecentComplaint = ele.openeddate;
      } else {
        if (mostRecentComplaint.openeddate < ele.openeddate) {
          mostRecentComplaint = ele.openeddate;
        }
      }

    });
    return mostRecentComplaint;
  };

  //if user searches by category first, this method eliminates duplicate business names matching that category. E.g., if the category, 'Retail Sales' is chosen, and if 'Best Buy' appears three times under that category, Best Buy will only be shown once.
  Complaint.getUniqueBusinessNames = function(array) {
    var uniqueCategoryArray = array.map(function(ele){
      return ele.business;
    })
    .filter(function(ele, index, array) {
      return array.indexOf(ele) === index;
    });
    return uniqueCategoryArray;
  };

  //when user searches by category, this function returns all businsses that fall under that category and how many complaints are filed against that business
  Complaint.findComplaintsByBus = function(businessName, ctx) {
    var complaints = Complaint.complaintsInCategory.filter(function(complaint) {
      return complaint.business === businessName;
    });
    return {
      business: businessName,
      complaints: complaints,
      totalResults: complaints.length
    };
  };

  //searches for all businesses in given cateogry
  Complaint.searchAllBusinesses = function(ctx){
    return ctx.bussinessesInCat.map(Complaint.findComplaintsByBus, ctx);
  };


  //instantiates all the complaint objects in the main array Complaint.allComplaints
  Complaint.loadAll = function(rows){
    Complaint.allComplaints = rows.map(function(ele){
      return new Complaint(ele);
    });
  };

  //a function for the developer to drop the SQL table in the console for further testing
  Complaint.dropTable = function(){
    webDB.execute(
      'DROP TABLE complaints;'
    );
  };

  //creates columns for the SQL table after data is returned from the initial AJAX call
  Complaint.prototype.insertRecord = function(){
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO complaints (actualsavings, ' +
          'business, ' +
          'business_id, ' +
          'businesscategory, ' +
          'businesscity, ' +
          'businessstate, ' +
          'businessstreetline1, ' +
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

  //creates an empty SQL table
  Complaint.createTable = function(){
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS complaints (' +
        'id INTEGER PRIMARY KEY,' +
        'actualsavings VARCHAR,' +
        'business VARCHAR,' +
        'business_id INTEGER,' +
        'businesscategory VARCHAR,' +
        'businesscity VARCHAR,' +
        'businessstate VARCHAR,' +
        'businessstreetline1 VARCHAR,' +
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

  //populates the SQL table with data. If the user  does not already have a SQL table, the initial AJAX call occurs to pull in the data from the API. If they do have the SQL table, the complaint objects are instantiated in the array of Complaint.allComplaints
  Complaint.updateData = function(callback) {
    webDB.execute('SELECT * FROM complaints', function(rows) {
      //checks for SQL table, if none, AJAX call initiates
      if (!rows.length){
        $.get('https://data.wa.gov/resource/fuxx-yeeu.json?&$$app_token=fi6PA6s5JICb5OJ323FV5nYsy')
        //after data is retrieved, if the business name field contains 'Unknown,' or if there is no businesscategory field, then that data is filtered out and not included in the SQL table
       .done(function(data) {
         data.forEach(function(item){
           var business = item.business.trim();
           if (!business.includes('Unknown')){
             if(item.hasOwnProperty('businesscategory')){
               var complaint = new Complaint(item);
               complaint.insertRecord();
               Complaint.allComplaints.push(complaint);
             }
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

  //creating an empty table
  module.Complaint = Complaint;
})(window);
