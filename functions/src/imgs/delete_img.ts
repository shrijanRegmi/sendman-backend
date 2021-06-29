import * as functions from "firebase-functions";
import { firestore } from "firebase-admin";

const deleteImg = functions.pubsub.schedule("* * * * *").onRun(async () => {
  try {
    const ref = firestore();
    const currentDate = Date.now();

    const coreImagesRef = ref
      .collection("core_images")
      .where("dis_date", "<=", currentDate);

    const coreImagesSnap = await coreImagesRef.get();

    if (!coreImagesSnap.empty) {
      for (const doc of coreImagesSnap.docs) {
        const data = doc.data();

        if (typeof data !== "undefined") {
          const { dis_date } = data;

          console.log(`${dis_date} and ${currentDate}`);
        }
        await doc.ref.delete();
        console.log(`Success: Deleting core images ${doc.id}`);
      }
    }
  } catch (error) {
    console.log("Error!!!: Deleting core images", error);
  }

  return true;
});

export default deleteImg;
