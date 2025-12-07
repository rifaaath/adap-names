import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        this.components = [...source];
    }

    public clone(): Name {
        return new StringArrayName([...this.components], this.delimiter);
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        return this.components[i];
    }

    public setComponent(i: number, c: string): Name {
        const newComponents = [...this.components];
        newComponents[i] = c;
        return new StringArrayName(newComponents, this.delimiter);
    }

    public insert(i: number, c: string): Name {
        const newComponents = [...this.components];
        newComponents.splice(i, 0, c);
        return new StringArrayName(newComponents, this.delimiter);
    }

    public append(c: string): Name {
        const newComponents = [...this.components, c];
        return new StringArrayName(newComponents, this.delimiter);
    }

    public remove(i: number): Name {
        const newComponents = [...this.components];
        newComponents.splice(i, 1);
        return new StringArrayName(newComponents, this.delimiter);
    }
}