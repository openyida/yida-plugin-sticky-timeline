'use strict';
const { StickyTimeline } = require('./timeline');
function run() {
  Yida.app.customPage.addComponent({ componentName: 'OpenYidaStickyTimeline', view: StickyTimeline, mobileView: StickyTimeline });
}
module.exports = { run };
