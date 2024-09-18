import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
import { initEdgeStore } from "@edgestore/server";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";
import { initEdgeStoreClient } from "@edgestore/server/core";

const es = initEdgeStore.create();

/**
 * This is the main router for the Edge Store buckets.
 */
export const edgeStoreRouter = es.router({
  publicImages: es
    .imageBucket({
      maxSize: 5 * 1024 * 1024, // 5MB
      accept: ["image/jpeg", "image/png", "image/webp", "image/jpg"]
    })
    .beforeUpload(async () => {
      const session = await getServerSession();
      if (!session) {
        throw new Error("Unauthorized");
      }
      return true;
    })
    .beforeDelete(async () => {
      const session = await getServerSession();
      if (!session) {
        throw new Error("Unauthorized");
      }
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
