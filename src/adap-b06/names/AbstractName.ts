import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
    }

    public abstract clone(): Name;

    public asString(delimiter: string = this.delimiter): string {
        let result = "";
        const n = this.getNoComponents();
        for (let i = 0; i < n; i++) {
            if (i > 0) result += delimiter;
            result += this.getComponent(i);
        }
        return result;
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        return this.asString(this.delimiter);
    }

    public isEqual(other: Name): boolean {
        if (!other) return false;
        if (this.getDelimiterCharacter() !== other.getDelimiterCharacter()) return false;
        if (this.getNoComponents() !== other.getNoComponents()) return false;

        for (let i = 0; i < this.getNoComponents(); i++) {
            if (this.getComponent(i) !== other.getComponent(i)) {
                return false;
            }
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

    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    // --- Abstract Methods (Narrow Interface) ---

    abstract getNoComponents(): number;
    abstract getComponent(i: number): string;
    
    // Mutators return new Name instances
    abstract setComponent(i: number, c: string): Name;
    abstract insert(i: number, c: string): Name;
    abstract append(c: string): Name;
    abstract remove(i: number): Name;

    public concat(other: Name): Name {
        let result: Name = this; // Start with current object
        for (let i = 0; i < other.getNoComponents(); i++) {
            // Because append returns a new object, we update the reference 'result'
            result = result.append(other.getComponent(i));
        }
        return result;
    }
}