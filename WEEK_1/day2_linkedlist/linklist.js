/**
 * Creating a linked list data structure and performing various operations on 
 * that linked list like insertion,deletion,searching
 */

/**
 * @class node - A class representing a node in a linked list.
 * @property {any} value - The value stored in the node.
 * @property {node} next - A reference to the next node in the linked list.
 */
class node {
  constructor(value) {\
    
    this.value = value;
    this.next = null;
  }
}

/**
 * @class LL - A class representing a linked list.
 * @property {node} head - A reference to the first node in the linked list.
 */
class LL {
  constructor() {
    this.head = null;
  }

  /**
   * @method insertNode - Inserts a new node with the given value at the end of
   *  the linked list.
   * @param {any} value - The value to be stored in the new node.
   * @return {void}
   */
  insertNode(value) {
    const newNode = new node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  /**
   * @method insertAthead - Inserts a new node with the given value at the 
   * beginning of the linked list.
   * @param {any} value - The value to be stored in the new node.
   * @return {void}
   */
  insertAthead(value) {
    let newNode = new node(value);
    newNode.next = this.head;
    this.head = newNode;
  }

  /**
   * @method inserAtany - Inserts a new node with the given value at the 
   * specified index in the linked list.
   * @param {any} value - The value to be stored in the new node.
   * @param {number} index - The index at which the new node should be inserted.
   * @return {void}
   */
  inserAtany(value, index) {
    if (index < 0) {
      console.error("Index must be non-negative.");
      return;
    }

    const newNode = new node(value);

    if (index === 0) {
      this.insertAthead(value);
    }

    let current = this.head;
    let prev = null;
    let trackposition = 0;

    while (current && trackposition < index) {
      prev = current;
      current = current.next;
      trackposition++;
    }

    if (trackposition === index) {
      newNode.next = current;
      prev.next = newNode;
    } else {
      console.error("Index out of bounds.");
    }
  }

  /**
   * @method searchNode - Searches for a node with the given target value in the
   *  linked list.
   * @param {any} target - The target value to be searched.
   * @return {void}
   */
  searchNode(target) {
    let current = this.head;
    let count = 1;
    let flag = 0;
    while (current) {
      if (current.value === target) {
        console.log(target + " is present in linked list at position " + count);
        flag = 1;
      }
      current = current.next;
      count++;
    }
    if (flag === 0) {
      console.log(target + " is not present in linked list");
    }
  }

  /**
   * @method deleteNode - Deletes the first node with the given target value in
   *  the linked list.
   * @param {any} target - The target value of the node to be deleted.
   * @return {void}
   */
  deleteNode(target) {
    let current = this.head;
    let previous = null;
    let flag = 0;

    while (current) {
      if (current.value === target) {
        if (previous) {
          previous.next = current.next;
        } else {
          this.head = current.next;
        }
        flag = 1;
        console.log(target + " succesfully deleted");
      }
      previous = current;
      current = current.next;
    }
    if (flag === 0) {
      console.log("couldnt find");
    }
  }

  /**
   * @method display - Displays the linked list by printing the value of each
   * node.
   * @return {void}
   */
  display() {
    let current = this.head;
    let result = "";

    while (current) {
      result += current.value;
      if (current.next) {
        result += "->";
      } else {
        result += "->null";
      }
      current = current.next;
    }

    console.log(result);
  }
}

/**
 * @let Linklist - An instance of the LL class.
 */
let Linklist = new LL();

//pushing nodes from back 1->2->3->4
console.log("puhing nodes from back of the linked list");
Linklist.insertNode("1");
Linklist.insertNode("2");
Linklist.insertNode("3");
Linklist.insertNode("4");
Linklist.display();

//  push node at head position 5->1->2->3->4->5
console.log("\nPushing node at the front of the Linked List");
Linklist.insertAthead("5");
Linklist.display();

//  search by value in linked list
console.log("\nSearching in linked list");
Linklist.searchNode("4");
Linklist.searchNode("6");
Linklist.display();

//  insert at any position according to index
console.log("\nInsert at any index position")
Linklist.inserAtany("100", 2);
Linklist.display();

//  deleting node from linked list from any position
console.log("\nDeleting a node from linked list");
Linklist.deleteNode("4");
Linklist.display();

console.log("\nDelete from any position")
Linklist.deleteNode("2");
Linklist.display();