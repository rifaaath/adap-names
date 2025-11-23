import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;
    protected components: string[] = [];

    constructor(source: string, delimiter?: string) {
        this.delimiter = delimiter ?? DEFAULT_DELIMITER;
        this.name = source;
        this.components = source ? source.split(this.delimiter) : [];
        this.noComponents = this.components.length;
    }

    public asString(delimiter: string = this.delimiter): string {
         return this.components.join(delimiter);
    }

    public asDataString(): string {
        return this.name;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.components.length === 0;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(x: number): string {
        return this.components[x];
    }

    public setComponent(n: number, c: string): void {
        this.components[n] = c;
        this.name = this.asString();
    }

    public insert(n: number, c: string): void {
         this.components.splice(n, 0, c);
        this.name = this.asString();
    }

    public append(c: string): void {
        this.components.push(c);
        this.name = this.asString();
    }

    public remove(n: number): void {
        this.components.splice(n, 1);
        this.name = this.asString();
    }

    public concat(other: Name): void {
        const otherStr = other.asString(this.delimiter);
        this.name = this.name + this.delimiter + otherStr;
        this.components = this.name.split(this.delimiter);
    }

}