import { sql } from "drizzle-orm";
import { customType } from "drizzle-orm/pg-core";
import { Ulid as ULID } from "id128";

export const ulid = customType<{
    data: string;
    notNull: true;
    default: false;
    driverData: Buffer;
    config: never;
}>({
    dataType() {
        return "bytea";
    },
    toDriver(value) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        return sql`decode(${ULID.fromCanonical(value).toRaw()}, 'hex')`;
    },
    fromDriver(value) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        return ULID.fromRawTrusted(Buffer.from(value).toString("hex")).toCanonical();
    }
});
