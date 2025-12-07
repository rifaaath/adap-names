import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { Name } from "../names/Name";
import { Directory } from "./Directory";

export abstract class Node {

    protected baseName: string = "";
    protected parentNode: Directory;

    constructor(bn: string, pn: Directory) {
        if (bn === "") {
            throw new IllegalArgumentException("Precondition failed: baseName cannot be empty");
        }
        this.doSetBaseName(bn);
        this.parentNode = pn;
        this.initialize(pn);
        this.assertClassInvariant();
    }

    protected initialize(pn: Directory): void {
        this.parentNode = pn;
        this.parentNode.addChildNode(this);
    }

    public move(to: Directory): void {
        this.parentNode.removeChildNode(this);
        to.addChildNode(this);
        this.parentNode = to;
    }

    public getFullName(): Name {
        const result: Name = this.parentNode.getFullName();
        result.append(this.getBaseName());
        return result;
    }

    public getBaseName(): string {
        const bn = this.doGetBaseName();
        // The invariant check here detects the corrupted state from BuggyFile
        this.assertClassInvariant(); 
        return bn;
    }

    protected doGetBaseName(): string {
        return this.baseName;
    }

    public rename(bn: string): void {
        if (bn === "") {
            throw new IllegalArgumentException("Precondition failed: baseName cannot be empty");
        }
        this.doSetBaseName(bn);
        this.assertClassInvariant();
    }

    protected doSetBaseName(bn: string): void {
        this.baseName = bn;
    }

    public getParentNode(): Directory {
        return this.parentNode;
    }

    /**
     * Validates the object state.
     * Invariant: baseName must not be empty.
     */
    protected assertClassInvariant(): void {
        // We access this.baseName directly here to check state
        if (this.baseName === "") {
            throw new InvalidStateException("Class Invariant failed: Base name cannot be empty");
        }
    }

    /**
     * Returns all nodes in the tree that match bn
     * @param bn basename of node being searched for
     */
    public abstract findNodes(bn: string): Set<Node>;

}