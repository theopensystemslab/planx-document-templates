import { expect, test } from "vitest";
import { checkAnswerProps } from "./DocumentReview";

test("checkAnswerProps", () => {
  expect(
    checkAnswerProps([
      {
        question: "is it?",
        responses: "yes",
      },
    ])
  ).toBe(true);
});
