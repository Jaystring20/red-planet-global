"use server";

import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { z } from "zod";
import { company } from "@/content/company";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  organization: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  sector: z.enum(["healthcare", "agriculture", "mining", "construction", "other"], {
    message: "Please choose a sector.",
  }),
  message: z.string().trim().min(10, "Please tell us a little about your needs."),
  sourcePath: z.string().max(200).optional(),
  // Honeypot. Real people never see this field.
  website: z.string().max(0).optional(),
});

export type InquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<string, string>>;
};

const inboxFor = (sector: string) =>
  sector === "other"
    ? company.emails.general
    : (company.emails as Record<string, string>)[sector] ?? company.emails.general;

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      fieldErrors[key] ??= issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  const data = parsed.data;

  // Silently accept and discard bot submissions.
  if (data.website) return { status: "success" };

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API_KEY;

  if (!supabaseUrl && !resendKey) {
    // Nothing is provisioned yet. Fail loudly rather than pretending it sent.
    return {
      status: "error",
      message: `Our inquiry form is not connected yet. Please call ${company.phone} or email ${company.emails.general}.`,
    };
  }

  let persisted = false;

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false },
      });
      const { error } = await supabase.from("rp_inquiries").insert({
        name: data.name,
        organization: data.organization || null,
        email: data.email,
        phone: data.phone || null,
        sector: data.sector,
        message: data.message,
        source_path: data.sourcePath ?? null,
      });
      if (error) throw error;
      persisted = true;
    } catch (err) {
      console.error("rp_inquiries insert failed", err);
    }
  }

  let notified = false;

  if (resendKey && process.env.RESEND_FROM) {
    try {
      const resend = new Resend(resendKey);
      const to = inboxFor(data.sector);
      const { error } = await resend.emails.send({
        from: process.env.RESEND_FROM,
        to,
        replyTo: data.email,
        subject: `New ${data.sector} inquiry: ${data.name}`,
        text: [
          `Sector:       ${data.sector}`,
          `Name:         ${data.name}`,
          `Organization: ${data.organization || "not given"}`,
          `Email:        ${data.email}`,
          `Phone:        ${data.phone || "not given"}`,
          `Page:         ${data.sourcePath ?? "not recorded"}`,
          "",
          data.message,
        ].join("\n"),
      });
      if (error) throw error;
      notified = true;
    } catch (err) {
      console.error("inquiry notification failed", err);
    }
  }

  if (!persisted && !notified) {
    return {
      status: "error",
      message: `We could not send that. Please call ${company.phone} or email ${company.emails.general}.`,
    };
  }

  return { status: "success" };
}
