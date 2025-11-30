import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";

    constructor(source: string, delimiter?: string) {
        super(delimiter);
        this.name = source;
    }

    public getNoComponents(): number {
        if (this.name.length === 0) return 0;
        return this.name.split(this.delimiter).length;
    }

    protected doClone(): Name {
        return new StringName(this.name, this.delimiter);
    }

    protected doGetComponent(i: number): string {
        return this.name.split(this.delimiter)[i];
    }

    protected doSetComponent(i: number, c: string) {
        const comps = this.name.split(this.delimiter);
        comps[i] = c;
        this.name = comps.join(this.delimiter);
    }

    protected doInsert(i: number, c: string) {
        let comps = this.name.length === 0 ? [] : this.name.split(this.delimiter);
        comps.splice(i, 0, c);
        this.name = comps.join(this.delimiter);
    }

    protected doAppend(c: string) {
        if (this.name.length === 0) {
            this.name = c;
        } else {
            this.name += this.delimiter + c;
        }
    }

    protected doRemove(i: number) {
        const comps = this.name.split(this.delimiter);
        comps.splice(i, 1);
        this.name = comps.join(this.delimiter);
    }
}