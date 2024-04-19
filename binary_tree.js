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

let root = new Node(5);
root.left = new Node(2);
root.right = new Node(4);

console.log(root, root.left, root.right);