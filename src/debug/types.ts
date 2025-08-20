import * as v from "valibot";

export const ArchivistLogLevel = v.picklist([
  "TRACE",
  "DEBUG",
  "INFO",
  "NOTICE",
  "WARN",
  "ERROR",
  "FATAL",
]);

export type ArchivistLogLevel = v.InferOutput<typeof ArchivistLogLevel>;

export type ArchivistDebugInfo = {
  /**
   * Peer Identity reference as specified at https://docs.libp2p.io/concepts/fundamentals/peers/
   */
  id: string;

  /**
   * Address of node as specified by the multi-address specification https://multiformats.io/multiaddr/
   */
  addrs: string[];

  announceAddresses: string[]

  /**
   * Path of the data repository where all nodes data are stored
   */
  repo: string;

  // Signed Peer Record (libp2p)
  spr: string;

  table: {
    localNode: {
      nodeId: string
      peerId: string
      record: string
      address: string
      seen: boolean
    }

    nodes: {
      nodeId: string
      peerId: string
      record: string
      address: string
      seen: boolean
    }[]
  }

  archivist: {
    version: string
    revision: string
  }
};
