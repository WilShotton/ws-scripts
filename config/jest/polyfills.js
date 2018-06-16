
global.fetch = require('jest-fetch-mock')


window.requestAnimationFrame = callback => setTimeout(callback, 0)
window.cancelAnimationFrame = callback => setTimeout(callback, 0)
