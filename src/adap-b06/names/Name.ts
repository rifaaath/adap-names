import { Equality } from "../common/Equality";
import { Cloneable } from "../common/Cloneable";
import { Printable } from "../common/Printable";

export interface Name extends Cloneable, Printable, Equality {

    /** Returns true, if number of components == 0; else false */
    isEmpty(): boolean;

    /** Returns number of components in Name instance */
    getNoComponents(): number;

    /** Returns the component at index i */
    getComponent(i: number): string;

    /** Returns the delimiter character */
    getDelimiterCharacter(): string;

    // --- Mutators now return new Name instances (Immutability) ---

    /** Returns a NEW Name instance with component at i set to c */
    setComponent(i: number, c: string): Name;

    /** Returns a NEW Name instance with c inserted at i */
    insert(i: number, c: string): Name;

    /** Returns a NEW Name instance with c appended at the end */
    append(c: string): Name;

    /** Returns a NEW Name instance with component at i removed */
    remove(i: number): Name;

    /** Returns a NEW Name instance with other appended to this */
    concat(other: Name): Name;
}