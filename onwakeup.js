var MS_PER_SEC = 1000
var PADDING = 3000
var INTERVAL = 1 * MS_PER_SEC

var _lastTime = Date.now()

var _listeners = []
var _interval

function addEventListener (callback) {
  if (typeof callback !== 'function') {
    throw new Error('Error! a callback function must be supplied.')
  } else {
    if (!_interval) {
      _interval = setInterval(function () {
        var now = Date.now()
        var limit = (_lastTime + INTERVAL + PADDING)
        if (now > limit) {
          _listeners.forEach(function (callback) {
            callback()
          })
          console.log('delta:' + (now - limit))
        } else {
          console.log('tick ' + (new Date()))
        }
        _lastTime = now
      }, INTERVAL)
    }

    _listeners.push(callback)

    var off = function () {
      var i = _listeners.indexOf(callback)
      if (_listeners.length === 0) {
        clearInterval(_interval)
        _interval = undefined
      }
      return _listeners.splice(i, 1)
    }
  }
}

function init (callback) {
  if (typeof callback === 'function') {
    return addEventListener(callback)
  }
}

init.addEventListener = addEventListener

module.exports = init
