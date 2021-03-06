import _ = require('underscore');
import assert = require('assert');
import Document = require('../../lib/db/document');
import Schema = require('../../lib/db/schema');
import Type = require('../../lib/db/schema/type');
import db = require('../../lib/db');
import util = require('./util');

describe('#document', () => {
  before((done: MochaDone) => {
    util.connect().nodify(done);
  });

  after((done: MochaDone) => {
    util.close(true).nodify(done);
  });

  it('doc.objectId getter returns hex string of MongoDb ObjectId.', () => {
    let testSchema = new Schema(1, { });
    let testCollection = new db.Collection("beyondTestCollection", testSchema);
    assert.equal(testCollection.constructor, db.Collection);

    let hexString = "abcdef0123456789abcdef01";
    let oid = db.ObjectId(hexString);
    let doc = new Document({ _id: oid }, testCollection);
    assert.equal(doc.objectId, hexString);
  });

  it('Cannot set objectId.', () => {
    let testSchema = new Schema(1, { array: { type: Type.array, elementType: { type: Type.integer } }, name: { type: Type.string }, num: { type: Type.integer } });
    let testCollection = new db.Collection("beyondTestCollection", testSchema);
    assert.equal(testCollection.constructor, db.Collection);

    let hexString = "abcdef0123456789abcdef01";
    let oid = db.ObjectId(hexString);
    let rawDoc = { _id: oid, array: [ 1, 2, 3 ], name: 'string', num: 4 };
    let doc: any = new Document(rawDoc, testCollection);

    assert.equal(doc.name(), rawDoc.name);
    assert.equal(doc.num(), rawDoc.num);
    assert.deepEqual(doc.array(), rawDoc.array);

    let newHexString = "abcdef0123456789abcdef02";
    doc.objectId = newHexString;
    assert.equal(doc.objectId, hexString);
  });

  it('doc._id getter returns MongoDb ObjectId.', () => {
    let testSchema = new Schema(1, { });
    let testCollection = new db.Collection("beyondTestCollection", testSchema);
    assert.equal(testCollection.constructor, db.Collection);

    let hexString = "abcdef0123456789abcdef01";
    let oid = db.ObjectId(hexString);
    let doc = new Document({ _id: oid }, testCollection);
    assert(oid.equals(doc._id));
  });

  it('Cannot set doc._id ', () => {
    let testSchema = new Schema(1, { });
    let testCollection = new db.Collection("beyondTestCollection", testSchema);
    assert.equal(testCollection.constructor, db.Collection);

    let hexString = "abcdef0123456789abcdef01";
    let oid = db.ObjectId(hexString);
    let doc = new Document({ _id: oid }, testCollection);
    assert(oid.equals(doc._id));

    let newHexString = "abcdef0123456789abcdef02";
    let newOid = db.ObjectId(newHexString);
    doc._id = newOid;
    assert(oid.equals(doc._id));
  });

  it('JSON.stringify(doc) returns the stringified document.', () => {
    let testSchema = new Schema(1, { });
    let testCollection = new db.Collection("beyondTestCollection", testSchema);
    assert.equal(testCollection.constructor, db.Collection);

    let hexString = "abcdef0123456789abcdef01";
    let oid = db.ObjectId(hexString);
    let rawDoc = { _id: oid, array: [ 1, 2, 3 ], name: 'string', num: 4 };
    let doc = new Document(rawDoc, testCollection);
    assert.equal(JSON.stringify(rawDoc), JSON.stringify(doc));
  });

  it('JSON.stringify(doc) returns the stringified document of updated values.', () => {
    let testSchema = new Schema(1, { array: { type: Type.array, elementType: { type: Type.integer } }, name: { type: Type.string }, num: { type: Type.integer } });
    let testCollection = new db.Collection("beyondTestCollection", testSchema);
    assert.equal(testCollection.constructor, db.Collection);

    let hexString = "abcdef0123456789abcdef01";
    let oid = db.ObjectId(hexString);
    let rawDoc = { _id: oid, array: [ 1, 2, 3 ], name: 'string', num: 4 };
    let doc: any = new Document(rawDoc, testCollection);
    assert(_.isString(JSON.stringify(doc)));

    let newRawDoc = { _id: oid, array: [ 1, 2, 3 ], name: 'new string', num: 4 };
    doc.name(newRawDoc.name);
    assert(_.isString(JSON.stringify(doc)));
  });

  it('Document getter function return original value if not modified.', () => {
    let testSchema = new Schema(1, { array: { type: Type.array, elementType: { type: Type.integer } }, name: { type: Type.string }, num: { type: Type.integer } });
    let testCollection = new db.Collection("beyondTestCollection", testSchema);
    assert.equal(testCollection.constructor, db.Collection);

    let hexString = "abcdef0123456789abcdef01";
    let oid = db.ObjectId(hexString);
    let rawDoc = { _id: oid, array: [ 1, 2, 3 ], name: 'string', num: 4 };
    let doc: any = new Document(rawDoc, testCollection);

    assert.equal(doc.name(), rawDoc.name);
    assert.equal(doc.num(), rawDoc.num);
    assert.deepEqual(doc.array(), rawDoc.array);
  });

  it('Document getter function return updated value if not modified.', () => {
    let testSchema = new Schema(1, { array: { type: Type.array, elementType: { type: Type.integer } }, name: { type: Type.string }, num: { type: Type.integer } });
    let testCollection = new db.Collection("beyondTestCollection", testSchema);
    assert.equal(testCollection.constructor, db.Collection);

    let hexString = "abcdef0123456789abcdef01";
    let oid = db.ObjectId(hexString);
    let rawDoc = { _id: oid, array: [ 1, 2, 3 ], name: 'string', num: 4 };
    let doc: any = new Document(rawDoc, testCollection);

    assert.equal(doc.name(), rawDoc.name);
    assert.equal(doc.num(), rawDoc.num);
    assert.deepEqual(doc.array(), rawDoc.array);

    let newName = 'new name';
    let newArray = [ 1, 2, 3, 4, 5 ];
    doc.name(newName);
    assert.equal(doc.name(), newName);
    assert.equal(doc.num(), rawDoc.num);
    doc.array(newArray);
    assert.deepEqual(doc.array(), newArray);
  });

  it('Expose document.', () => {
    let testSchema = new Schema(1, { array: { type: Type.array, elementType: { type: Type.integer } }, name: { type: Type.string }, num: { type: Type.integer } });
    let testCollection = new db.Collection("beyondTestCollection", testSchema);
    assert.equal(testCollection.constructor, db.Collection);

    let hexString = "abcdef0123456789abcdef01";
    let oid = db.ObjectId(hexString);
    let rawDoc = { _id: oid, array: [ 1, 2, 3 ], name: 'string', num: 4 };
    let doc: any = new Document(rawDoc, testCollection);
    assert.deepEqual(rawDoc, doc.doc);

    let newRawDoc = { _id: oid, array: [ 1, 2, 3 ], name: 'new string', num: 4 };
    doc.name(newRawDoc.name);
    assert.deepEqual(newRawDoc, doc.doc);
  });
});
