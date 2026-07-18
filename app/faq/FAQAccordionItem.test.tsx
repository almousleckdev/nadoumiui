import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FAQAccordionItem from "./FAQAccordionItem";

describe("FAQAccordionItem", () => {
  it("renders the question and category, with the answer collapsed by default", () => {
    render(<FAQAccordionItem category="Admissions" question="How do I apply?" answer="Submit the online form." />);

    expect(screen.getByText("How do I apply?")).toBeInTheDocument();
    expect(screen.getByText("Admissions")).toBeInTheDocument();
    expect(screen.queryByText("Submit the online form.")).not.toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false");
  });

  it("respects defaultOpen", () => {
    render(<FAQAccordionItem category="Admissions" question="How do I apply?" answer="Submit the online form." defaultOpen />);
    expect(screen.getByText("Submit the online form.")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });

  it("toggles the answer on click", async () => {
    const user = userEvent.setup();
    render(<FAQAccordionItem category="Admissions" question="How do I apply?" answer="Submit the online form." />);

    await user.click(screen.getByRole("button"));
    expect(screen.getByText("Submit the online form.")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");

    await user.click(screen.getByRole("button"));
    expect(screen.queryByText("Submit the online form.")).not.toBeInTheDocument();
  });
});
