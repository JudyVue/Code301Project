'use strict';

page('/',
  homeController.loadAll,
  homeController.index);

page('/about', aboutController.reveal);

page('/result/:businessName',
  homeController.loadByName,
  homeController.index,
  homeController.returnSearch
);

page('/result', '/');
page('/category', '/');

page();
