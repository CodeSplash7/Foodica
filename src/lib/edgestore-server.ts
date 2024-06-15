import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
import { initEdgeStoreClient } from "@edgestore/server/core";
import { initEdgeStore } from "@edgestore/server";

const es = initEdgeStore.create();

/**
 * This is the main router for the Edge Store buckets.
 */
export const edgeStoreRouter = es.router({
  publicImages: es
    .imageBucket({
      maxSize: 1024 * 512, // 500kB
      accept: ["image/jpeg", "image/png", "image/webp", "image/jpg"]
    })
    .beforeDelete(({ ctx, fileInfo }) => {
      return true; // allow delete
    })
});

export const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter
});

export const backendClient = initEdgeStoreClient({
  router: edgeStoreRouter
});

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;

