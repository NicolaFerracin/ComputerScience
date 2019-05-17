class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
      return;
    }

    let current = this.head;
    while (current.next !== null) {
      current = current.next;
    }

    current.next = newNode;
  }

  get(index) {
    if (index < 0 || !this.head) {
      return undefined;
    }

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;

      if (!current) {
        return undefined;
      }
    }

    return current.data;
  }

  remove(index) {
    if (index < 0 || !this.head) {
      throw new Error('Index out of bounds');
    }

    if (index === 0) {
      const data = this.head.data;
      this.head = this.head.next;
      return data;
    }

    let current = this.head;
    let previous = null;
    for (let i = 0; i < index; i++) {
      previous = current;
      current = current.next;

      if (!current) {
        throw new Error('Index out of bounds');
      }
    }

    previous.next = current.next;

    return current.data;
  }

  *values() {
    let current = this.head;

    while (current !== null) {
      yield current.data;
      current = current.next;
    }
  }

  [Symbol.iterator]() {
    return this.values();
  }
}

module.exports = LinkedList;
