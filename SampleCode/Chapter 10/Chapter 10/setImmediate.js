if (typeof setImmediate !== 'function') {
  window.setImmediate = function(fn) {
    setTimeout(fn, 0)
  }
};