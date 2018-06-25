let logger

const slice = [].slice

module.exports = {
  log: function (level, msg, msg2, msg3) {
    if (!logger) {
      const method = level === 'debug' ? 'log' : level
      return console[method].apply(console, slice.call(arguments))
    } else {
      return logger.apply(this, arguments)
    }
  },

  registerLogger: function (_logger) {
    logger = _logger
  }
}
