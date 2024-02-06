/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

/**
 * @summary Function returns default object from Zod schema
 * @param schema z.object schema definition
 * @param options Optional object, see Example for details
 * @returns Object of type schema with defaults for all fields
 */
export function defaultInstance<T extends z.ZodTypeAny>(
  schema: z.AnyZodObject | z.ZodEffects<any>,
  options: object = {}
): z.infer<T> {
  const defaultArrayEmpty =
    "defaultArrayEmpty" in options ? options.defaultArrayEmpty : false;
  const defaultDateEmpty =
    "defaultDateEmpty" in options ? options.defaultDateEmpty : false;
  const defaultDateUndefined =
    "defaultDateUndefined" in options ? options.defaultDateUndefined : false;
  const defaultDateNull =
    "defaultDateNull" in options ? options.defaultDateNull : false;

  function run(): z.infer<T> {
    if (schema instanceof z.ZodEffects) {
      if (schema.innerType() instanceof z.ZodEffects) {
        return defaultInstance(schema.innerType(), options); // recursive ZodEffect
      }
      // return schema inner shape as a fresh zodObject
      return defaultInstance(
        z.ZodObject.create(schema.innerType().shape),
        options
      );
    }

    if (schema instanceof z.ZodType) {
      const the_shape = schema.shape as z.ZodAny; // eliminates 'undefined' issue
      if (the_shape === undefined) return null; // error

      const entries = Object.entries(the_shape);
      const temp = entries.map(([key, value]) => {
        const this_default =
          value instanceof z.ZodEffects
            ? defaultInstance(value, options)
            : getDefaultValue(value);
        return [key, this_default];
      });
      return Object.fromEntries(temp);
    } else {
      console.log(`Error: Unable to process this schema`);
      return null; // unknown or undefined here results in complications
    }

    function getDefaultValue(dschema: z.ZodTypeAny): any {
      // console.dir(dschema);
      if (dschema instanceof z.ZodDefault) {
        if (!("_def" in dschema)) return undefined; // error
        if (!("defaultValue" in dschema._def)) return undefined; // error
        return dschema._def.defaultValue();
      }
      if (dschema instanceof z.ZodArray) {
        if (!("_def" in dschema)) return undefined; // error
        if (!("type" in dschema._def)) return undefined; // error
        // return empty array or array with one empty typed element
        return defaultArrayEmpty !== undefined
          ? []
          : [getDefaultValue(dschema._def.type as z.ZodAny)];
      }
      if (dschema instanceof z.ZodString) return "";
      if (dschema instanceof z.ZodNumber || dschema instanceof z.ZodBigInt) {
        const value = dschema.minValue ?? 0;
        return value;
      }
      if (dschema instanceof z.ZodDate) {
        const value =
          defaultDateEmpty !== undefined
            ? ""
            : defaultDateNull !== undefined
              ? null
              : defaultDateUndefined !== undefined
                ? undefined
                : (dschema as z.ZodDate).minDate;
        return value;
      }

      if (dschema instanceof z.ZodRecord) return {};
      if (dschema instanceof z.ZodSymbol) return "";
      if (dschema instanceof z.ZodBoolean) return false;
      if (dschema instanceof z.ZodNull) return null;
      if (dschema instanceof z.ZodPipeline) {
        if (!("out" in dschema._def)) return undefined; // error
        return getDefaultValue(dschema._def.out);
      }
      if (dschema instanceof z.ZodObject) {
        return defaultInstance(dschema, options);
      }
      if (dschema instanceof z.ZodAny && !("innerType" in dschema._def))
        return undefined; // error?

      if (dschema._def.innerType === undefined)
        console.log("dschema._def.innerType is undefined");
      return getDefaultValue(dschema._def.innerType);
    }
  }
  const result = run();
  return result;
}
