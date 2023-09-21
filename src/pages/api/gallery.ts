import { BASE_URL } from "@/config";
import { ImageData } from "@/store/gallery";
import XHR from "@/utils/XHR";

interface UpdateImagePayload {
  collection?: boolean;
  tags: string[];
  size?: string;
}

const getGalleryImagesAPI = (data: string) => {
  let URL = "";
  if (data?.length) {
    URL = `${BASE_URL}/images?tags_like=${data}`;
  } else {
    URL = `${BASE_URL}/images`;
  }
  const options = {
    method: "GET",
  };

  return XHR(URL, options);
};

const deleteGalleryImageAPI = (id: number) => {
  let URL = `${BASE_URL}/images/${id}`;
  const options = {
    method: "DELETE",
  };

  return XHR(URL, options);
};

const updateGalleryImageAPi = (id: number, payload: UpdateImagePayload) => {
  let URL = `${BASE_URL}/images/${id}`;
  const options = {
    method: "PATCH",
    data: payload,
  };

  return XHR(URL, options);
};

const uploadNewGalleryImageAPI = (payload: ImageData) => {
  let URL = `${BASE_URL}/images/`;
  const options = {
    method: "POST",
    data: payload,
  };

  return XHR(URL, options);
};

export {
  getGalleryImagesAPI,
  deleteGalleryImageAPI,
  updateGalleryImageAPi,
  uploadNewGalleryImageAPI,
};
