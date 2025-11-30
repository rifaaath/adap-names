import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
        // Invariant: Delimiter should ideally be a single char (based on lecture context)
        this.assertClassInvariant();
    }

    protected assertClassInvariant(): void {
        if (this.delimiter === undefined || this.delimiter.length !== 1) {
            throw new InvalidStateException("Invariant violated: Delimiter must be a single character");
        }
    }

    protected assertIndexInBounds(i: number, upperBoundInclusive: boolean = false): void {
        const count = this.getNoComponents();
        const upper = upperBoundInclusive ? count : count - 1;
        if (i < 0 || i > upper) {
            throw new IllegalArgumentException(`Precondition failed: Index ${i} out of bounds (0-${upper})`);
        }
    }

    protected assertNotNull(c: string): void {
        if (c === null || c === undefined) {
             throw new IllegalArgumentException("Precondition failed: Component cannot be null");
        }
    }

    public clone(): Name {
        this.assertClassInvariant();
        const copy = this.doClone();
        // Postcondition: Clone must be equal to original
        if (!this.isEqual(copy)) {
            throw new MethodFailedException("Postcondition failed: Clone is not equal to original");
        }
        return copy;
    }

    public getComponent(i: number): string {
        this.assertClassInvariant();
        this.assertIndexInBounds(i); // Precondition
        
        const result = this.doGetComponent(i);
        
        this.assertNotNull(result); // Postcondition sanity check
        return result;
    }

    public setComponent(i: number, c: string): void {
        this.assertClassInvariant();
        this.assertIndexInBounds(i);
        this.assertNotNull(c);
        
        this.doSetComponent(i, c);
        
        this.assertClassInvariant();
    }

    public insert(i: number, c: string): void {
        this.assertClassInvariant();
        this.assertIndexInBounds(i, true); // Allow insertion at end (index == count)
        this.assertNotNull(c);
        
        const oldLen = this.getNoComponents();
        
        this.doInsert(i, c);
        
        // Postcondition: Length must increase by 1
        if (this.getNoComponents() !== oldLen + 1) {
            throw new MethodFailedException("Postcondition failed: Component count did not increase");
        }
        this.assertClassInvariant();
    }

    public append(c: string): void {
        this.assertClassInvariant();
        this.assertNotNull(c);
        
        const oldLen = this.getNoComponents();
        
        this.doAppend(c);
        
        if (this.getNoComponents() !== oldLen + 1) {
             throw new MethodFailedException("Postcondition failed: Component count did not increase");
        }
        this.assertClassInvariant();
    }

    public remove(i: number): void {
        this.assertClassInvariant();
        this.assertIndexInBounds(i);
        
        const oldLen = this.getNoComponents();
        
        this.doRemove(i);
        
        if (this.getNoComponents() !== oldLen - 1) {
             throw new MethodFailedException("Postcondition failed: Component count did not decrease");
        }
        this.assertClassInvariant();
    }

    public asString(delimiter: string = this.delimiter): string {
        let result = "";
        const n = this.getNoComponents();
        for (let i = 0; i < n; i++) {
            if (i > 0) result += delimiter;
            result += this.getComponent(i); // Calls public getComponent (with checks)
        }
        return result;
    }

    public toString(): string { return this.asDataString(); }
    public asDataString(): string { return this.asString(this.delimiter); }

    public isEqual(other: Name): boolean {
        if (!other) return false;
        if (this.getDelimiterCharacter() !== other.getDelimiterCharacter()) return false;
        if (this.getNoComponents() !== other.getNoComponents()) return false;
        for (let i = 0; i < this.getNoComponents(); i++) {
            if (this.getComponent(i) !== other.getComponent(i)) return false;
        }
        return true;
    }

    public getHashCode(): number {
        let hash = 0;
        for (let i = 0; i < this.getNoComponents(); i++) {
            const s = this.getComponent(i);
            for (let k = 0; k < s.length; k++) {
                hash = (hash << 5) - hash + s.charCodeAt(k);
                hash |= 0;
            }
        }
        return hash;
    }

    public isEmpty(): boolean { return this.getNoComponents() === 0; }
    public getDelimiterCharacter(): string { return this.delimiter; }

    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }
    
    public abstract getNoComponents(): number;
    protected abstract doClone(): Name;
    protected abstract doGetComponent(i: number): string;
    protected abstract doSetComponent(i: number, c: string): void;
    protected abstract doInsert(i: number, c: string): void;
    protected abstract doAppend(c: string): void;
    protected abstract doRemove(i: number): void;
}