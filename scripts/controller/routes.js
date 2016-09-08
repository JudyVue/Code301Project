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
  complaintController.loadByEachBizInCategory
);


page('/result', '/');
page('/category', '/');

page();
