import { Api } from "../api/config";
import { ArchivistError, ArchivistValibotIssuesMap } from "../errors/errors";
import { Fetch } from "../fetch-safe/fetch-safe";
import type { SafeValue } from "../values/values";
import { ArchivistLogLevel, type ArchivistDebugInfo } from "./types";
import * as v from "valibot";

export class ArchivistDebug {
  readonly url: string;

  constructor(url: string) {
    this.url = url;
  }

  /**
   * Set log level at run time
   */
  async setLogLevel(level: ArchivistLogLevel): Promise<SafeValue<"">> {
    const result = v.safeParse(ArchivistLogLevel, level);

    if (!result.success) {
      return Promise.resolve({
        error: true,
        data: new ArchivistError("Cannot validate the input", {
          errors: ArchivistValibotIssuesMap(result.issues),
        }),
      });
    }

    const url =
      this.url +
      Api.config.prefix +
      "/debug/chronicles/loglevel?level=" +
      level;

    const res = await Fetch.safe(url, {
      method: "POST",
      body: "",
    });

    if (res.error) {
      return res;
    }

    return { error: false, data: "" };
  }

  /**
   * Gets node information
   */
  info() {
    const url = this.url + Api.config.prefix + `/debug/info`;

    return Fetch.safeJson<ArchivistDebugInfo>(url, {
      method: "GET",
    });
  }
}
