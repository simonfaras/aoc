const LinkedList = require('./linkedList');

describe('LinkedList', () => {
	it('should create empty list when called with default constructor', () => {
		const list = new LinkedList();

		expect(list.length).toEqual(0);
	});

	it('should add the first item as head', () => {
		const list = new LinkedList();
		list.append(0);

		expect(list.head.value).toEqual(0);
	});

	it('should add the first item as tail', () => {
		const list = new LinkedList();
		list.append(0);

		expect(list.tail.value).toEqual(0);
	});

	it('should append item to list', () => {
		const list = new LinkedList();
		list.append(0);
		list.append(1);

		expect(list.toString()).toEqual('0,1');
	})

	it('should give correct prev reference when appending', () => {
		const list = new LinkedList();
		const head = list.append(0);
		const item = list.append(1);

		expect(item.prev).toBe(head);
	})

	it('should prepend item to list', () => {
		const list = new LinkedList();
		list.append(0);
		list.prepend(1);

		expect(list.toString()).toEqual('1,0');
	})

	it('should insert after', () => {
		const list = new LinkedList();
		list.append(0);
		const ref = list.prepend(1);
		list.insertAfter(ref, 2);

		expect(list.toString()).toEqual('1,2,0');
	})

	it('should give a correct prev reference when inserted', () => {
		const list = new LinkedList();
		const middle = list.append(1);
		const item = list.insertAfter(middle, 3);

		expect(item.prev).toBe(middle);
	})

	it('should do stuff', () => {
		const list = new LinkedList();
		let current = list.append(0)
		list.insertAfter(current, 1);
		list.insertAfter(current, 2);
		list.insertAfter(list.tail, 3);
		current = list.insertAfter(list.head, 4);

		expect(current.next.prev.value).toEqual(current.value)
	})

	it('should should remove a head item', () => {
		const list = new LinkedList();
		list.append(0);
		list.append(1);
		list.remove(list.head);

		expect(list.toString()).toEqual('1');
	})

	it('should remove a tail item', () => {
		const list = new LinkedList();
		list.append(0);
		list.append(1);
		list.remove(list.tail);

		expect(list.toString()).toEqual('0');
	})

	it('should insert before head', () => {
		const list = new LinkedList();
		list.append(0);
		list.append(1);
		list.insertBefore(list.head, 2);

		expect(list.toString()).toEqual('2,0,1');
	})

	it('should insert before tail', () => {
		const list = new LinkedList();
		list.append(0);
		list.append(1);
		list.insertBefore(list.tail, 2);

		expect(list.toString()).toEqual('0,2,1');
	})
});
