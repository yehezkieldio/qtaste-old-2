/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { describe, expect, test } from "bun:test";
import { Ulid as ULID } from "id128";

describe("ULID Conversion", () => {
    test("should convert database bytea to canonical ULID", () => {
        const dbId = "\\x01944504984a61161c97ff12d0659a5e";
        const buffer: Buffer<ArrayBuffer> = Buffer.from(dbId.slice(2), "hex");
        const canonicalULID: string = ULID.fromRawTrusted(buffer.toString("hex")).toCanonical();

        expect(canonicalULID).toMatch(/^[0-9A-Z]{26}$/);
    });

    test("should convert canonical ULID back to bytea format", () => {
        const canonical = "01ARZ3NDEKTSV4RRFFQ69G5FAV";
        const raw: string = ULID.fromCanonical(canonical).toRaw();
        const dbFormat = `\\x${raw.toLowerCase()}`;

        expect(dbFormat).toMatch(/^\\x[0-9a-f]{32}$/);
    });

    test("should maintain data integrity through conversion cycle", () => {
        const original: ULID = ULID.generate();
        const raw: string = original.toRaw();
        const buffer: Buffer<ArrayBuffer> = Buffer.from(raw, "hex");
        const restored: string = ULID.fromRawTrusted(buffer.toString("hex")).toCanonical();

        expect(restored).toBe(original.toCanonical());
    });
});
