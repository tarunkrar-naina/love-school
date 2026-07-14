import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const admissionsTable = pgTable("admissions", {
  id: serial("id").primaryKey(),
  studentName: varchar("student_name", { length: 255 }).notNull(),
  dob: varchar("dob", { length: 20 }).notNull(),
  gender: varchar("gender", { length: 20 }).notNull(),
  aadhar: varchar("aadhar", { length: 20 }),
  fatherName: varchar("father_name", { length: 255 }).notNull(),
  motherName: varchar("mother_name", { length: 255 }),
  phone: varchar("phone", { length: 15 }).notNull(),
  altPhone: varchar("alt_phone", { length: 15 }),
  email: varchar("email", { length: 255 }),
  address: text("address").notNull(),
  city: varchar("city", { length: 100 }),
  pincode: varchar("pincode", { length: 10 }),
  classApplying: varchar("class_applying", { length: 50 }).notNull(),
  prevSchool: varchar("prev_school", { length: 255 }),
  prevClass: varchar("prev_class", { length: 50 }),
  prevMarks: varchar("prev_marks", { length: 20 }),
  transport: varchar("transport", { length: 10 }),
  hostel: varchar("hostel", { length: 10 }),
  category: varchar("category", { length: 30 }),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  status: varchar("status", { length: 30 }).default("pending").notNull(),
});

export const insertAdmissionSchema = createInsertSchema(admissionsTable).omit({
  id: true,
  submittedAt: true,
  status: true,
});

export type InsertAdmission = z.infer<typeof insertAdmissionSchema>;
export type Admission = typeof admissionsTable.$inferSelect;
