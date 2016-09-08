'use strict';

(function(module) {
  var homeController = {};

  Complaint.createTable();

  homeController.index = function(ctx, next) {
    if(ctx.complaints.length) {
      complaintsView.index();
      next();
    }
    else{
      page('/');
    };
  };

  homeController.returnSearch = function(ctx, next) {
    if(ctx.complaints.length) {
      console.log('calling return search');
      complaintsView.returnSearch(ctx.complaints);

    }
    else{
      page('/');
    };
  };

  homeController.loadByName = function(ctx, next) {
    ctx.complaints = [];
    var complaintsData = function(array) {
      ctx.complaints = array;
      next();
    };
    Complaint.searchByName(
      unescape(ctx.params.businessName), complaintsData);
  };

  homeController.loadAll = function(ctx, next) {
    var complaintData = function(allComplaints) {
      ctx.complaints = Complaint.allComplaints;
      next();
    };
    if (Complaint.allComplaints.length) {
      console.log('local data is being loaded into ctx');
      ctx.complaints = Complaint.allComplaints;
      next();
    }
    else{
      Complaint.updateData(complaintData);
    }
  };


  module.homeController = homeController;
})(window);
