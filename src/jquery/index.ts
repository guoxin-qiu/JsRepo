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
    if (ctrTransferData.indexOf('report') === 0) {
      ReportChart.createInstance({ top: event.offsetY, left: event.offsetX });
    }
  }).on('dragover', (event) => {
    event.originalEvent.preventDefault();
  });
}

let ReportChart = (function() {
  let VERSION = '1.0.0';
  let SupportedTypes = ['bar', 'line', 'grid', 'crosstab'];
  let DEFAULTS = {
    privateId: '',
    type: 'bar',
    datasource: '',
    pannelSelector: '.report-pannel',
    top: 0,
    left: 0
  };

  let getPrivateId = function() {
    return Date.now().toString();
  }

  let init = function(options?: object | undefined) {
    let OPTIONS = $.extend({}, DEFAULTS, options || {});
    OPTIONS.privateId = OPTIONS.privateId || getPrivateId();
    let html = `
    <div id="reportArea${OPTIONS.privateId}" class="area-container">
      <div class="area-content">
        need to be completed
      </div>
      <div class="area-tooltip">
        <span class="icono-crossCircle" data-command="remove" title="删除图表"></span>
        <span class="icono-locationArrow" data-command="location" title="设置区域属性"></span>
        <span class="icono-support" data-command="datasource" title="设置数据源"></span>
      </div>
    </div>`;

    let $control = $(html).css({ top: OPTIONS.top, left: OPTIONS.left, position: 'absolute' });

    $control.resizable({ minHeight: 100, minWidth: 100 })
      .draggable({ snap: true, containment: 'parent' });
    $control.on('click', '.area-tooltip span[data-command="remove"]', (event) => {
      if (confirm('Are you sure to remove this report chart?')) {
        $(`#reportArea${OPTIONS.privateId}`).remove();
      }
    }).on('click', '.area-tooltip span[data-command="location"]', (event) => {
      let $ctr = $(`#reportArea${OPTIONS.privateId}`);
      alert(`top: ${$ctr.css("top")}, left: ${$ctr.css("left")}, width: ${$ctr.css("width")}, height: ${$ctr.css("height")}`);
    }).on('click', '.area-tooltip span[data-command="datasource"]', (event) => {
      alert(event.target.dataset['command']);
    });

    $(OPTIONS.pannelSelector).append($control);
  }

  return {
    createInstance: init
  };
}());

let ReportFilter = {};
let ReportDecoration = {};