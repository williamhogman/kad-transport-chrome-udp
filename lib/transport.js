/**
* @class kad-transport-chrome-udp/chrome-udp-transport
*/

"use strict"

const assert = require('assert'),
      kademlia = require('kad'),
      inherits = require('util').inherits,
      CustomContact = require('./contact')

/**
* Represents a custom transport adapter
* @constructor
* @param {object} contact
* @param {object} options
*/
function ChromeUDPTransport(contact, options) {
  if (!(this instanceof ChromeUDPTransport)) {
    return new ChromeUDPTransport(contact, options)
  }
  assert(contact instanceof CustomContact, 'Invalid contact supplied')
  assert(
    chrome && chrome.sockets && chrome.sockets.udp,
    "Missing API access in chrome"
  )
  this._udp = chrome.sockets.udp
  kademlia.RPC.call(this, contact, options)
}

inherits(ChromeUDPTransport, kademlia.RPC)

/**
* Setup your transport
* #_open
* @param {function} ready
*/
ChromeUDPTransport.prototype._open = function(ready) {
  this._udp.create({ bufferSize: 512 }, createInfo => {
    this._socketId = createInfo.socketId
    this._udp.bind(this._socketId, "0.0.0.0", this._contact.port, () => {
      this._udp.onReceive.addListener(this._handleReceive.bind(this))
      ready()
    })
  })
}

/**
 * Handles incoming messages
 * #_handleReceive
 */
ChromeUDPTransport.prototype._handleReceive = function(info) {
  this.receive(info.buffer)
}

/**
* Send a RPC to the given contact
* #_send
* @param {buffer} data
* @param {Contact} contact
*/
ChromeUDPTransport.prototype._send = function(data, contact) {
  chrome.sockets.udp.send(this._socketId, data, contact.address, contact.port, (sendInfo) => {
    assert(sendInfo.resultCode === 0, "Sending failed")
  })
}

/**
* Close your transport
* #_close
*/
ChromeUDPTransport.prototype._close = function() {
  chrome.sockets.udp.close(this.socket_id)
}

module.exports = ChromeUDPTransport
