var MS_PER_SEC = 1000
var PADDING = 10 * MS_PER_SEC
var INTERVAL = 2 * MS_PER_SEC

var _lastTime = Date.now()

var _listeners = []
var _interval

function addEventListener ( callback ) {
  if ( typeof callback !== 'function' ) {
    throw new Error( 'Error! a callback function must be supplied.' )
  } else {
    if ( !_interval ) {
      _interval = setInterval( function () {
        var now = Date.now()
        var limit = ( _lastTime + INTERVAL + PADDING )
        if ( now > limit ) {
          var delta = ( now - limit )

          _listeners.forEach( function ( callback ) {
            callback( delta )
          } )
          // console.log( 'delta:' + ( now - limit ) )
        } else {
          // console.log( 'tick ' + ( new Date() ) )
        }
        _lastTime = now
      }, INTERVAL )
    }

    _listeners.push( callback )

    var off = function () {
      var i = _listeners.indexOf( callback )
      if ( _listeners.length === 0 ) {
        clearInterval( _interval )
        _interval = undefined
      }
      return _listeners.splice( i, 1 )
    }

    return off
  }
}

function init ( callback ) {
  if ( typeof callback === 'function' ) {
    return addEventListener( callback )
  }
}

init.addEventListener = addEventListener

module.exports = init
