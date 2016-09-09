'use strict';

page('/',
  complaintController.loadAll,
  complaintController.index);

page('/about', aboutController.reveal);

page('/result/:businessName',
  complaintController.loadByName,
  complaintController.index,
  complaintController.returnSearch,
  complaintController.returnSearchName
);

page('/category/:category',
  complaintController.loadAllByCategory,
  complaintController.loadBizOfCategory,
  complaintController.loadByEachBizInCategory,
  complaintController.index,
  complaintController.returnSearch,
  complaintController.returnCategorySearch
);


page('/result', '/');
page('/category', '/');

page();
