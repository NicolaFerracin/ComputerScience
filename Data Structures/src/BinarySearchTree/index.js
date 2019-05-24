class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  add(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (current) {
      if (current.value > value) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else if (current.value < value) {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      } else {
        return;
      }
    }
    return;
  }

  contains(value) {
    let current = this.root;
    while (current) {
      if (current.value > value) {
        current = current.left;
      } else if (current.value < value) {
        current = current.right;
      } else {
        return true;
      }
    }
    return false;
  }

  delete(value) {
    let current = this.root;
    let parent = null;
    let direction = '';

    while (current) {
      if (current.value > value) {
        parent = current;
        current = current.left;
        direction = 'left';
      } else if (current.value < value) {
        direction = 'right';
        parent = current;
        current = current.right;
      } else {
        break;
      }
    }

    if (!current) {
      return;
    }

    const childrenCount = (current.left ? 1 : 0) + (current.right ? 1 : 0);

    // handle root
    if (this.root === current) {
      // no children
      if (!childrenCount) {
        this.root = null;
      }
      // 1 child
      else if (childrenCount === 1) {
        this.root = current.left ? current.left : current.right;
      }
      // 2 children
      else if (childrenCount === 2) {
        let replacement = this.root.left;
        let replacementParent = null;

        // find in-order predecessor
        while (replacement.right) {
          replacementParent = replacement;
          replacement = replacement.right;
        }

        if (replacementParent) {
          replacementParent.right = replacement.left;

          replacement.right = this.root.right;
          replacement.left = this.root.left;
        } else {
          replacement.right = this.root.right;
        }

        this.root = replacement;
      }
    } else {
      if (!childrenCount) {
        parent[direction] = null;
      } else if (childrenCount === 1) {
        parent[direction] = current.left ? current.left : current.right;
      } else if (childrenCount === 2) {
        let replacement = current.left;
        let replacementParent = current;

        // find in-order predecessor
        while (replacement.right) {
          replacementParent = replacement;
          replacement = replacement.right;
        }

        replacement.right = current.right;

        if (replacementParent !== current) {
          replacementParent.right = replacement.left;
          replacement.left = current.left;
        }

        parent[direction] = replacement;
      }
    }
  }

  traverse(process) {
    const inOrder = node => {
      if (node) {
        if (node.left) {
          inOrder(node.left);
        }
        process.call(this, node);
        if (node.right) {
          inOrder(node.right);
        }
      }
    };

    inOrder(this.root);
  }

  size() {
    let count = 0;
    this.traverse(() => count++);
    return count;
  }

  *values() {
    function* traverse(node) {
      if (node) {
        if (node.left) {
          yield* traverse(node.left);
        }

        yield node.value;

        if (node.right) {
          yield* traverse(node.right);
        }
      }
    }
    yield* traverse(this.root);
  }

  [Symbol.iterator]() {
    return this.values();
  }
}

module.exports = BST;
