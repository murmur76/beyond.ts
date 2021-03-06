import assert = require('assert');
import Schema = require('../../lib/db/schema');
import Type = require('../../lib/db/schema/type');

// To pass tslint: unused variable
function handleUnused(value: any) {
  return;
}

describe('db.Schema', () => {
  describe('#constructor', () => {
    it('Create with Option', () => {
      let UserSchema = new Schema(1, {
        firstName: { type: Type.string },
        lastName: { type: Type.string },
        age: { type: Type.integer }
      });
      assert.equal(UserSchema.constructor, Schema);
    });

    describe('#validate default value', () => {
      it('default value of the integer type has to be integer', () => {
        assert.throws(
          () => {
            let integerSchema = new Schema(1, { integerField: { type: Type.integer, default: 3.4 } });
            handleUnused(integerSchema);
          },
          (err: Error) => {
            return (err instanceof Error) && err.message === 'default value of integerField(3.4) is not integer.';
          }
        );
      });

      it('default value of the float type has to be float', () => {
        assert.throws(
          () => {
            let floatSchema = new Schema(1, { floatField: { type: Type.float, default: "not float" } });
            handleUnused(floatSchema);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'default value of floatField("not float") is not float.';
          }
        );
      });

      it('default value of the string type has to be string', () => {
        assert.throws(
          () => {
            let stringSchema = new Schema(1, { stringField: { type: Type.string, default: true } });
            handleUnused(stringSchema);
          },
          (err: Error) => {
            return (err instanceof Error) && err.message === 'default value of stringField(true) is not string.';
          }
        );
      });

      it('default value of the boolean type has to be boolean', () => {
        assert.throws(
          () => {
            let booleanSchema = new Schema(1, { booleanField: { type: Type.boolean, default: "true" } });
            handleUnused(booleanSchema);
          },
          (err: Error) => {
            return (err instanceof Error) && err.message === 'default value of booleanField("true") is not boolean.';
          }
        );
      });

      it('default value of the date type has to be date', () => {
        assert.throws(
          () => {
            let dateSchema = new Schema(1, { dateField: { type: Type.date, default: "2015-05-29 01:41:43" } });
            handleUnused(dateSchema);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'default value of dateField("2015-05-29 01:41:43") is not date.';
          }
        );
      });

      it('default value of the array type has to be array', () => {
        assert.throws(
          () => {
            let arraySchema = new Schema(1, { arrayField: { type: Type.array, default: 5 } });
            handleUnused(arraySchema);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'default value of arrayField(5) is not array.';
          }
        );
      });

      it('default value of the objectId type has to be ObjectId', () => {
        assert.throws(
          () => {
            let objectIdSchema = new Schema(1, { objectIdField: { type: Type.objectId, default: "1234567890abcd123456789" } });
            handleUnused(objectIdSchema);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'default value of objectIdField("1234567890abcd123456789") is not objectId.';
          }
        );
      });


      it('success to create schema when the default type is correct', () => {
        let integerSchema = new Schema(1, { integerField: { type: Type.integer, default: 3 } });
        let floatSchema = new Schema(1, { floatField: { type: Type.float, default: 3.5 } });
        let stringSchema = new Schema(1, { stringField: { type: Type.string, default: "some value" } });
        let booleanSchema = new Schema(1, { booleanField: { type: Type.boolean, default: true } });
        let dateSchema = new Schema(1, { dateField: { type: Type.date, default: new Date("2015-05-29 01:41:43") } });
        let arraySchema = new Schema(1, { arrayField: { type: Type.array, default: [1], elementType: { type: Type.integer } } });

        assert.equal(integerSchema.constructor, Schema);
        assert.equal(floatSchema.constructor, Schema);
        assert.equal(stringSchema.constructor, Schema);
        assert.equal(booleanSchema.constructor, Schema);
        assert.equal(dateSchema.constructor, Schema);
        assert.equal(arraySchema.constructor, Schema);
      });
    });

    describe('#validate min/max value', () => {
      it('min value of the integer type has to be integer', () => {
        assert.throws(
          () => {
            let integerSchema = new Schema(1, { integerField: { type: Type.integer, min: 3.4 } });
            handleUnused(integerSchema);
          },
          (err: Error) => {
            return (err instanceof Error) && err.message === 'min value of integerField(3.4) is not integer.';
          }
        );
      });

      it('min value of the float type has to be float', () => {
        assert.throws(
          () => {
            let floatSchema = new Schema(1, { floatField: { type: Type.float, min: "not float" } });
            handleUnused(floatSchema);
          },
          (err: Error) => {
            return (err instanceof Error) && err.message === 'min value of floatField("not float") is not float.';
          }
        );
      });

      it('min value of the date type has to be date', () => {
        assert.throws(
          () => {
            let dateSchema = new Schema(1, { dateField: { type: Type.date, min: "2015-05-29 01:41:43" } });
            handleUnused(dateSchema);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'min value of dateField("2015-05-29 01:41:43") is not date.';
          }
        );
      });

      it('max value of the integer type has to be integer', () => {
        assert.throws(
          () => {
            let integerSchema = new Schema(1, { integerField: { type: Type.integer, max: 3.4 } });
            handleUnused(integerSchema);
          },
          (err: Error) => {
            return (err instanceof Error) && err.message === 'max value of integerField(3.4) is not integer.';
          }
        );
      });

      it('max value of the float type has to be float', () => {
        assert.throws(
          () => {
            let floatSchema = new Schema(1, { floatField: { type: Type.float, max: "not float" } });
            handleUnused(floatSchema);
          },
          (err: Error) => {
            return (err instanceof Error) && err.message === 'max value of floatField("not float") is not float.';
          }
        );
      });

      it('max value of the date type has to be date', () => {
        assert.throws(
          () => {
            let dateSchema = new Schema(1, { dateField: { type: Type.date, max: "2015-05-29 01:41:43" } });
            handleUnused(dateSchema);
          },
          (err: Error) => {
            return (err instanceof Error)
            && err.message === 'max value of dateField("2015-05-29 01:41:43") is not date.';
          }
        );
      });

      it('success to create schema when the min type is correct', () => {
        let minIntegerSchema = new Schema(1, { integerField: { type: Type.integer, min: 3 } });
        let minFloatSchema = new Schema(1, { floatField: { type: Type.float, min: 3.5 } });
        let minDateSchema = new Schema(1, { dateField: { type: Type.date, min: new Date("2015-05-29 01:41:43") } });

        let maxIntegerSchema = new Schema(1, { integerField: { type: Type.integer, max: 3 } });
        let maxFloatSchema = new Schema(1, { floatField: { type: Type.float, max: 3.5 } });
        let maxDateSchema = new Schema(1, { dateField: { type: Type.date, max: new Date("2015-05-29 01:41:43") } });

        assert.equal(minIntegerSchema.constructor, Schema);
        assert.equal(minFloatSchema.constructor, Schema);
        assert.equal(minDateSchema.constructor, Schema);
        assert.equal(maxIntegerSchema.constructor, Schema);
        assert.equal(maxFloatSchema.constructor, Schema);
        assert.equal(maxDateSchema.constructor, Schema);
      });


      it('boolean field cannot has min constraint.', () => {
        assert.throws(
          () => {
            let booleanSchema = new Schema(1, { booleanField: { type: Type.boolean, min: true } });
            handleUnused(booleanSchema);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'booleanField(boolean type) field cannot has min constraint.';
          }
        );
      });

      it('boolean field cannot has max constraint.', () => {
        assert.throws(
          () => {
            let booleanSchema = new Schema(1, { booleanField: { type: Type.boolean, max: true } });
            handleUnused(booleanSchema);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'booleanField(boolean type) field cannot has max constraint.';
          }
        );
      });

      it('string field cannot has min constraint.', () => {
        assert.throws(
          () => {
            let stringSchema = new Schema(1, { stringField: { type: Type.string, min: "str" } });
            handleUnused(stringSchema);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'stringField(string type) field cannot has min constraint.';
          }
        );
      });

      it('string field cannot has max constraint.', () => {
        assert.throws(
          () => {
            let stringSchema = new Schema(1, { stringField: { type: Type.string, max: "str" } });
            handleUnused(stringSchema);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'stringField(string type) field cannot has max constraint.';
          }
        );
      });

      it('array field cannot has min constraint.', () => {
        assert.throws(
          () => {
            let arraySchema = new Schema(1, { arrayField: { type: Type.array, min: [] } });
            handleUnused(arraySchema);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'arrayField(array type) field cannot has min constraint.';
          }
        );
      });

      it('array field cannot has max constraint.', () => {
        assert.throws(
          () => {
            let arraySchema = new Schema(1, { arrayField: { type: Type.array, max: [] } });
            handleUnused(arraySchema);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'arrayField(array type) field cannot has max constraint.';
          }
        );
      });

      it('embedding field cannot has min constraint.', () => {
        assert.throws(
          () => {
            let integerSchema = new Schema(1, { someField: { type: Type.integer } });
            let embeddingSchema = new Schema(1, { embeddingField: { type: Type.embedding, min: integerSchema } });
            handleUnused(embeddingSchema);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'embeddingField(embedding type) field cannot has min constraint.';
          }
        );
      });

      it('embedding field cannot has max constraint.', () => {
        assert.throws(
          () => {
            let integerSchema = new Schema(1, { someField: { type: Type.integer } });
            let embeddingSchema = new Schema(1, { embeddingField: { type: Type.embedding, max: integerSchema } });
            handleUnused(embeddingSchema);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'embeddingField(embedding type) field cannot has max constraint.';
          }
        );
      });

      it('objectId field cannot has min constraint.', () => {
        assert.throws(
          () => {
            let objectId = "123456789012";
            let objectIdSchema = new Schema(1, { objectIdField: { type: Type.objectId, min: objectId } });
            handleUnused(objectIdSchema);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'objectIdField(objectId type) field cannot has min constraint.';
          }
        );
      });

      it('objectId field cannot has max constraint.', () => {
        assert.throws(
          () => {
            let objectId = "123456789012";
            let objectIdSchema = new Schema(1, { objectIdField: { type: Type.objectId, max: objectId } });
            handleUnused(objectIdSchema);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'objectIdField(objectId type) field cannot has max constraint.';
          }
        );
      });

      it('min must less than max.', () => {
        assert.throws(
          () => {
            let floatField = new Schema(1, { floatField: { type: Type.float, max: 3.5, min: 4.0 } });
            handleUnused(floatField);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'floatField\'s min(4) has to less than max(3.5).';
          }
        );
      });
    });

    describe('#schema option', () => {
      it('embedding field with schema option should success', () => {
        let integerSchema = new Schema(1, { integerField: { type: Type.integer, max: 3 } });
        let embeddingSchma = new Schema(1, { embeddingField: { type: Type.embedding, schema: integerSchema } });

        assert.equal(embeddingSchma.constructor, Schema);
      });

      it('schema option of embedding field should be schema', () => {
        assert.throws(
          () => {
            let embeddingSchma = new Schema(1, { embeddingField: { type: Type.embedding, schema: <any>{ } } });
            handleUnused(embeddingSchma);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'schema option of embeddingField is not Schema.';
          }
        );
      });

      it('embedding field should have schema option.', () => {
        assert.throws(
          () => {
            let embeddingSchema = new Schema(1, { embeddingField: { type: Type.embedding } });
            handleUnused(embeddingSchema);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'embedding type(embeddingField) should have schema option.';
          }
        );
      });

      it('integer field cannot have schema option.', () => {
        assert.throws(
          () => {
            let integerSchema = new Schema(1, { someField: { type: Type.integer } });
            let integerSchema2 = new Schema(1, { integerField2: { type: Type.integer, schema: integerSchema } });
            handleUnused(integerSchema2);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'integer type(integerField2) cannot have schema option.';
          }
        );
      });

      it('float field cannot have schema option.', () => {
        assert.throws(
          () => {
            let integerSchema = new Schema(1, { someField: { type: Type.integer } });
            let floatSchema = new Schema(1, { floatField: { type: Type.float, schema: integerSchema } });
            handleUnused(floatSchema);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'float type(floatField) cannot have schema option.';
          }
        );
      });

      it('string field cannot have schema option.', () => {
        assert.throws(
          () => {
            let integerSchema = new Schema(1, { someField: { type: Type.integer } });
            let stringSchema = new Schema(1, { stringField: { type: Type.string, schema: integerSchema } });
            handleUnused(stringSchema);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'string type(stringField) cannot have schema option.';
          }
        );
      });

      it('boolean field cannot have schema option.', () => {
        assert.throws(
          () => {
            let integerSchema = new Schema(1, { someField: { type: Type.integer } });
            let booleanSchema = new Schema(1, { booleanField: { type: Type.boolean, schema: integerSchema } });
            handleUnused(booleanSchema);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'boolean type(booleanField) cannot have schema option.';
          }
        );
      });

      it('date field cannot have schema option.', () => {
        assert.throws(
          () => {
            let integerSchema = new Schema(1, { someField: { type: Type.integer } });
            let dateSchema = new Schema(1, { dateField: { type: Type.date, schema: integerSchema } });
            handleUnused(dateSchema);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'date type(dateField) cannot have schema option.';
          }
        );
      });

      it('array field cannot have schema option.', () => {
        assert.throws(
          () => {
            let integerSchema = new Schema(1, { someField: { type: Type.integer } });
            let arraySchema = new Schema(1, { arrayField: { type: Type.array, schema: integerSchema } });
            handleUnused(arraySchema);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'array type(arrayField) cannot have schema option.';
          }
        );
      });

      it('objectId field cannot have schema option.', () => {
        assert.throws(
          () => {
            let integerSchema = new Schema(1, { someField: { type: Type.integer } });
            let objectIdSchema = new Schema(1, { objectIdField: { type: Type.objectId, schema: integerSchema } });
            handleUnused(objectIdSchema);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'objectId type(objectIdField) cannot have schema option.';
          }
        );
      });
    });

    describe('#elementType option', () => {
      it('array field with elementType option should success', () => {
        let arraySchma = new Schema(1, { arrayField: { type: Type.array, elementType: { type: Type.integer, max: 3 } } });

        assert.equal(arraySchma.constructor, Schema);
      });

      it('array field should have elementType option.', () => {
        assert.throws(
          () => {
            let arraySchema = new Schema(1, { arrayField: { type: Type.array } });
            handleUnused(arraySchema);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'array type(arrayField) should have elementType option.';
          }
        );
      });

      it('elementType should have type field.', () => {
        assert.throws(
          () => {
            let arraySchema = new Schema(1, { arrayField: { type: Type.array, elementType: <any>{ } } });
            handleUnused(arraySchema);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'elementType({}) of arrayField should have type.';
          }
        );
      });

      it('elementType should valid.', () => {
        assert.throws(
          () => {
            let arraySchema = new Schema(1, { arrayField: { type: Type.array, elementType: { type: Type.integer, max: 3.3 } } });
            handleUnused(arraySchema);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'max value of of.arrayField(3.3) is not integer.';
          }
        );
      });

      it('integer field cannot have elementType option.', () => {
        assert.throws(
          () => {
            let integerSchema = new Schema(1, { integerField: { type: Type.integer, elementType: { type: Type.integer, max: 3 } } });
            handleUnused(integerSchema);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'integer type(integerField) cannot have elementType option.';
          }
        );
      });

      it('float field cannot have elementType option.', () => {
        assert.throws(
          () => {
            let floatSchema = new Schema(1, { floatField: { type: Type.float, elementType: { type: Type.integer, max: 3 } } });
            handleUnused(floatSchema);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'float type(floatField) cannot have elementType option.';
          }
        );
      });

      it('string field cannot have elementType option.', () => {
        assert.throws(
          () => {
            let stringSchema = new Schema(1, { stringField: { type: Type.string, elementType: { type: Type.integer, max: 3 } } });
            handleUnused(stringSchema);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'string type(stringField) cannot have elementType option.';
          }
        );
      });

      it('boolean field cannot have elementType option.', () => {
        assert.throws(
          () => {
            let booleanSchema = new Schema(1, { booleanField: { type: Type.boolean, elementType: { type: Type.integer, max: 3 } } });
            handleUnused(booleanSchema);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'boolean type(booleanField) cannot have elementType option.';
          }
        );
      });

      it('date field cannot have elementType option.', () => {
        assert.throws(
          () => {
            let dateSchema = new Schema(1, { dateField: { type: Type.date, elementType: { type: Type.integer, max: 3 } } });
            handleUnused(dateSchema);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'date type(dateField) cannot have elementType option.';
          }
        );
      });

      it('embedding field cannot have elementType option.', () => {
        assert.throws(
          () => {
            let integerSchema = new Schema(1, { someField: { type: Type.integer } });
            let embeddingSchema = new Schema(1, { embeddingField: { type: Type.embedding, elementType: { type: Type.integer, max: 3 }, schema: integerSchema } });
            handleUnused(embeddingSchema);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'embedding type(embeddingField) cannot have elementType option.';
          }
        );
      });

      it('objectId field cannot have elementType option.', () => {
        assert.throws(
          () => {
            let objectIdSchema = new Schema(1, { objectIdField: { type: Type.objectId, elementType: { type: Type.integer, max: 3 } } });
            handleUnused(objectIdSchema);
          },
          (err: Error) => {
            return (err instanceof Error) &&
              err.message === 'objectId type(objectIdField) cannot have elementType option.';
          }
        );
      });
    });
  });
});
