import { Node } from "./Node";
import { Directory } from "./Directory";
import { MethodFailedException } from "../common/MethodFailedException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export enum FileState {
    OPEN,
    CLOSED,
    DELETED        
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
    }

    public open(): void {
        // Preconditions
        if (this.state === FileState.OPEN) {
            throw new IllegalArgumentException("Precondition failed: File is already open");
        }
        if (this.state === FileState.DELETED) {
            throw new IllegalArgumentException("Precondition failed: Cannot open a deleted file");
        }

        this.state = FileState.OPEN;

        // Postcondition
        if (this.state !== FileState.OPEN) {
            throw new MethodFailedException("Postcondition failed: File state should be OPEN");
        }
    }

    public read(noBytes: number): Int8Array {
        // Preconditions
        if (this.state === FileState.CLOSED) {
            throw new IllegalArgumentException("Precondition failed: Cannot read from a closed file");
        }
        if (this.state === FileState.DELETED) {
            throw new IllegalArgumentException("Precondition failed: Cannot read from a deleted file");
        }
        if (noBytes < 0) {
            throw new IllegalArgumentException("Precondition failed: noBytes must be non-negative");
        }

        // Implementation
        const result = new Int8Array(noBytes);

        // Postcondition
        if (result.length !== noBytes) {
            throw new MethodFailedException("Postcondition failed: Read incorrect number of bytes");
        }
        return result;
    }

    public close(): void {
        // Preconditions
        if (this.state === FileState.CLOSED) {
            throw new IllegalArgumentException("Precondition failed: File is already closed");
        }
        if (this.state === FileState.DELETED) {
            throw new IllegalArgumentException("Precondition failed: Cannot close a deleted file");
        }

        this.state = FileState.CLOSED;

        // Postcondition
        if (this.state !== FileState.CLOSED) {
            throw new MethodFailedException("Postcondition failed: File state should be CLOSED");
        }
    }

    public delete(): void {
        // Logic: Deletion is a terminal state. 
        // We ensure we don't delete it if it's already deleted (optional strictness, but good practice)
        if (this.state === FileState.DELETED) {
             // Depending on specific requirements this could be ignored or throw. 
             // We'll throw to be consistent with strict contracts.
             throw new IllegalArgumentException("Precondition failed: File is already deleted");
        }
        
        this.state = FileState.DELETED;
        
        // Postcondition
        if (this.state !== FileState.DELETED) {
            throw new MethodFailedException("Postcondition failed: File state should be DELETED");
        }
    }

    protected doGetFileState(): FileState {
        return this.state;
    }
}