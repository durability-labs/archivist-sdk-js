# Archivist SDK

The Archivist SDK provides an API for interacting with the Archivist decentralized storage network.

The SDK has a small bundle size and support tree shaking.

The SDK is currently under early development and the API can change at any time.

## How to use

### Sync api

The easiest way is to use the sync API, but you will not benefit from tree shaking.

```js
import { Archivist } from "@durability-labs/archivist-sdk-js";
```

or

```js
const { Archivist } = require("@durability-labs/archivist-sdk-js");
```

To create a Archivist instance, provide the REST API url to interact with the Archivist client:

```js
const archivist = new Archivist("http://localhost:3000");
```

Then you can access any module like this:

```js
const marketplace = archivist.marketplace;
```

### Async api

```js
import { Archivist } from "@durability-labs/archivist-sdk-js/async";
```

or

```js
const { Archivist } = require("@durability-labs/archivist-sdk-js/async");
```

To create a Archivist instance, provide the REST API url to interact with the Archivist client:

```js
const archivist = new Archivist("http://localhost:3000");
```

To use a module, you need to use the await syntax. If the module is not loaded yet, it will be imported first and then cached in memory.

```js
const marketplace = await archivist.marketplace;
```

### Error handling

The SDK provides a type called `SafeValue` for error handling instead of throwing errors. It is inspired by Go's "error as value" concept.
If the value represents an error, `error` is true and `data` will contain the error.
If the value is not an error, `error` is false and `data` will contain the requested data.

The [ArchivistError](./src/errors/errors.ts#L16) contains a message and 3 optionals properties:

- `code`: The (http) code error when it comes from a request
- `errors`: A {ValidationError} array when it comes from an object validation process
- `stack`: The error stack when the ArchivistError results from a error thrown

Example:

```js
const slots = marketplace.activeSlots();

if (slots.error) {
  // Do something to handle the error in slots.data
  return;
}

// Access the slots within slots.data.
```

### Compatibility

| SDK version | Archivist version | Archivist app |
| ----------- | ----------------- | ------------- |
| latest      | main              | latest        |

### Marketplace

The following API assume that you have already a marketplace module loaded, example:

```js
const archivist = new Archivist("http://localhost:3000");
const marketplace = await archivist.marketplace();
```

#### activeSlots()

Returns active slots.

- returns Promise<[ArchivistSlot](./src/marketplace/types.ts#L85)[]>

Example:

```js
const slots = await marketplace.activeSlots();
```

#### activeSlot(slotId)

Returns active slot with id {slotId} for the host.

- slotId (string, required)
- returns Promise<[ArchivistSlot](./src/marketplace/types.ts#L85)[]>

Example:

```js
const slotId = "AB9........";
const slot = await marketplace.activeSlot(slotId);
```

#### availabilities

Returns storage that is for sale.

- returns Promise<[ArchivistAvailability](./src/marketplace/types.ts#L99)>

Example:

```js
const availabilities = await marketplace.availabilities();
```

#### createAvailability

Offers storage for sale.

- input ([ArchivistCreateAvailabilityInput](./src/marketplace/types.ts#L175), required)
- returns Promise<[ArchivistAvailabilityCreateResponse](./src/marketplace/types.ts#L186)[]>

Example:

```js
const response = await marketplace.createAvailability({
  totalCollateral: 1,
  totalSize: 3000,
  minPricePerBytePerSecond: 100,
  duration: 100,
});
```

#### updateAvailability

Updates availability.

- input ([ArchivistUpdateAvailabilityInput](./src/marketplace/types.ts#L186), required)
- returns Promise<"">

Example:

```js
const response = await marketplace.updateAvailability({
  id: "0x.....................",
  totalCollateral: 1,
  totalSize: 3000,
  minPricePerBytePerSecond: 100,
  duration: 100,
});
```

#### reservations

Return list of reservations for ongoing Storage Requests that the node hosts.

- availabilityId (string, required)
- returns Promise<[ArchivistReservation](./src/marketplace/types.ts#L198)[]>

Example:

```js
const reservations = await marketplace.reservations("Ox...");
```

#### createStorageRequest

Creates a new Request for storage

- input ([ArchivistCreateStorageRequestInput](./src/marketplace/types.ts#L230), required)
- returns Promise<string>

Example:

```js
const request = await marketplace.createStorageRequest({
  duration: 3000,
  pricePerBytePerSecond: 1,
  proofProbability: 1,
  nodes: 1,
  tolerance: 0,
  collateralPerByte: 100,
  expiry: 3000,
});
```

#### purchaseIds

Returns list of purchase IDs

- returns Promise<string[]>

Example:

```js
const ids = await marketplace.purchaseIds();
```

#### purchaseDetail

Returns purchase details

- purchaseId (string, required)
- returns Promise<[ArchivistPurchase](./src/marketplace/types.ts#L214)[]>

Example:

```js
const purchaseId = "Ox........";
const purchase = await marketplace.purchaseDetail(purchaseId);
```

### Data

The following API assume that you have already a data module loaded, example:

```js
const archivist = new Archivist("http://localhost:3000");
const data = await archivist.data;
```

#### cids

Returns the manifest stored locally in node.

- returns Promise<[ArchivistDataResponse](./src/data/types.ts#L54)[]>

Example:

```js
const cids = await data.cids();
```

#### space

Returns a summary of the storage space allocation of the node

- returns Promise<[ArchivistNodeSpace](./src/data/types.ts#L58)[]>

Example:

```js
const space = await data.space();
```

#### upload

Upload a file in a streaming manner

- file (File, required)
- onProgress (onProgress: (loaded: number, total: number) => void, optional)
- metadata ({ filename?: string, mimetype?: string }, optional)
- returns [UploadResponse](./src/data/types.ts#L80)

Example:

```js
// Get file from previous event
const [file] = e.target.files
const metadata = {
  filename: file.name,
  mimetype: file.type,
}
const upload = data.upload(file, (loaded: number, total: number) => {
  // Use loaded and total so update a progress bar for example
}, metadata);
await upload.result();
```

#### manifest

Download only the dataset manifest from the network to the local node if it's not available locally.

- cid (string, required)
- returns [ArchivistManifest](./src/data/types.ts#L3)

Example:

```js
const cid = "QmYyQSo1c1Ym7orWxLYvCrM2EmxFTANf8wXmmE7DWjhx5N";
const manifest = await data.fetchManifest(cid);
```

#### networkDownloadStream

Download a file from the network in a streaming manner.
If the file is not available locally, it will be retrieved from other nodes in the network if able.

- cid (string, required)
- returns Response

Example:

```js
const cid = "QmYyQSo1c1Ym7orWxLYvCrM2EmxFTANf8wXmmE7DWjhx5N";
const result = await data.networkDownloadStream(cid);
```

#### localDownload

Download a file from the local node in a streaming manner.
If the file is not available locally, a 404 is returned.

- cid (string, required)
- returns Response

Example:

```js
const cid = "QmYyQSo1c1Ym7orWxLYvCrM2EmxFTANf8wXmmE7DWjhx5N";
const result = await data.localDownload(cid);
```

### Debug

The following API assume that you have already a node module loaded, example:

```js
const archivist = new Archivist("http://localhost:3000");
const data = await archivist.debug;
```

#### setLogLevel

Set log level at run time.

- level ([ArchivistLogLevel](./src/debug/types.ts#L3), required)
- returns Promise<"">

Example:

```js
await debug.setLogLevel("DEBUG");
```

#### info

Gets node information

- returns Promise<[ArchivistDebugInfo](./src/debug/types.ts#L15)>

Example:

```js
const info = await debug.info();
```

### Node

The following API assume that you have already a node module loaded, example:

```js
const archivist = new Archivist("http://localhost:3000");
const node = await archivist.node;
```

#### spr

Get Node's SPR

- returns Promise<[ArchivistSpr](./src/node/types.ts#L1)>

Example:

```js
const spr = await node.spr();
```
