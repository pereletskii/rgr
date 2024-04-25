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
        function printNode(node, count, isParentLeft, isParentHaveRight) {     
            let postfix = '';       
            if (count == 0) {
                console.log(`${node.data}`);
            } else {
                if (isParentLeft && isParentHaveRight) {
                    postfix = '├──';
                } else {
                    postfix = '└──';
                }
                console.log(`${' '.repeat(count - 4)}${postfix} ${node.data}`);
            }

            if (node.left) printNode(node.left, count + 4, true, node.right ? true : false);
            if (node.right) printNode(node.right, count + 4, false);
        }

        if (this.#root) {
            printNode(this.#root, 0, null, this.#root.right ? true : false);
        } else return null
    }
}

module.exports.BinaryTree = BinaryTree;