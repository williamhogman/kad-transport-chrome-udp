/**
* @class kad-transport-boilerplate/custom-transport
*/

'use strict';

var assert = require('assert');
var kademlia = require('kad');
var inherits = require('util').inherits;
var CustomContact = require('./contact');

/**
* Represents a custom transport adapter
* @constructor
* @param {object} contact
* @param {object} options
*/
function CustomTransport(contact, options) {
  if (!(this instanceof CustomTransport)) {
    return new CustomTransport(contact, options);
  }

  assert(contact instanceof CustomContact, 'Invalid contact supplied');
  kademlia.RPC.call(this, contact, options);
}

inherits(CustomTransport, kademlia.RPC);

/**
* Setup your transport
* #_open
* @param {function} ready
*/
CustomTransport.prototype._open = function(ready) {
  // Whatever you need to do with your tranport to begin accepting connections
  // goes here. This is called in the constructor. Use the `this._contact`
  // and `this._options` object information to do this, then call `ready()`.
  //
  setImmediate(ready);
};

/**
* Send a RPC to the given contact
* #_send
* @param {buffer} data
* @param {Contact} contact
*/
CustomTransport.prototype._send = function(data, contact) {
  // Kad will call this method anytime it needs to deliver a message to a peer.
  // The `data` is a Buffer of the serialized JSON-RPC message object.
  // The `contact` contains the information about the peer to which the message
  // needs to be delivered.
};

/**
* Close your transport
* #_close
*/
CustomTransport.prototype._close = function() {
  // Perform an "tear-down" logic here. If Kad encounters a problem and needs
  // shutdown the transport, it will call this method.
  //
  // Example might be closing any open connections.
};

module.exports = CustomTransport;
