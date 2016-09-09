'use strict';

page('/',
  complaintController.loadAll,
  complaintController.index);

page('/about', aboutController.reveal);

page('/result/:businessName',
  complaintController.loadByName,
  complaintController.index,
  complaintController.returnSearch
);

page('/category/:category',
  complaintController.loadAllByCategory,
  complaintController.loadBizOfCategory,
  complaintController.loadByEachBizInCategory,
  complaintController.index,
  complaintController.returnSearch
);


page('/result', '/');
page('/category', '/');

page();
