class ListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Function to convert linked list to binary tree
function linkedListToBinaryTree(head) {
  if (!head) {
    return null;
  }

  // Helper function to convert linked list node to binary tree node
  function convertListNodeToTreeNode(node) {
    return new TreeNode(node.value);
  }

  // Create the root of the binary tree
  const root = convertListNodeToTreeNode(head);
  let currentBinaryTreeNode = root;

  // Move to the next node in the linked list
  head = head.next;

  // Queue to keep track of binary tree nodes
  const queue = [currentBinaryTreeNode];

  // Iterate through the linked list and create binary tree nodes
  while (head) {
    // Create a new binary tree node for the linked list node
    const newNode = convertListNodeToTreeNode(head);

    // Connect the new node to the current node's left
    currentBinaryTreeNode.left = newNode;

    // Move to the next node in the linked list
    head = head.next;

    // Enqueue the new node for further processing
    queue.push(newNode);

    // Dequeue the front node to process its right child
    currentBinaryTreeNode = queue.shift();

    // Create a new binary tree node for the linked list node
    if (head) {
      const newRightNode = convertListNodeToTreeNode(head);

      // Connect the new right node to the current node's right
      currentBinaryTreeNode.right = newRightNode;

      // Move to the next node in the linked list
      head = head.next;

      // Enqueue the new right node for further processing
      queue.push(newRightNode);
    }
  }

  return root;
}

// Example linked list: 1 -> 2 -> 3 -> 4 -> 5
const linkedList = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
const binaryTreeRoot = linkedListToBinaryTree(linkedList);

// The binary tree can now be used for further processing or traversal
console.log(binaryTreeRoot);
