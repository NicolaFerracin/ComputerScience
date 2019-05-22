class Node {
  constructor(value, isComplete = false) {
    this.value = value;
    this.children = {};
    this.isComplete = isComplete;
  }
}

class Trie {
  constructor() {
    this.root = new Node('*');
  }

  insert(word) {
    let current = this.root;
    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      if (!current.children[letter]) {
        const newNode = new Node(letter);
        current.children[letter] = newNode;
      }

      if (i === word.length - 1) {
        current.children[letter].isComplete = true;
      }
      current = current.children[letter];
    }
  }

  find(word) {
    let current = this.root;
    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      if (!current.children[letter]) {
        return false;
      }
      current = current.children[letter];
    }
    return current.isComplete;
  }

  delete(word) {
    const depthFirstDelete = (node, index) => {
      if (index >= word.length) {
        return;
      }
      const letter = word[index];
      const nextNode = node.children[letter];
      if (!nextNode) {
        throw new Error('Word does not exist');
      }

      depthFirstDelete(nextNode, index + 1);

      if (index === word.length - 1) {
        if (!nextNode.isComplete) {
          throw new Error('Word does not exist');
        } else {
          nextNode.isComplete = false;
        }
      }

      if (!nextNode.isComplete) {
        if (Object.keys(nextNode.children).length === 0) {
          delete node.children[letter];
        }
      }
    };

    depthFirstDelete(this.root, 0);
  }

  *values() {
    const traverse = function*(node) {
      if (node) {
        yield node.value;
        for (let key in node.children) {
          yield* traverse(node.children[key]);
        }
      }
    };

    yield* traverse(this.root);
  }

  [Symbol.iterator]() {
    return this.values();
  }
}

module.exports = Trie;
