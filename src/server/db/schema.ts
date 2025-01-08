import { type AdapterAccount } from "next-auth/adapters";

import { relations, sql } from "drizzle-orm";
import {
    boolean,
    index,
    integer,
    pgEnum,
    pgTableCreator,
    primaryKey,
    text,
    timestamp,
    varchar
} from "drizzle-orm/pg-core";
import { Ulid as ULID } from "id128";

import { ulid } from "#/server/db/ulid";

export const createTable = pgTableCreator((name) => `questionabletaste_${name}`);

export const sourceEnum = pgEnum("source", [
    "ArchiveOfOurOwn",
    "FanFiction",
    "Wattpad",
    "SpaceBattles",
    "SufficientVelocity",
    "QuestionableQuesting",
    "FanFictionNet",
    "RoyalRoad",
    "WebNovel",
    "ScribbleHub",
    "Other"
]);

export const fanfictionStatusEnum = pgEnum("fanfiction_status", ["Ongoing", "Completed", "Hiatus", "Abandoned"]);

export const fanfictions = createTable(
    "fanfiction",
    {
        id: ulid("id")
            .notNull()
            .primaryKey()
            .$defaultFn(() => ULID.generate().toCanonical()),
        title: varchar("title", { length: 256 }).notNull(),
        author: varchar("author", { length: 256 }),
        source: sourceEnum("source").notNull().default("Other"),
        url: varchar("url", { length: 256 }).notNull(),
        description: text("description"),
        summary: text("summary"),
        word_count: integer("word_count"),
        created_at: timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
        updated_at: timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date())
    },
    (fanfiction) => ({
        titleIndex: index("title_idx").on(fanfiction.title),
        authorIndex: index("author_idx").on(fanfiction.author),
        sourceIndex: index("source_idx").on(fanfiction.source),
        urlIndex: index("url_idx").on(fanfiction.url)
    })
);

export const tags = createTable(
    "tag",
    {
        id: ulid("id")
            .notNull()
            .primaryKey()
            .$defaultFn(() => ULID.generate().toCanonical()),
        name: varchar("name", { length: 256 }).notNull()
    },
    (tag) => ({
        nameIndex: index("name_idx").on(tag.name)
    })
);

export const fanficTags = createTable(
    "fanfiction_tag",
    {
        fanfictionId: ulid("fanfiction_id")
            .notNull()
            .references(() => fanfictions.id),
        tagId: ulid("tag_id")
            .notNull()
            .references(() => tags.id)
    },
    (fanficTag) => ({
        compoundKey: primaryKey({
            columns: [fanficTag.fanfictionId, fanficTag.tagId]
        })
    })
);

export const fanficTagsRelations = relations(fanficTags, ({ one }) => ({
    fanfiction: one(fanfictions, { fields: [fanficTags.fanfictionId], references: [fanfictions.id] }),
    tag: one(tags, { fields: [fanficTags.tagId], references: [tags.id] })
}));

export const fandoms = createTable(
    "fandom",
    {
        id: ulid("id")
            .notNull()
            .primaryKey()
            .$defaultFn(() => ULID.generate().toCanonical()),
        name: varchar("name", { length: 256 }).notNull(),
        created_at: timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
        updated_at: timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date())
    },
    (fandom) => ({
        nameIndex: index("fandom_name_idx").on(fandom.name)
    })
);

export const fanficFandoms = createTable(
    "fanfiction_fandom",
    {
        fanfictionId: ulid("fanfiction_id")
            .notNull()
            .references(() => fanfictions.id),
        fandomId: ulid("fandom_id")
            .notNull()
            .references(() => fandoms.id),
        isPrimary: boolean("is_primary").default(false)
    },
    (fanficFandom) => ({
        compoundKey: primaryKey({
            columns: [fanficFandom.fanfictionId, fanficFandom.fandomId]
        })
    })
);

export const fandomsRelations = relations(fandoms, ({ many }) => ({
    fanfictions: many(fanficFandoms)
}));

export const fanficFandomsRelations = relations(fanficFandoms, ({ one }) => ({
    fanfiction: one(fanfictions, { fields: [fanficFandoms.fanfictionId], references: [fanfictions.id] }),
    fandom: one(fandoms, { fields: [fanficFandoms.fandomId], references: [fandoms.id] })
}));

/* -------------------------------------------------------------------------- */

export const readingStatuEnum = pgEnum("reading_status", ["NotStarted", "Reading", "Paused", "Completed", "Dropped"]);

export const readingStatuses = createTable(
    "reading_status",
    {
        id: ulid("id")
            .notNull()
            .primaryKey()
            .$defaultFn(() => ULID.generate().toCanonical()),
        fanfictionId: ulid("fanfiction_id")
            .notNull()
            .references(() => fanfictions.id),
        currentChapter: integer("current_chapter"),
        startedAt: timestamp("started_at", {
            mode: "date",
            withTimezone: true
        }).default(sql`CURRENT_TIMESTAMP`),
        lastReadAt: timestamp("last_read_at", {
            mode: "date",
            withTimezone: true
        }).default(sql`CURRENT_TIMESTAMP`),
        isComplete: boolean("is_complete").default(false),
        status: readingStatuEnum("status").notNull().default("NotStarted"),
        rating: integer("rating"),
        notes: text("notes")
    },
    (readingStatus) => ({
        fanfictionIdIdx: index("fanfiction_id_idx").on(readingStatus.fanfictionId)
    })
);

export const readingStatusesRelations = relations(readingStatuses, ({ one }) => ({
    fanfiction: one(fanfictions, { fields: [readingStatuses.fanfictionId], references: [fanfictions.id] })
}));

export const favoriteFanfictions = createTable(
    "favorite_fanfiction",
    {
        userId: ulid("user_id")
            .notNull()
            .references(() => users.id),
        fanfictionId: ulid("fanfiction_id")
            .notNull()
            .references(() => fanfictions.id),
        addedAt: timestamp("added_at", {
            mode: "date",
            withTimezone: true
        }).default(sql`CURRENT_TIMESTAMP`)
    },
    (favoriteFanfiction) => ({
        compoundKey: primaryKey({
            columns: [favoriteFanfiction.userId, favoriteFanfiction.fanfictionId]
        })
    })
);

export const favoriteFanfictionsRelations = relations(favoriteFanfictions, ({ one }) => ({
    user: one(users, { fields: [favoriteFanfictions.userId], references: [users.id] }),
    fanfiction: one(fanfictions, { fields: [favoriteFanfictions.fanfictionId], references: [fanfictions.id] })
}));

/* -------------------------------------------------------------------------- */

export const users = createTable("user", {
    id: ulid("id")
        .notNull()
        .primaryKey()
        .$defaultFn(() => ULID.generate().toCanonical()),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),
    emailVerified: timestamp("email_verified", {
        mode: "date",
        withTimezone: true
    }).default(sql`CURRENT_TIMESTAMP`),
    image: varchar("image", { length: 255 })
});

export const usersRelations = relations(users, ({ many }) => ({
    accounts: many(accounts)
}));

export const accounts = createTable(
    "account",
    {
        userId: ulid("user_id")
            .notNull()
            .references(() => users.id),
        type: varchar("type", { length: 255 }).$type<AdapterAccount["type"]>().notNull(),
        provider: varchar("provider", { length: 255 }).notNull(),
        providerAccountId: varchar("provider_account_id", {
            length: 255
        }).notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: varchar("token_type", { length: 255 }),
        scope: varchar("scope", { length: 255 }),
        id_token: text("id_token"),
        session_state: varchar("session_state", { length: 255 })
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId]
        }),
        userIdIdx: index("account_user_id_idx").on(account.userId)
    })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
    user: one(users, { fields: [accounts.userId], references: [users.id] })
}));

export const sessions = createTable(
    "session",
    {
        sessionToken: varchar("session_token", { length: 255 }).notNull().primaryKey(),
        userId: ulid("user_id")
            .notNull()
            .references(() => users.id),
        expires: timestamp("expires", {
            mode: "date",
            withTimezone: true
        }).notNull()
    },
    (session) => ({
        userIdIdx: index("session_user_id_idx").on(session.userId)
    })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, { fields: [sessions.userId], references: [users.id] })
}));

export const verificationTokens = createTable(
    "verification_token",
    {
        identifier: varchar("identifier", { length: 255 }).notNull(),
        token: varchar("token", { length: 255 }).notNull(),
        expires: timestamp("expires", {
            mode: "date",
            withTimezone: true
        }).notNull()
    },
    (vt) => ({
        compoundKey: primaryKey({ columns: [vt.identifier, vt.token] })
    })
);
