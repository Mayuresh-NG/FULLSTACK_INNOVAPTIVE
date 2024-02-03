class ListNode {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }
  
  class TreeNode {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
  
  function convertListToBST(head) {
    if (!head) {
      return null;
    }
  
    const middle = findMiddle(head);
    const root = new TreeNode(middle.data);
  
    if (head === middle) {
      // If there's only one element in the list
      return root;
    }
  
    root.left = convertListToBST(head);
    root.right = convertListToBST(middle.next);
  
    return root;
  }
  
  function findMiddle(head) {
    let slow = head;
    let fast = head;
    let prev = null;
  
    while (fast && fast.next) {
      prev = slow;
      slow = slow.next;
      fast = fast.next.next;
    }
  
    if (prev) {
      // Break the list into two halves
      prev.next = null;
    }
  
    return slow;
  }
  
  // Example usage
  const linkedList = new ListNode(1);
  linkedList.next = new ListNode(2);
  linkedList.next.next = new ListNode(3);
  linkedList.next.next.next = new ListNode(4);
  linkedList.next.next.next.next = new ListNode(5);
  
  const binaryTreeRoot = convertListToBST(linkedList);
  
  console.log("Inorder Traversal of Binary Tree:");
  inorderTraversal(binaryTreeRoot);
  
  function inorderTraversal(node) {
    if (node !== null) {
      inorderTraversal(node.left);
      console.log(node.data);
      inorderTraversal(node.right);
    }
  }
  