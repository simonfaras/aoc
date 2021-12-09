class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;

    this.length = 0;
  }

  toString() {
    let item = this.head;
    const arr = new Array(this.length);
    for (let i = 0; i < this.length; i++) {
      arr[i] = item.value;
      item = item.next;
    }

    return arr.toString();
  }

  append(value) {
    const item = { value };

    if (this.length === 0) {
      this.head = item;
      this.tail = item;
    } else {
      item.prev = this.tail;
      this.tail.next = item;
      this.tail = item;
    }

    this.length++;
    return item;
  }

  prepend(value) {
    const item = { value };
    if (this.length === 0) {
      this.head = item;
      this.tail = item;
    } else {
      item.next = this.head;
      this.head.prev = item;
      this.head = item;
      this.length++;
    }

    return item;
  }

  insertAfter(ref, value) {
    if (ref === this.tail) {
      return this.append(value);
    }
    const item = { value };

    item.next = ref.next;
    item.next.prev = item;
    item.prev = ref;
    ref.next = item;

    this.length++;
    return item;
  }

  insertBefore(ref, value) {
    if (ref === this.head) {
      return this.prepend(value);
    }
    const item = { value };
    item.prev = ref.prev;
    item.prev.next = item;
    item.next = ref;
    ref.prev = item;
    this.length++;

    return item;
  }

  remove(item) {
    if (this.head === item) {
      this.head = item.next;
    }
    if (this.tail === item) {
      this.tail = item.prev;
    }
    if (item.prev) {
      item.prev.next = item.next;
    }
    if (item.next) {
      item.next.prev = item.prev;
    }

    this.length--;
    return item;
  }
}

module.exports = LinkedList;
