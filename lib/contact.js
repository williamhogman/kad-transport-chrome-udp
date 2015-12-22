/**
* @class kad-transport-boilerplate/custom-contact
*/

'use strict';

var kademlia = require('kad');
var inherits = require('util').inherits;

/**
* Represent a contact (or peer)
* @constructor
* @param {object} options
*/
function CustomContact(options) {
  if (!(this instanceof CustomContact)) {
    return new CustomContact(options);
  }

  // Set appropriate properties for your `Contact` here based on the passed
  // `options` dictionary. Be sure to use assertions to ensure that the needed
  // data is available.

  kademlia.Contact.call(this, options);
}

inherits(CustomContact, kademlia.Contact);

/**
* Generate a NodeID by taking the SHA1 hash of the address and port
* #_createNodeID
*/
CustomContact.prototype._createNodeID = function() {
  return kademlia.utils.createID(
    // Pass in unique data from your `Contact` here to generate a Node ID
  );
};

module.exports = CustomContact;
