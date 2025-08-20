import { ArchivistData } from "./data/data";
import { ArchivistNode } from "./node/node";
import { ArchivistMarketplace } from "./marketplace/marketplace";
import { ArchivistDebug } from "./debug/debug";

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

  get marketplace() {
    if (this._marketplace) {
      return this._marketplace;
    }

    this._marketplace = new ArchivistMarketplace(this.url);

    return this._marketplace;
  }

  get data() {
    if (this._data) {
      return this._data;
    }

    this._data = new ArchivistData(this.url);

    return this._data;
  }

  get node() {
    if (this._node) {
      return this._node;
    }

    this._node = new ArchivistNode(this.url);

    return this._node;
  }

  get debug() {
    if (this._debug) {
      return this._debug;
    }

    this._debug = new ArchivistDebug(this.url);

    return this._debug;
  }
}
