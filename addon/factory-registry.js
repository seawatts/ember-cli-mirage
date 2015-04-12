import { pluralize } from './utils/inflector';
import Ember from 'ember';
/*
 * This object loads factory definitions and builds objects
 * using them.
*/
export default function() {
  this.register = function(name, definition) {
    this._registry[name] = definition;
  };

  this.loadDefinitions = function(factoryMap) {
    var _this = this;
    // Store a reference to the factories
    this._factoryMap = factoryMap;

    // Create a collection for each factory
    Ember.keys(factoryMap).forEach(function(type) {
      _this.db.createCollection(pluralize(type));
    });
  };

  this.build = function(type, overrides) {
    var object = {};

    if (!this._registry[type]) {
      throw "You're trying to create a " + type + ", but no factory for this type was found";
    }

    var attrs = this._getAttrsForType(type);
    Ember.keys(attrs).forEach(function(key) {
      var type = typeof attrs[key];

      if (type === 'function') {
        object[key] = attrs[key].call(attrs, sequence);
      } else {
        object[key] = attrs[key];
      }
    });

    return object;
  };

  // This belongs on the server
  //this.create = function(type, overrides) {
    //var collection = pluralize(type);
    //var currentRecords = this.db[collection];
    //var sequence = currentRecords ? currentRecords.length: 0;
    //if (!this._factoryMap || !this._factoryMap[type]) {
      //throw "You're trying to create a " + type + ", but no factory for this type was found";
    //}
    //var OriginalFactory = this._factoryMap[type];
    //var Factory = OriginalFactory.extend(overrides);
    //var factory = new Factory();

    //var attrs = factory.build(sequence);
    //// if (overrides) {
    ////   Ember.keys(overrides).forEach(function(key) {
    ////     attrs[key] = overrides[key];
    ////   });
    //// }
    //return this.db[collection].insert(attrs);
  //};

  //this.createList = function(type, amount, overrides) {
    //var list = [];

    //for (var i = 0; i < amount; i++) {
      //list.push(this.create(type, overrides));
    //}

    //return list;
  //};
  /*
    Private methods
  */
  this._registry = {};

  this._getAttrsForType = function(type) {
    return this._registry[type];
  }

}

