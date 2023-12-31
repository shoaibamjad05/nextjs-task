import { useEffect } from "react";
import styles from "@/styles/App.module.css";
import Image from "../components/ImageCard";
import Search from "../components/Search";
import { useStore } from "../store/root-store";
import { observer } from "mobx-react";

const Home = () => {
  const {
    galleryStore: { getGalleryData, loadGalleryData },
  } = useStore(null);

  useEffect(() => {
    loadGalleryData("");
  }, []);

  return (
    <>
      <div className={styles.app}>
        <Search isGallery={true} />

        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.images__container}>
              {getGalleryData?.map((item, index) => (
                <Image index={index} key={item?.id} data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(Home);
