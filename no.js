
// on--[evtType]--[action]--[propertyType] = "target propertyName propertyValue"
// TODO: js--[action]--[property]--self--when
(function() {
  function NoJS (dom) {
    this.js(dom)
  }

  NoJS.prototype.js = function (dom) {
    dom = dom || 'body';
    var this_ = this;
    document.querySelector(dom).querySelectorAll('[no-js]').forEach(function(el) {
      Object.keys(el.attributes).forEach(function(prop){
        var attr = el.attributes[prop]

        if (attr.name.indexOf('on--') === 0) {
          var parts = attr.name.split('--');
          var otherParts = attr.value.split(' ');

          var eventType = parts[1], action = parts[2], propertyType = parts[3];
          var target = otherParts[0];

          el.addEventListener(eventType, function(e){
            this_._handler(action, target, propertyType, otherParts.slice(1));
          })
        }
      })
    })
  }

  // propertyType can be attribute, class, id, dom
  // action can be add or remove
  NoJS.prototype._handler = function (action, target, propertyType, optionalArgs) {
    document.querySelectorAll(target).forEach(function(el){
      if (propertyType === 'class') {
        el.classList[action](optionalArgs[0])
      }

      else if (propertyType === 'attribute' || propertyType === 'id') {
        var propertyName = propertyType === 'id' ? 'id' : agrs[0];

        if (action === 'remove') {
          el.removeAttribute(propertyName)
        } else if (action === 'add') {
          var propertyValue = propertyType === 'id' ? optionalArgs[0] : agrs[1];
          el.setAttribute(propertyName, propertyValue);
        }

      }

      else if (propertyType === 'dom' && action === 'remove') {
        el.remove()
      }
    })
  }

  window.no = new NoJS();
})()