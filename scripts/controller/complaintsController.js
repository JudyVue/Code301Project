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
      console.log('calling return search');
      complaintsView.returnSearch(ctx.complaints);

    }
    else{
      page('/');
    };
  };

  complaintController.loadByCategory = function(ctx, next) {
    ctx.complaints = [];
    var complaintsData = function(array) {
      ctx.complaints = array;
      next();
    };
    Complaint.searchByCategory(
      unescape(ctx.params.category), complaintsData);
  };

  complaintController.loadBizOfCategory = function(ctx, next) {
    var complaintsData = function(array) {
      ctx.bussinessesInCat = array;
      next();
    };
    Complaint.getUniqueBusinessNames(
      unescape(ctx.params.category), complaintsData);
  };

  complaintController.loadByEachBizInCategory = function(ctx, next) {
    var complaintsData = function(array) {
      ctx.complaints = array;
      next();
    };
    Complaint.searchAllBusinesses(
      ctx.bussinessesInCat, complaintsData);
  };

  complaintController.loadByName = function(ctx, next) {
    ctx.complaints = [];
    var complaintsData = function(array) {
      ctx.complaints = array;
      next();
    };
    Complaint.searchByName(
      unescape(ctx.params.businessName), complaintsData);
  };

  complaintController.loadAll = function(ctx, next) {
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


  module.complaintController = complaintController;
})(window);
