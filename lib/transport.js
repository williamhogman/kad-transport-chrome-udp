/**
* @class kad-transport-boilerplate/custom-transport
*/

'use strict';

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

  kademlia.RPC.call(this, contact, options);
  this._open(contact, options);
}

inherits(CustomTransport, kademlia.RPC);

/**
* Setup your transport
* #_open
* @param {object} contact
* @param {object} options
*/
CustomTransport.prototype._open = function(contact, options) {
  // Whatever you need to do with your tranport to begin accepting connections
  // goes here. This is called in the constructor. Use the `contact` object
  // information to do this.
  //
  // In the case of an `AddressPortContact`, the `address` and `port`
  // properties are used to start a server.
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

/**
* Create a Contact
* #_createContact
* @param {object} options
*/
CustomTransport.prototype._createContact = function(options) {
  return new CustomContact(options);
};

module.exports = CustomTransport;
