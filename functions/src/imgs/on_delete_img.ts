import { storage } from "firebase-admin";
import * as functions from "firebase-functions";

const onDeleteImg = functions.firestore
  .document("core_images/{coreImgId}")
  .onDelete(async (snap) => {
    try {
      const data = snap.data();

      if (typeof data !== "undefined") {
        const { image_urls, updated_at, id } = data;

        const imgBucket = storage().bucket();

        for (let i = 0; i < image_urls.length; i++) {
          const path = `core_images/${id}/${updated_at}_${id}_${i + 1}`;
          await imgBucket.file(path).delete();
          console.log(`Success: Deleting image from path ${path}`);
        }
      }
    } catch (error) {
      console.log(`Error!!!: Deleting image from path`);
    }

    return true;
  });

export default onDeleteImg;
