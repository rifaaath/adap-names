import { describe, it, expect } from "vitest";
import { File } from "./files/File";
import { Directory } from "./files/Directory";
import { IllegalArgumentException } from "./common/IllegalArgumentException";
import { Node } from "./files/Node";

describe("File Contracts", () => {
    
    const mockParent: Directory = {
        addChildNode: (n: Node) => { /* do nothing */ }
    } as any; 

    it("throws Exception when opening an open file", () => {
        const f = new File("test.txt", mockParent);
        f.open();
        // Violates: "Don't open an open file"
        expect(() => f.open()).toThrow(IllegalArgumentException);
    });

    it("throws Exception when reading from closed file", () => {
        const f = new File("data.dat", mockParent);
        // Violates: "Don't read from a closed file"
        expect(() => f.read(10)).toThrow(IllegalArgumentException);
    });

    it("throws Exception when interacting with deleted file", () => {
        const f = new File("trash.tmp", mockParent);
        f.delete(); 
        
        // Violates: "Don't open a deleted file"
        expect(() => f.open()).toThrow(IllegalArgumentException);
    });
});