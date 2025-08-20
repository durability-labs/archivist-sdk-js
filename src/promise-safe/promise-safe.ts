import { ArchivistError } from "../async";
import type { SafeValue } from "../values/values";

export const Promises = {
  async safe<T>(promise: () => Promise<T>): Promise<SafeValue<T>> {
    try {
      const result = await promise();

      return { error: false, data: result };
    } catch (e) {
      return {
        error: true,
        data: new ArchivistError(e instanceof Error ? e.message : "" + e, {
          sourceStack: e instanceof Error ? e.stack || null : null,
        }),
      };
    }
  },
};
