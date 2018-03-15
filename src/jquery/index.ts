$(function() {
  bindDragEvent();
})

function bindDragEvent() {
  $('.toolbar img').attr('draggable', 'true')
    .on('dragstart', (event) => {
      let orgEvent: DragEvent = <DragEvent>event.originalEvent;
      orgEvent.dataTransfer.setData('text', event.target.dataset['type'] || '');
    });

  $('.report-pannel').on('drop', (event) => {
    let orgEvent: DragEvent = <DragEvent>event.originalEvent;
    orgEvent.preventDefault();
    let ctrTransferData = orgEvent.dataTransfer.getData('text');
    if (!ctrTransferData) return;
  }).on('dragover', (event) => {
    event.originalEvent.preventDefault();
  });
}

var ReportChart = {};
var ReportFilter = {};
var ReportDecoration = {};