// Taken from https://raw.githubusercontent.com/humanwhocodes/computer-science-in-javascript/master/tests/data-structures/linked-list/linked-list.js

/**
 * @fileoverview Linked List tests
 */
/* global it, describe, beforeEach */

'use strict';

//-----------------------------------------------------------------------------
// Requirements
//-----------------------------------------------------------------------------

const assert = require('chai').assert;
const LinkedList = require('./index');

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

/**
 * Check that the contents of the list match the values of the array.
 * @param {LinkedList} list The list to check
 * @param {Array} values An array of values that should match.
 * @throws {AssertionError} If the values in the list don't match the
 *      values in the array.
 */
function assertListValues(list, values) {
  const listValues = [...list.values()];
  assert.deepStrictEqual(listValues, values);
}

//-----------------------------------------------------------------------------
// Tests
//-----------------------------------------------------------------------------

describe('LinkedList', () => {
  let list;

  beforeEach(() => {
    list = new LinkedList();
  });

  describe('add()', () => {
    it('should store an item when one item is added', () => {
      list.add(1);
      assertListValues(list, [1]);
    });

    it('should store multiple items when multiple items are added', () => {
      list.add(1);
      list.add(2);
      assertListValues(list, [1, 2]);
    });
  });

  describe('get()', () => {
    it('should return the first item when get(0) is called', () => {
      list.add(1);
      assert.strictEqual(list.get(0), 1);
    });

    it('should return the correct value when get() is called multiple times', () => {
      list.add(1);
      list.add(2);
      assert.strictEqual(list.get(0), 1);
      assert.strictEqual(list.get(1), 2);
    });

    it('should return undefined when get() is called with -1', () => {
      assert.strictEqual(list.get(-1), undefined);
    });

    it('should return undefined when get() is called with an out-of-range index in an empty list', () => {
      assert.strictEqual(list.get(1), undefined);
    });

    it('should return undefined when get() is called with an out-of-range index in a non-empty list', () => {
      list.add(1);
      list.add(2);
      assert.strictEqual(list.get(5), undefined);
    });
  });

  describe('remove()', () => {
    it('should remove an item when there is only one item', () => {
      list.add(1);
      assertListValues(list, [1]);

      assert.strictEqual(list.remove(0), 1);
      assertListValues(list, []);
    });

    it('should remove an item when multiple items are in the list and the middle item is removed', () => {
      list.add(1);
      list.add(2);
      list.add(3);
      assertListValues(list, [1, 2, 3]);

      // remove middle item
      assert.strictEqual(list.remove(1), 2);
      assertListValues(list, [1, 3]);
    });

    it('should remove an item when multiple items are in the list and the last item is removed', () => {
      list.add(1);
      list.add(2);
      list.add(3);
      assertListValues(list, [1, 2, 3]);

      // remove last item
      assert.strictEqual(list.remove(2), 3);
      assertListValues(list, [1, 2]);
    });

    it('should remove an item when multiple items are in the list and the first item is removed', () => {
      list.add(1);
      list.add(2);
      list.add(3);
      assertListValues(list, [1, 2, 3]);

      // remove first item
      assert.strictEqual(list.remove(0), 1);
      assertListValues(list, [2, 3]);
    });

    it('should throw an error when multiple items are in the list and an out-of-bounds index is used', () => {
      list.add(1);
      list.add(2);
      list.add(3);
      assertListValues(list, [1, 2, 3]);

      // remove unknown item
      assert.throws(() => {
        list.remove(5);
      }, 'Index out of bounds');
    });

    it('should throw an error when multiple items are in the list and a negative index is used', () => {
      list.add(1);
      list.add(2);
      list.add(3);
      assertListValues(list, [1, 2, 3]);

      // remove unknown item
      assert.throws(() => {
        list.remove(-1);
      }, 'Index out of bounds');
    });

    it('should throw an error when the list is empty', () => {
      assert.throws(() => {
        list.remove(0);
      }, 'Index out of bounds');
    });
  });

  ['values', Symbol.iterator].forEach(method => {
    describe(String(method) + '()', () => {
      it('should create empty array when there are no items', () => {
        assert.deepStrictEqual([...list[method]()], []);
      });

      it('should iterate over list when there is one item', () => {
        list.add(1);

        assert.deepStrictEqual([...list[method]()], [1]);
      });

      it('should iterate over list when there are multiple items', () => {
        list.add(1);
        list.add(2);
        list.add(3);

        assert.deepStrictEqual([...list[method]()], [1, 2, 3]);
      });
    });
  });
});
