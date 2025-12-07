import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter);
        this.name = source;
        this.noComponents = source.length === 0 ? 0 : source.split(this.delimiter).length;
    }

    public clone(): Name {
        return new StringName(this.name, this.delimiter);
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(i: number): string {
        return this.name.split(this.delimiter)[i];
    }

    public setComponent(i: number, c: string): Name {
        const comps = this.name.split(this.delimiter);
        comps[i] = c;
        return new StringName(comps.join(this.delimiter), this.delimiter);
    }

    public insert(i: number, c: string): Name {
        let comps = this.noComponents === 0 ? [] : this.name.split(this.delimiter);
        comps.splice(i, 0, c);
        return new StringName(comps.join(this.delimiter), this.delimiter);
    }

    public append(c: string): Name {
        let newNameString = "";
        if (this.noComponents === 0) {
            newNameString = c;
        } else {
            newNameString = this.name + this.delimiter + c;
        }
        return new StringName(newNameString, this.delimiter);
    }

    public remove(i: number): Name {
        const comps = this.name.split(this.delimiter);
        comps.splice(i, 1);
        return new StringName(comps.join(this.delimiter), this.delimiter);
    }
}