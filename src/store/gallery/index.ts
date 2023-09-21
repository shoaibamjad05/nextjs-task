import {
  deleteGalleryImageAPI,
  getGalleryImagesAPI,
  updateGalleryImageAPi,
  uploadNewGalleryImageAPI,
} from "@/pages/api/gallery";
import { toJS } from "mobx";
import { flow, types } from "mobx-state-tree";

export interface ImageData {
  id: number;
  collection: boolean;
  size: string;
  tags: string[];
  url: string;
}

const GalleryModal = types.model({
  id: types.maybeNull(types.number),
  url: types.maybeNull(types.string),
  collection: types.maybeNull(types.boolean),
  tags: types.maybeNull(types.array(types.string)),
  size: types.maybeNull(types.string),
});

export const galleryStore = types
  .model({
    data: types.maybeNull(types.array(GalleryModal)),
    loading: types.optional(types.boolean, false),
  })
  .views((self) => ({
    get getGalleryData() {
      return toJS(self.data);
    },
    get loader() {
      return toJS(self.loading);
    },
  }))
  .actions((self) => {
    const loadGalleryData = flow(function* (data) {
      let response = null;
      self.loading = true;
      try {
        const res = yield getGalleryImagesAPI(data);
        self.data = res?.data;
      } catch (error) {
        throw error;
      } finally {
        self.loading = false;
        return response;
      }
    });

    const deleteGalleryImage = flow(function* (id) {
      let response = null;
      try {
        yield deleteGalleryImageAPI(id);
        yield loadGalleryData("");
      } catch (error) {
        throw error;
      } finally {
        return response;
      }
    });
    const onUpdateGalleryImage = flow(function* fetchData(id, data) {
      const payload = data;
      try {
        const res = yield updateGalleryImageAPi(id, payload);
        loadGalleryData("");
        return res;
      } catch (error) {
        console.log("error", error);
      }
    });

    const addNewImage = flow(function* fetchData(img) {
      const payload = {
        id: Math.floor(Math.random()*90000) + 10000,
        url: img,
        size: "small",
        tags: ["best"],
        collection: false,
      };
      try {
        const res = yield uploadNewGalleryImageAPI(payload);
        loadGalleryData("");
        return res;
      } catch (error) {
        console.log("error", error);
      }
    });
    return {
      loadGalleryData,
      deleteGalleryImage,
      onUpdateGalleryImage,
      addNewImage,
    };
  });

export function initGalleryStore() {
  return galleryStore.create({});
}
