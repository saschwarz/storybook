import { mapArgsToTypes } from './args';

const stringType = { name: 'string' };
const numberType = { name: 'number' };
const booleanType = { name: 'boolean' };
const functionType = { name: 'function' };
const numArrayType = { name: 'array', value: numberType };
const boolObjectType = { name: 'object', value: { bool: booleanType } };

describe('mapArgsToTypes', () => {
  it('maps strings', () => {
    expect(mapArgsToTypes({ a: 'str' }, { a: { type: stringType } })).toEqual({ a: 'str' });
    expect(mapArgsToTypes({ a: 42 }, { a: { type: stringType } })).toEqual({ a: '42' });
  });

  it('maps numbers', () => {
    expect(mapArgsToTypes({ a: '42' }, { a: { type: numberType } })).toEqual({ a: 42 });
    expect(mapArgsToTypes({ a: 'a' }, { a: { type: numberType } })).toEqual({ a: NaN });
  });

  it('maps booleans', () => {
    expect(mapArgsToTypes({ a: 'true' }, { a: { type: booleanType } })).toEqual({ a: true });
    expect(mapArgsToTypes({ a: 'false' }, { a: { type: booleanType } })).toEqual({ a: false });
    expect(mapArgsToTypes({ a: 'yes' }, { a: { type: booleanType } })).toEqual({ a: false });
  });

  it('omits functions', () => {
    expect(mapArgsToTypes({ a: 'something' }, { a: { type: functionType } })).toEqual({});
  });

  it('omits unknown keys', () => {
    expect(mapArgsToTypes({ a: 'string' }, { b: { type: stringType } })).toEqual({});
  });

  it('deeply maps objects', () => {
    expect(
      mapArgsToTypes(
        {
          key: {
            arr: ['1', '2'],
            obj: { bool: 'true' },
          },
        },
        {
          key: {
            type: {
              name: 'object',
              value: {
                arr: numArrayType,
                obj: boolObjectType,
              },
            },
          },
        }
      )
    ).toEqual({
      key: {
        arr: [1, 2],
        obj: { bool: true },
      },
    });
  });

  it('deeply maps arrays', () => {
    expect(
      mapArgsToTypes(
        {
          key: [
            {
              arr: ['1', '2'],
              obj: { bool: 'true' },
            },
          ],
        },
        {
          key: {
            type: {
              name: 'array',
              value: {
                name: 'object',
                value: {
                  arr: numArrayType,
                  obj: boolObjectType,
                },
              },
            },
          },
        }
      )
    ).toEqual({
      key: [
        {
          arr: [1, 2],
          obj: { bool: true },
        },
      ],
    });
  });
});
