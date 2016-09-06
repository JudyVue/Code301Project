'use strict';

(function(module) {
  var homeController = {};

  // homeController.reveal = function() {
  //   $('#home').show();
  //   $('#about').hide();
  // };

  homeController.index = function(ctx, next) {
    if(ctx.complaints.length) {
      complaintsView.index(ctx.complaints);
    }
    else{
      page('/');
    };
  };

  homeController.loadAll = function(ctx, next) {
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


  module.homeController = homeController;
})(window);
