import type { SafeValue } from "../values/values";

export type ArchivistManifest = {
  /**
   * "Root hash of the content"
   */
  // rootHash: string;

  /**
   * Length of original content in bytes
   */
  // originalBytes: number;

  /**
   * Total size of all blocks
   */
  datasetSize: number;

  /**
   *  "Size of blocks"
   */
  blockSize: number;

  /**
   * Indicates if content is protected by erasure-coding
   */
  protected: boolean;

  /**
   * Root of the merkle tree
   */
  treeCid: string;

  /**
   * Name of the name
   */
  filename: string | null;

  /**
   * Mimetype
   */
  mimetype: string | null;
};

export type ArchivistDataContent = {
  /**
   * Content Identifier as specified at https://github.com/multiformats/cid
   */
  cid: string;

  manifest: ArchivistManifest;
};

export type ArchivistDataResponse = {
  content: ArchivistDataContent[];
};

export type ArchivistNodeSpace = {
  /**
   * Number of blocks stored by the node
   */
  totalBlocks: number;

  /**
   * Maximum storage space used by the node
   */
  quotaMaxBytes: number;

  /**
   * Amount of storage space currently in use
   */
  quotaUsedBytes: number;

  /**
   * Amount of storage space reserved
   */
  quotaReservedBytes: number;
};

export type UploadResponse = {
  result: Promise<SafeValue<string>>;
  abort: () => void;
};


export type NetworkDownloadResponse = {
  cid: string
  manifest: ArchivistManifest
}