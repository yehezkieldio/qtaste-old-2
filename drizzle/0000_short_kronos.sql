DO $$ BEGIN
 CREATE TYPE "public"."fanfiction_status" AS ENUM('Ongoing', 'Completed', 'Hiatus', 'Abandoned');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."reading_status" AS ENUM('NotStarted', 'Reading', 'Paused', 'Completed', 'Dropped');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."source" AS ENUM('ArchiveOfOurOwn', 'FanFiction', 'Wattpad', 'SpaceBattles', 'SufficientVelocity', 'QuestionableQuesting', 'FanFictionNet', 'RoyalRoad', 'WebNovel', 'ScribbleHub', 'Other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questionabletaste_account" (
	"user_id" "bytea" NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "questionabletaste_account_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questionabletaste_fandom" (
	"id" "bytea" PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questionabletaste_fanfiction_fandom" (
	"fanfiction_id" "bytea" NOT NULL,
	"fandom_id" "bytea" NOT NULL,
	"is_primary" boolean DEFAULT false,
	CONSTRAINT "questionabletaste_fanfiction_fandom_fanfiction_id_fandom_id_pk" PRIMARY KEY("fanfiction_id","fandom_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questionabletaste_fanfiction_tag" (
	"fanfiction_id" "bytea" NOT NULL,
	"tag_id" "bytea" NOT NULL,
	CONSTRAINT "questionabletaste_fanfiction_tag_fanfiction_id_tag_id_pk" PRIMARY KEY("fanfiction_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questionabletaste_fanfiction" (
	"id" "bytea" PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"author" varchar(256),
	"source" "source" DEFAULT 'Other' NOT NULL,
	"url" varchar(256) NOT NULL,
	"description" text,
	"summary" text,
	"word_count" integer,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questionabletaste_favorite_fanfiction" (
	"user_id" "bytea" NOT NULL,
	"fanfiction_id" "bytea" NOT NULL,
	"added_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "questionabletaste_favorite_fanfiction_user_id_fanfiction_id_pk" PRIMARY KEY("user_id","fanfiction_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questionabletaste_reading_status" (
	"id" "bytea" PRIMARY KEY NOT NULL,
	"fanfiction_id" "bytea" NOT NULL,
	"current_chapter" integer,
	"started_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"last_read_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"is_complete" boolean DEFAULT false,
	"status" "reading_status" DEFAULT 'NotStarted' NOT NULL,
	"rating" integer,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questionabletaste_session" (
	"session_token" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" "bytea" NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questionabletaste_tag" (
	"id" "bytea" PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questionabletaste_user" (
	"id" "bytea" PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"email_verified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questionabletaste_verification_token" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "questionabletaste_verification_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questionabletaste_account" ADD CONSTRAINT "questionabletaste_account_user_id_questionabletaste_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."questionabletaste_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questionabletaste_fanfiction_fandom" ADD CONSTRAINT "questionabletaste_fanfiction_fandom_fanfiction_id_questionabletaste_fanfiction_id_fk" FOREIGN KEY ("fanfiction_id") REFERENCES "public"."questionabletaste_fanfiction"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questionabletaste_fanfiction_fandom" ADD CONSTRAINT "questionabletaste_fanfiction_fandom_fandom_id_questionabletaste_fandom_id_fk" FOREIGN KEY ("fandom_id") REFERENCES "public"."questionabletaste_fandom"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questionabletaste_fanfiction_tag" ADD CONSTRAINT "questionabletaste_fanfiction_tag_fanfiction_id_questionabletaste_fanfiction_id_fk" FOREIGN KEY ("fanfiction_id") REFERENCES "public"."questionabletaste_fanfiction"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questionabletaste_fanfiction_tag" ADD CONSTRAINT "questionabletaste_fanfiction_tag_tag_id_questionabletaste_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."questionabletaste_tag"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questionabletaste_favorite_fanfiction" ADD CONSTRAINT "questionabletaste_favorite_fanfiction_user_id_questionabletaste_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."questionabletaste_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questionabletaste_favorite_fanfiction" ADD CONSTRAINT "questionabletaste_favorite_fanfiction_fanfiction_id_questionabletaste_fanfiction_id_fk" FOREIGN KEY ("fanfiction_id") REFERENCES "public"."questionabletaste_fanfiction"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questionabletaste_reading_status" ADD CONSTRAINT "questionabletaste_reading_status_fanfiction_id_questionabletaste_fanfiction_id_fk" FOREIGN KEY ("fanfiction_id") REFERENCES "public"."questionabletaste_fanfiction"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questionabletaste_session" ADD CONSTRAINT "questionabletaste_session_user_id_questionabletaste_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."questionabletaste_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_user_id_idx" ON "questionabletaste_account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "fandom_name_idx" ON "questionabletaste_fandom" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "title_idx" ON "questionabletaste_fanfiction" USING btree ("title");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "author_idx" ON "questionabletaste_fanfiction" USING btree ("author");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "source_idx" ON "questionabletaste_fanfiction" USING btree ("source");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "url_idx" ON "questionabletaste_fanfiction" USING btree ("url");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "fanfiction_id_idx" ON "questionabletaste_reading_status" USING btree ("fanfiction_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_id_idx" ON "questionabletaste_session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "questionabletaste_tag" USING btree ("name");