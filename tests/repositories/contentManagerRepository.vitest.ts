import { config } from "dotenv";
import fs from "fs";
import path from "path";
import ConfigManager from "R/src/infrastructure/adapter/configManager";
import ContentManagerSystemRepository from "R/src/infrastructure/repositories/contentManagerRepository";
import { beforeAll, describe, expect, it } from "vitest";

import data from "./__data/null-untransformedData.json";
describe("ContentManagerRepository", () => {
  const p = path.resolve(process.cwd(), "../..", ".env");
  beforeAll(() => {
    process.env = {
      ...process.env,
      ...config({
        path: p,
      }).parsed,
    };
  });

  it("should normal object json not impacted", async () => {
    const data = (
      await import("./__data/contentManagerRepository.normal_object.json")
    ).default;

    const expectedRootKeys = ["list"];

    const repo = new ContentManagerSystemRepository(new ConfigManager());

    const rawData = data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transformedData: any = await repo.unTransformedData(rawData);

    expect(transformedData).toBeDefined();

    const keys = Object.keys(transformedData as object) as string[];

    expect(keys.length).toBe(expectedRootKeys.length);

    for (let i = 0; i < keys.length; i++) {
      expect(keys[i]).toBe(expectedRootKeys[i]);
    }
  });

  it("should normal array json not impacted", async () => {
    const data = (
      await import("./__data/contentManagerRepository.normal_array.json")
    ).default;

    const expectedRootKeys = ["list"];

    const repo = new ContentManagerSystemRepository(new ConfigManager());

    const rawData = data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transformedData: any = await repo.unTransformedData(rawData);

    expect(transformedData).toBeDefined();

    const keys = Object.keys(transformedData as object) as string[];

    expect(keys.length).toBe(expectedRootKeys.length);

    for (let i = 0; i < keys.length; i++) {
      expect(keys[i]).toBe(expectedRootKeys[i]);
    }
  });

  it("should json data be well parsed", async () => {
    const expectedRootKeys = ["posts"];

    const repo = new ContentManagerSystemRepository(new ConfigManager());

    const rawData = data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transformedData: any = await repo.unTransformedData(rawData);

    expect(transformedData).toBeDefined();

    fs.writeFileSync(
      path.resolve(process.cwd(), "../..", "untransformedData-result.json"),
      JSON.stringify(transformedData, null, 2),
      "utf-8"
    );

    const keys = Object.keys(transformedData as object) as string[];

    expect(keys.length).toBe(expectedRootKeys.length);

    for (let i = 0; i < keys.length; i++) {
      expect(keys[i]).toBe(expectedRootKeys[i]);
    }
  });

  it("should default json data be well parsed", async () => {
    const data = (
      await import("./__data/contentManagerRepository.default_structure.json")
    ).default;

    const expectedRootKeys = ["id", "name"];

    const repo = new ContentManagerSystemRepository(new ConfigManager());

    const rawData = data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transformedData: any = await repo.unTransformedData(rawData);

    expect(transformedData).toBeDefined();

    const keys = Object.keys(transformedData as object) as string[];

    expect(keys.length).toBe(expectedRootKeys.length);

    for (let i = 0; i < keys.length; i++) {
      expect(keys[i]).toBe(expectedRootKeys[i]);
    }
  });

  it("should attributes array json data be well parsed", async () => {
    const data = (
      await import("./__data/contentManagerRepository.attributes_array.json")
    ).default;

    const expectedRootKeys = ["items"];

    const repo = new ContentManagerSystemRepository(new ConfigManager());

    const rawData = data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transformedData: any = await repo.unTransformedData(rawData);

    expect(transformedData).toBeDefined();

    const keys = Object.keys(transformedData as object) as string[];

    expect(keys.length).toBe(expectedRootKeys.length);

    for (let i = 0; i < keys.length; i++) {
      expect(keys[i]).toBe(expectedRootKeys[i]);
    }
  });
});
