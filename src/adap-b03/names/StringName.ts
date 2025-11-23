import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";

    constructor(source: string, delimiter?: string) {
        super(delimiter);
        this.name = source;
    }

    public clone(): Name {
        return new StringName(this.name, this.delimiter);
    }

    public getNoComponents(): number {
        if (this.name.length === 0) return 0;
        // Split is expensive, but necessary for this data structure type
        return this.name.split(this.delimiter).length;
    }

    public getComponent(i: number): string {
        return this.name.split(this.delimiter)[i];
    }

    public setComponent(i: number, c: string): void {
        const comps = this.name.split(this.delimiter);
        comps[i] = c;
        this.name = comps.join(this.delimiter);
    }

    public insert(i: number, c: string): void {
        let comps: string[] = [];
        if (this.name.length > 0) {
            comps = this.name.split(this.delimiter);
        }
        comps.splice(i, 0, c);
        this.name = comps.join(this.delimiter);
    }

    public append(c: string): void {
        if (this.name.length === 0) {
            this.name = c;
        } else {
            this.name += this.delimiter + c;
        }
    }

    public remove(i: number): void {
        const comps = this.name.split(this.delimiter);
        comps.splice(i, 1);
        this.name = comps.join(this.delimiter);
    }
    
    // Optimization: Override asString as we already have the string ready
    public asString(delimiter: string = this.delimiter): string {
        if (delimiter === this.delimiter) {
            return this.name;
        }
        return this.name.split(this.delimiter).join(delimiter);
    }
}