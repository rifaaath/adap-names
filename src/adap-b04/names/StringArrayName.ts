import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        this.components = [...source];
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    protected doClone(): Name {
        return new StringArrayName([...this.components], this.delimiter);
    }

    protected doGetComponent(i: number): string {
        return this.components[i];
    }

    protected doSetComponent(i: number, c: string) {
        this.components[i] = c;
    }

    protected doInsert(i: number, c: string) {
        this.components.splice(i, 0, c);
    }

    protected doAppend(c: string) {
        this.components.push(c);
    }

    protected doRemove(i: number) {
        this.components.splice(i, 1);
    }
}