import { expect, test } from "vitest";
import { checkAnswerProps } from "./helpers";

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
