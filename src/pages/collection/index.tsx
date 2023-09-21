import { useState, useEffect } from "react";
import styles from "@/styles/App.module.css";
import Image from "../../components/ImageCard";
import { useStore } from "../../store/root-store";
import { observer } from "mobx-react";
import Search from "@/components/Search";

const Collection = () => {
  const {
    galleryStore: { getGalleryData, loadGalleryData },
  } = useStore(null);

  useEffect(() => {
    loadGalleryData("");
  }, []);

  return (
      <div className={styles.app}>
        <Search isGallery={false} />

        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.images__container}>
              {getGalleryData?.filter((item) => item.collection).map((image, index) => (
                <Image index={index} key={image?.id} data={image} />
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default observer(Collection);
