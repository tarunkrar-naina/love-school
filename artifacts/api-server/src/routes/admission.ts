import { Router, type IRouter } from "express";
import { db, admissionsTable } from "@workspace/db";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

router.post("/admission", async (req, res) => {
  try {
    const {
      studentName, dob, gender, aadhar,
      fatherName, motherName, phone, altPhone, email,
      address, city, pincode,
      classApplying, prevSchool, prevClass, prevMarks,
      transport, hostel, category,
    } = req.body as Record<string, string>;

    if (!studentName?.trim()) {
      res.status(400).json({ error: "Student ka naam zaroori hai" });
      return;
    }
    if (!dob?.trim()) {
      res.status(400).json({ error: "Date of birth zaroori hai" });
      return;
    }
    if (!gender?.trim()) {
      res.status(400).json({ error: "Gender select karna zaroori hai" });
      return;
    }
    if (!fatherName?.trim()) {
      res.status(400).json({ error: "Father ka naam zaroori hai" });
      return;
    }
    if (!phone?.trim() || !/^\d{10}$/.test(phone.replace(/\s/g, ""))) {
      res.status(400).json({ error: "10-digit valid phone number zaroori hai" });
      return;
    }
    if (!address?.trim()) {
      res.status(400).json({ error: "Address zaroori hai" });
      return;
    }
    if (!classApplying?.trim()) {
      res.status(400).json({ error: "Class select karna zaroori hai" });
      return;
    }

    const [inserted] = await db
      .insert(admissionsTable)
      .values({
        studentName: studentName.trim(),
        dob: dob.trim(),
        gender: gender.trim(),
        aadhar: aadhar?.trim() || null,
        fatherName: fatherName.trim(),
        motherName: motherName?.trim() || null,
        phone: phone.trim(),
        altPhone: altPhone?.trim() || null,
        email: email?.trim() || null,
        address: address.trim(),
        city: city?.trim() || null,
        pincode: pincode?.trim() || null,
        classApplying: classApplying.trim(),
        prevSchool: prevSchool?.trim() || null,
        prevClass: prevClass?.trim() || null,
        prevMarks: prevMarks?.trim() || null,
        transport: transport || "No",
        hostel: hostel || "No",
        category: category || "General",
      })
      .returning();

    req.log.info({ id: inserted.id, studentName: inserted.studentName }, "Admission form saved");

    res.status(201).json({
      success: true,
      message: "Aapka admission form successfully submit ho gaya hai! Hamari team 24 ghante mein contact karegi.",
      id: inserted.id,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to save admission form");
    res.status(500).json({ error: "Form save karne mein error aaya. Dobara try karein." });
  }
});

router.get("/admissions", async (req, res) => {
  try {
    const admissions = await db
      .select()
      .from(admissionsTable)
      .orderBy(desc(admissionsTable.submittedAt));

    res.json({ admissions });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch admissions");
    res.status(500).json({ error: "Data fetch karne mein error aaya." });
  }
});

export default router;
