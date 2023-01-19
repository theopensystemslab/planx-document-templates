import { describe, expect, test } from "vitest";
import { checkAnswerProps, safeDecodeURI } from "./helpers";

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

describe("safeDecodeURI", () => {
  test("It handles URI encoded strings", () => 
    expect(safeDecodeURI("https://testURL.pizza/file%20with%20spaces.pdf")).toEqual("https://testURL.pizza/file with spaces.pdf")
  );

  test("It handles non-URI encoded strings", () => 
    expect(safeDecodeURI("50% or less")).toEqual("50% or less")
  );
});