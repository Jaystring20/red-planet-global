"use client";

import { useActionState, useId } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { company } from "@/content/company";
import { sectors } from "@/content/sectors";
import { submitInquiry, type InquiryState } from "./actions";

const initial: InquiryState = { status: "idle" };

const field =
  "mt-2 w-full rounded-[2px] border border-hairline bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-graphite/70 focus:border-ink focus:outline-none";
const label = "block text-sm font-medium text-ink";
const help = "mt-1.5 block text-xs text-graphite";
const errorText = "mt-1.5 block text-xs text-signal";

export function InquiryForm() {
  const [state, action, pending] = useActionState(submitInquiry, initial);
  const params = useSearchParams();
  const pathname = usePathname();
  const uid = useId();

  const preset = params.get("sector");
  const validPreset = sectors.some((s) => s.slug === preset) ? (preset as string) : "";

  if (state.status === "success") {
    return (
      <div className="rounded-[4px] border border-hairline bg-white p-8">
        <CheckCircle size={28} weight="fill" className="text-signal" />
        <h2 className="mt-4 text-xl font-semibold text-ink">Inquiry received</h2>
        <p className="measure mt-3 text-sm leading-relaxed text-graphite">
          Thank you. {company.responsePromise} If it is urgent, call{" "}
          <a href={`tel:${company.phoneHref}`} className="text-ink underline">
            {company.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="rounded-[4px] border border-hairline bg-white p-6 md:p-8">
      <h2 className="text-xl font-semibold text-ink">Send us your inquiry</h2>
      <p className="measure mt-2 text-sm leading-relaxed text-graphite">
        Tell us about your needs and our team will respond with a recommendation.
      </p>

      {state.status === "error" && state.message && (
        <p
          role="alert"
          className="mt-6 flex items-start gap-2 rounded-[2px] border border-signal/40 bg-signal/5 px-4 py-3 text-sm text-ink"
        >
          <WarningCircle size={18} className="mt-0.5 shrink-0 text-signal" />
          {state.message}
        </p>
      )}

      <input type="hidden" name="sourcePath" value={pathname} />
      {/* Honeypot. Hidden from people, harvested by bots. */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-name`} className={label}>
            Name
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            required
            autoComplete="name"
            className={field}
            aria-describedby={state.fieldErrors?.name ? `${uid}-name-err` : undefined}
          />
          {state.fieldErrors?.name && (
            <span id={`${uid}-name-err`} className={errorText}>
              {state.fieldErrors.name}
            </span>
          )}
        </div>

        <div>
          <label htmlFor={`${uid}-org`} className={label}>
            Organization
          </label>
          <input
            id={`${uid}-org`}
            name="organization"
            autoComplete="organization"
            className={field}
          />
          <span className={help}>Optional</span>
        </div>

        <div>
          <label htmlFor={`${uid}-email`} className={label}>
            Email
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className={field}
            aria-describedby={state.fieldErrors?.email ? `${uid}-email-err` : undefined}
          />
          {state.fieldErrors?.email && (
            <span id={`${uid}-email-err`} className={errorText}>
              {state.fieldErrors.email}
            </span>
          )}
        </div>

        <div>
          <label htmlFor={`${uid}-phone`} className={label}>
            Phone
          </label>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            className={field}
          />
          <span className={help}>Optional</span>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-sector`} className={label}>
            Sector of interest
          </label>
          <select
            id={`${uid}-sector`}
            name="sector"
            required
            defaultValue={validPreset}
            className={field}
            aria-describedby={state.fieldErrors?.sector ? `${uid}-sector-err` : undefined}
          >
            <option value="" disabled>
              Choose a sector
            </option>
            {sectors.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
            <option value="other">Other</option>
          </select>
          {state.fieldErrors?.sector && (
            <span id={`${uid}-sector-err`} className={errorText}>
              {state.fieldErrors.sector}
            </span>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-message`} className={label}>
            Message
          </label>
          <textarea
            id={`${uid}-message`}
            name="message"
            required
            rows={5}
            className={field}
            aria-describedby={state.fieldErrors?.message ? `${uid}-message-err` : undefined}
          />
          {state.fieldErrors?.message && (
            <span id={`${uid}-message-err`} className={errorText}>
              {state.fieldErrors.message}
            </span>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-8 w-full rounded-[2px] bg-signal px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-signal-deep active:translate-y-px disabled:opacity-70 sm:w-auto"
      >
        {pending ? "Sending" : "Send inquiry"}
      </button>
    </form>
  );
}
