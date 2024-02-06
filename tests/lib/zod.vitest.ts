import { describe, expect, it } from "vitest";
import { pictureDataSchema } from "R/src/infrastructure/dto/picture.dto";
import { defaultInstance } from "R/src/lib/zod";

describe("zod", () => {
  it("should be able to import zod", () => {
    const result = defaultInstance(pictureDataSchema);
    console.debug("🚀 ~ it ~ result:", result);

    expect(result).toBeDefined();
  });
});
