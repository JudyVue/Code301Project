'use strict';

page('/',
  homeController.loadAll,
  homeController.index);
// page('/results', resultsController.reveal);
page('/about', aboutController.reveal);

page('/result', '/');
page('/category', '/');

page('/result/:businessName',
  homeController.loadByName,
  homeController.index,
  homeController.returnSearch
);

// page('/category/:categoryName',
//   resultsController.loadByCategory,
//   homeController.index, complaintsView.returnSearch);

page();
