import { Node } from "./Node";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public hasChildNode(cn: Node): boolean {
        return this.childNodes.has(cn);
    }

    public addChildNode(cn: Node): void {
        this.childNodes.add(cn);
    }

    public removeChildNode(cn: Node): void {
        this.childNodes.delete(cn);
    }

    public findNodes(bn: string): Set<Node> {
        const result = new Set<Node>();
        
        // 1. Check self
        if (this.getBaseName() === bn) {
            result.add(this);
        }

        // 2. Delegate to children (Recursive step)
        for (const child of this.childNodes) {
            const childResults = child.findNodes(bn);
            // Merge results
            childResults.forEach(n => result.add(n));
        }

        return result;
    }

}