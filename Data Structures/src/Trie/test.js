const assert = require('chai').assert;
const Trie = require('./index');

function assertTrieValues(tree, values = '') {
  const expected = ['*', ...values.split('')];
  const actual = [...tree.values()];
  assert.deepStrictEqual(actual, expected);
}

describe('Trie', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  describe('insert()', () => {
    it('should store an item when one item is added', () => {
      trie.insert('word');
      assertTrieValues(trie, 'word');
    });

    it('should store multiple items when multiple items are added', () => {
      trie.insert('word');
      trie.insert('cats');
      assertTrieValues(trie, 'word' + 'cats');
    });

    it('should mark last node as completed', () => {
      trie.insert('word');
      let current = trie.root;
      assert.strictEqual(current.isComplete, false);
      current = current.children.w;
      assert.strictEqual(current.isComplete, false);
      current = current.children.o;
      assert.strictEqual(current.isComplete, false);
      current = current.children.r;
      assert.strictEqual(current.isComplete, false);
      current = current.children.d;
      assert.strictEqual(current.isComplete, true);
    });

    it('should mark new word last node as completed', () => {
      trie.insert('words');
      trie.insert('word');
      let current = trie.root;
      assert.strictEqual(current.isComplete, false);
      current = current.children.w;
      assert.strictEqual(current.isComplete, false);
      current = current.children.o;
      assert.strictEqual(current.isComplete, false);
      current = current.children.r;
      assert.strictEqual(current.isComplete, false);
      current = current.children.d;
      assert.strictEqual(current.isComplete, true);
      current = current.children.s;
      assert.strictEqual(current.isComplete, true);
    });
  });

  describe('find()', () => {
    it('should return true when word is in trie', () => {
      trie.insert('newword');
      assert.strictEqual(trie.find('newword'), true);
    });

    it('should return the correct value when find() is called multiple times', () => {
      trie.insert('newword');
      trie.insert('newcat');
      assert.strictEqual(trie.find('newword'), true);
      assert.strictEqual(trie.find('newcat'), true);
    });

    it('should return false when word is not in trie', () => {
      trie.insert('newword');
      assert.strictEqual(trie.find('word'), false);
    });
  });

  describe('delete()', () => {
    it('should delete a word', () => {
      trie.insert('word');
      assertTrieValues(trie, 'word');

      trie.delete('word');
      assertTrieValues(trie);
    });

    it('should remove only the given word', () => {
      trie.insert('word');
      trie.insert('cats');
      trie.insert('pear');
      assertTrieValues(trie, 'word' + 'cats' + 'pear');

      trie.delete('cats');
      assertTrieValues(trie, 'word' + 'pear');
    });

    it('should remove a word from the end up to when there is no overlap with other words', () => {
      trie.insert('cats');
      trie.insert('cat');
      assertTrieValues(trie, 'cats');

      trie.delete('cats');
      assertTrieValues(trie, 'cat');
    });

    it('should not remove word if longer word exists', () => {
      trie.insert('cats');
      trie.insert('cat');
      assertTrieValues(trie, 'cats');

      trie.delete('cat');
      assertTrieValues(trie, 'cats');
    });

    it('should throw an error when removing a word that does not exist', () => {
      trie.insert('word');
      assertTrieValues(trie, 'word');

      assert.throws(() => {
        trie.delete('words');
      }, 'Word does not exist');
    });

    it('should throw an error when removing a word that is not a complete word', () => {
      trie.insert('cats');
      assertTrieValues(trie, 'cats');

      assert.throws(() => {
        trie.delete('cat');
      }, 'Word does not exist');
    });
  });

  ['values', Symbol.iterator].forEach(method => {
    describe(String(method) + '()', () => {
      it('should create array with root value when there are no items', () => {
        assert.deepStrictEqual([...trie[method]()], ['*']);
      });

      it('should traverse trie when there is one item', () => {
        trie.insert('word');

        assert.deepStrictEqual([...trie[method]()], ['*', ...'word'.split('')]);
      });

      it('should iterate over trie when there are multiple items', () => {
        trie.insert('word');
        trie.insert('cats');

        assert.deepStrictEqual(
          [...trie[method]()],
          ['*', ...'word'.split(''), ...'cats'.split('')]
        );
      });
    });
  });
});
