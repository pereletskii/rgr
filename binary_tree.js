class Node {
    #left = null;
    #right = null;
    constructor(value) {
        this.data = value;
    }
    set left(node) {
        this.#left = node;
    }
    get left(){
        return this.#left;
    }
    set right(node) {
        this.#right = node;
    }
    get right(){
        return this.#right;
    }
}

class BinaryTree {
    #root = null;
    get root() {
        return this.#root;
    }

    insert(value) {
        let node = new Node(value);
        if (!this.#root) {
            this.#root = node;
        } else {
            this.#insertNode(this.#root, node);
        }
    }

    #insertNode(root, node) {
        if (node.data < root.data) {
            if (!root.left) {
                root.left = node;
            } else {
                this.#insertNode(root.left, node);
            }
        } else if (node.data > root.data) {
            if (!root.right) {
                root.right = node;
            } else {
                this.#insertNode(root.right, node);
            }
        }
    }

    getTree() {
        function printNode(node, count) {
            console.log(`${'  '.repeat(count)}${node.data}`);
            if (node.right) printNode(node.right, count + 1);
            if (node.left) printNode(node.left, count + 1);
        }

        if (this.#root) {
            printNode(this.#root, 0);
        } else return null
    }
}

module.exports.BinaryTree = BinaryTree;