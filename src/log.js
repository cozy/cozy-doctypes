let logger

const normalize = lvl => {
  if (lvl === 'debug') {
    return 'log'
  } else {
    return lvl
  }
}

module.exports = {
  log: function (level, msg, msg2, msg3) {
    if (!logger) {
      console[normalize(level)].apply(console, msg, msg2, msg3)
    } else {
      logger.apply(this, arguments)
    }
  },

  registerLogger: function (_logger) {
    logger = _logger
  }
}
