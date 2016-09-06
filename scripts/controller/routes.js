'use strict';

page('/', homeController.loadAll, homeController.index);
page('/results', resultsController.reveal);
page('/about', aboutController.reveal);


page();
