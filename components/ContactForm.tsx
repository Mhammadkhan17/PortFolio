"use client";

import { useState, type FormEvent } from "react";
import { contactEmail } from "@/lib/site";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Values = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const initialValues: Values = {
  name: "",
  email: "",
  projectType: "MVP",
  budget: "Not sure yet",
  timeline: "Just exploring",
  message: "",
};

function buildMailto(values: Values) {
  const subject = encodeURIComponent(`Project inquiry from ${values.name}`);
  const body = encodeURIComponent(
    [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Project type: ${values.projectType}`,
      `Budget: ${values.budget}`,
      `Timeline: ${values.timeline}`,
      "",
      values.message,
    ].join("\n")
  );

  return `mailto:${contactEmail}?subject=${subject}&body=${body}`;
}

export function ContactForm() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [draft, setDraft] = useState<string | null>(null);

  const update =
    (field: keyof Values) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const value = event.target.value;
      setValues((current) => ({ ...current, [field]: value }));
      setErrors((current) => ({ ...current, [field]: undefined }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Errors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Enter your name so I know who I am replying to.";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Enter an email address I can reply to.";
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
      nextErrors.email = "That email address does not look complete.";
    }

    if (!values.message.trim()) {
      nextErrors.message = "Tell me what you are building or what is stuck.";
    }

    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      document.getElementById(firstError)?.focus();
      return;
    }

    setDraft(buildMailto(values));
  };

  if (draft) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border-2 border-ink bg-chalk-2 p-5 text-ink md:p-6"
      >
        <h2 className="heading-sm text-ink">One more step</h2>
        <p className="mt-3 max-w-[58ch] text-[15px] leading-relaxed text-ink-soft">
          Nothing has been sent yet. Open the email draft, check the details,
          and press send in your email app.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a href={draft} className="tag tag-dark">
            Open email draft
          </a>
          <button
            type="button"
            onClick={() => setDraft(null)}
            className="tag tag-ghost"
          >
            Back to the form
          </button>
        </div>
        <p className="mt-6 text-sm text-ink-soft">
          Prefer to write directly?{" "}
          <a
            href={`mailto:${contactEmail}`}
            className="font-semibold text-orange-deep underline underline-offset-4"
          >
            {contactEmail}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {Object.keys(errors).length > 0 && (
        <div
          role="alert"
          className="border-2 border-danger bg-[#fdf0ee] p-4 text-sm font-semibold text-danger"
        >
          Check the highlighted fields below.
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="field-label text-ink">
            Name <span className="text-orange-deep">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={update("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="field-input"
          />
          {errors.name && (
            <p id="name-error" className="field-error">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="field-label text-ink">
            Email <span className="text-orange-deep">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={update("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="field-input"
          />
          {errors.email && (
            <p id="email-error" className="field-error">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <label htmlFor="projectType" className="field-label text-ink">
            Project type
          </label>
          <select
            id="projectType"
            name="projectType"
            value={values.projectType}
            onChange={update("projectType")}
            className="field-input"
          >
            <option value="MVP">MVP</option>
            <option value="Full-stack app">Full-stack app</option>
            <option value="Feature build">Feature build</option>
            <option value="AI integration">AI integration</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="budget" className="field-label text-ink">
            Budget range
          </label>
          <select
            id="budget"
            name="budget"
            value={values.budget}
            onChange={update("budget")}
            className="field-input"
          >
            <option value="Not sure yet">Not sure yet</option>
            <option value="Under $5K">Under $5K</option>
            <option value="$5K–$15K">$5K–$15K</option>
            <option value="$15K–$30K">$15K–$30K</option>
            <option value="$30K+">$30K+</option>
          </select>
        </div>

        <div>
          <label htmlFor="timeline" className="field-label text-ink">
            Timeline
          </label>
          <select
            id="timeline"
            name="timeline"
            value={values.timeline}
            onChange={update("timeline")}
            className="field-input"
          >
            <option value="Just exploring">Just exploring</option>
            <option value="ASAP">ASAP</option>
            <option value="1–2 months">1–2 months</option>
            <option value="3–6 months">3–6 months</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="field-label text-ink">
          What are you building? <span className="text-orange-deep">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={values.message}
          onChange={update("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : "message-hint"}
          className="field-input resize-y"
          placeholder="What is the product, what is stuck, and what does done look like?"
        />
        {errors.message ? (
          <p id="message-error" className="field-error">
            {errors.message}
          </p>
        ) : (
          <p id="message-hint" className="mt-2 text-sm text-ink-soft">
            A few sentences is enough. No formal brief required.
          </p>
        )}
      </div>

      <button type="submit" className="tag tag-dark w-full sm:w-auto">
        Create email draft
      </button>
      <p className="text-sm text-ink-soft">
        This form opens a draft in your email app. Nothing is sent until you
        send it yourself.
      </p>
    </form>
  );
}
