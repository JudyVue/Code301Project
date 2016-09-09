'use strict';

(function(module) {
  var complaintController = {};

  Complaint.createTable();

  complaintController.index = function(ctx, next) {
    if(ctx.complaints.length) {
      complaintsView.index();
      next();
    }
    else{
      page('/');
    };
  };

  complaintController.returnSearch = function(ctx, next) {
    if(ctx.complaints.length) {
      complaintsView.returnSearch();
      next();
    }
    else{
      page('/');
    };
  };

  complaintController.returnSearchName = function(ctx, next) {
    if(ctx.complaints.length) {
      complaintsView.returnSearchName(ctx.complaints);
    }
    else{
      page('/');
    };
  };

// render for search by Category
  complaintController.returnCategorySearch = function(ctx, next) {
    if(ctx.bussinessesInCat.length) {
      ctx.complaintsByBussiness.forEach(function(ele){
        complaintsView.returnCategorySearch(ele);
      });
    }
    else{
      page('/');
    };
  };

// handle data for search by Category
  complaintController.loadAllByCategory = function(ctx, next) {
    ctx.complaints = [];
    var complaintsData = function(array) {
      ctx.complaints = array;
      next();
    };
    Complaint.searchByCategory(
      unescape(ctx.params.category), complaintsData);
  };

  complaintController.loadBizOfCategory = function(ctx, next) {
    ctx.bussinessesInCat = Complaint.getUniqueBusinessNames(
      ctx.complaints);
    next();

  };

  complaintController.loadByEachBizInCategory = function(ctx, next){
    Complaint.complaintsInCategory = ctx.complaints;
    ctx.complaintsByBussiness = Complaint.searchAllBusinesses(ctx)
      .sort(function(a, b){
        return a.totalResults - b.totalResults;
      });
    next();
  };

// handle data for search by businessName
  complaintController.loadByName = function(ctx, next) {
    ctx.complaints = [];
    var complaintsData = function(array) {
      ctx.complaints = array;
      next();
    };
    Complaint.searchByName(
      unescape(ctx.params.businessName), complaintsData);
  };

//load all data
  complaintController.loadAll = function(ctx, next) {
    var complaintData = function(allComplaints) {
      ctx.complaints = Complaint.allComplaints;
      next();
    };
    if (Complaint.allComplaints.length) {
      ctx.complaints = Complaint.allComplaints;
      next();
    }
    else{
      Complaint.updateData(complaintData);
    }
  };

  module.complaintController = complaintController;
})(window);
