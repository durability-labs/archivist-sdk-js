import type { ArchivistData } from "./data/data";
import type { ArchivistNode } from "./node/node";
import { ArchivistMarketplace } from "./marketplace/marketplace";
import type { ArchivistDebug } from "./debug/debug";

export * from "./fetch-safe/fetch-safe";
export * from "./marketplace/types";
export * from "./debug/types";
export * from "./data/types";
export * from "./values/values";
export * from "./errors/errors";

export { ArchivistDebug } from "./debug/debug";
export { ArchivistData } from "./data/data";
export { ArchivistNode } from "./node/node";
export { ArchivistMarketplace } from "./marketplace/marketplace";

export class Archivist {
  readonly url: string;
  private _marketplace: ArchivistMarketplace | null;
  private _data: ArchivistData | null;
  private _node: ArchivistNode | null;
  private _debug: ArchivistDebug | null;

  constructor(url: string) {
    this.url = url;
    this._marketplace = null;
    this._data = null;
    this._node = null;
    this._debug = null;
  }

  async marketplace() {
    if (this._marketplace) {
      return this._marketplace;
    }

    const module = await import("./marketplace/marketplace");

    this._marketplace = new module.ArchivistMarketplace(this.url);

    return this._marketplace;
  }

  async data() {
    if (this._data) {
      return this._data;
    }

    const module = await import("./data/data");

    this._data = new module.ArchivistData(this.url);

    return this._data;
  }

  async node() {
    if (this._node) {
      return this._node;
    }

    const module = await import("./node/node");

    this._node = new module.ArchivistNode(this.url);

    return this._node;
  }

  async debug() {
    if (this._debug) {
      return this._debug;
    }

    const module = await import("./debug/debug");

    this._debug = new module.ArchivistDebug(this.url);

    return this._debug;
  }
}
