"use client";

import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);

    const form = e.currentTarget;
    const data = new FormData(form);

    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const projectType = data.get("projectType") as string;
    const budget = data.get("budget") as string;
    const timeline = data.get("timeline") as string;
    const message = data.get("message") as string;

    if (!name || !email || !message) {
      setError(true);
      return;
    }

    const subject = encodeURIComponent(`Project Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject Type: ${projectType}\nBudget: ${budget}\nTimeline: ${timeline}\n\n${message}`
    );

    window.open(
      `mailto:hello@dearidev.dev?subject=${subject}&body=${body}`,
      "_blank"
    );
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div role="status" aria-live="polite" className="rounded-marketing border border-hairline-soft bg-canvas-soft p-xl text-center" style={{ padding: "var(--spacing-xl)" }}>
        <div className="mb-4 text-4xl">✓</div>
        <h3 className="mb-2 type-heading-sm text-on-primary">Message sent!</h3>
        <p className="type-body text-ash">
          I&apos;ll reply within 24 hours with honest feedback on your project.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {error && (
        <div role="alert" aria-live="assertive" className="rounded-marketing border border-error/30 bg-error/10 p-md type-body-sm text-error" style={{ padding: "var(--spacing-md)" }}>
          Please fill in all required fields.
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block type-caption-tight text-ash">
            Name <span className="text-brand">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            aria-describedby="name-hint"
            className="text-input w-full"
          />
          <p id="name-hint" className="sr-only">Required. Your full name.</p>
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block type-caption-tight text-ash">
            Email <span className="text-brand">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            aria-describedby="email-hint"
            className="text-input w-full"
          />
          <p id="email-hint" className="sr-only">Required. We&apos;ll use this to reply.</p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <label htmlFor="projectType" className="mb-2 block type-caption-tight text-ash">
            Project Type
          </label>
          <select id="projectType" name="projectType" className="text-input w-full">
            <option value="MVP">MVP</option>
            <option value="Full-stack app">Full-stack app</option>
            <option value="Feature build">Feature build</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="budget" className="mb-2 block type-caption-tight text-ash">
            Budget Range
          </label>
          <select id="budget" name="budget" className="text-input w-full">
            <option value="Under $5K">Under $5K</option>
            <option value="$5K–$15K">$5K–$15K</option>
            <option value="$15K–$30K">$15K–$30K</option>
            <option value="$30K+">$30K+</option>
          </select>
        </div>
        <div>
          <label htmlFor="timeline" className="mb-2 block type-caption-tight text-ash">
            Timeline
          </label>
          <select id="timeline" name="timeline" className="text-input w-full">
            <option value="ASAP">ASAP</option>
            <option value="1–2 months">1–2 months</option>
            <option value="3–6 months">3–6 months</option>
            <option value="Just exploring">Just exploring</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block type-caption-tight text-ash">
          Tell me about your project <span className="text-brand">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          aria-describedby="message-hint"
          className="text-input w-full resize-none"
          placeholder="What are you building? What's the biggest challenge?"
        />
        <p id="message-hint" className="sr-only">Required. Describe your project, timeline, and any specific requirements.</p>
      </div>

      <button type="submit" className="btn-primary min-h-[48px] w-full sm:w-auto">
        Send Message
      </button>
    </form>
  );
}
