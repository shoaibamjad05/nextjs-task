import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";
import { useStore } from "../../store/root-store";
import { observer } from "mobx-react";
import Link from "next/link";
import { encodeToBase64 } from "@/utils";

import styles from "@/styles/Search.module.css";

import { SEARCH_ICON_URL } from "@/config";

interface SearchProps {
  isGallery: boolean;
}

const Search = ({ isGallery }: SearchProps) => {
  const {
    galleryStore: { addNewImage, loadGalleryData },
  } = useStore(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e?.target?.files?.[0];
    encodeToBase64(selectedFile as File).then(async (base64Image) => {
      await addNewImage(base64Image);
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    loadGalleryData(query);
  };

  return (
    <div className={styles.search}>
      <img src={SEARCH_ICON_URL} alt="" className={styles.search__image} />

      <div className={styles.search__content}>
        <div className={styles.search__contentWrapper}>
          <div className={styles.header_text}>
            <h1>{isGallery ? "Gallery" : "My Collections"}</h1>
          </div>
          <form className={styles.search__contentInput}>
            <SearchIcon className={styles.header__icon} />

            <input
              type="text"
              className={styles.search__contentInputField}
              placeholder="Search image by tags"
              onChange={onChange}
            />
            <label htmlFor="file-input">
              <Button
                variant="contained"
                size="small"
                color="primary"
                component="span"
              >
                Upload
              </Button>
            </label>
            <input
              accept="image/*"
              id="file-input"
              type="file"
              className={styles.uploadBtn}
              onChange={handleFileChange}
            />
          </form>
        </div>
        <div className={styles.new_collection}>
          <Button variant="contained" size="large" color="primary">
            <Link href={isGallery ? "/collection" : "/"}>
              {isGallery ? "My Collection" : "Gallary"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default observer(Search);
