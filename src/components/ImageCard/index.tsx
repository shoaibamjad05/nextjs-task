import React, { useState } from "react";
import { Button, Select, MenuItem } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import DownloadIcon from "@material-ui/icons/ArrowDownward";

import Chip from "@mui/material/Chip";

import AddIcon from "@material-ui/icons/Add";
import styles from "@/styles/Image.module.css";
import { useStore } from "../../store/root-store";
import { observer } from "mobx-react";

import { imageSize, selectedSize, imageTags, handleDownload } from "@/utils";
import { ImageData } from "@/store/gallery";

interface ImageCardProps {
  data: ImageData;
  index: number;
}

const ImageCard = ({ data, index }: ImageCardProps) => {
  const {
    galleryStore: { getGalleryData, deleteGalleryImage, onUpdateGalleryImage },
  } = useStore(null);

  const [tags, setTags] = useState("new");

  const handlSizeChange = (id: number, size: string) => {
    const payload = {
      size,
    };
    onUpdateGalleryImage(id, payload);
  };

  const handlChangeTags = (index: number, id: number, tagData: string) => {
    setTags(tagData);
    const tag = [...getGalleryData];
    const newTags = tag[index];
    if (!newTags?.tags.includes(tagData)) {
      newTags?.tags.push(tagData);
    }
    const payload = {
      tags: newTags.tags,
    };
    onUpdateGalleryImage(id, payload);
  };

  const handleAddImage = (id: number, data: boolean) => {
    const payload = {
      collection: data,
    };
    onUpdateGalleryImage(id, payload);
  };

  const handleDeleteImage = (id: number) => {
    deleteGalleryImage(id);
  };

  const checkSize = (sizeType: string) => {
    let imageSize = selectedSize.smallImage;
    if (sizeType == "medium") {
      imageSize = selectedSize.mediumImage;
    }
    if (sizeType == "large") {
      imageSize = selectedSize.largeImage;
    }
    return imageSize;
  };

  return (
    <div className={styles.image}>
      <div className={styles.image__header}>
        <Select
          value={data.size}
          className={styles.dropdown_size}
          onChange={(item) =>
            handlSizeChange(data.id, item.target.value as string)
          }
        >
          {imageSize.map((item) => (
            <MenuItem value={item.value}>{item.name}</MenuItem>
          ))}
        </Select>
        <Button
          variant="contained"
          size="small"
          disableElevation
          className={styles.image__button}
          onClick={() => handleDownload(data.url)}
        >
          <DownloadIcon fontSize="small" />
        </Button>

        <Button
          variant="contained"
          size="small"
          disableElevation
          className={styles.image__button}
          onClick={() => handleDeleteImage(data.id)}
        >
          <DeleteIcon fontSize="small" />
        </Button>
        <Button
          variant="contained"
          size="small"
          disableElevation
          color={data.collection ? "primary" : "default"}
          className={styles.image__button}
          onClick={() => handleAddImage(data.id, !data.collection)}
        >
          <AddIcon fontSize="small" />
        </Button>
      </div>

      <img
        src={data.url}
        alt=""
        className={styles.image__img}
        height={checkSize(data.size)}
        // width={data.width}
      />

      <div className={styles.image__footer}>
        <div>
          {data.tags.map((item) => (
            <Chip
              label={item}
              variant="filled"
              color="info"
              className={styles.image__footerLeftName}
            />
          ))}
        </div>
        <div>
          <Select
            value={tags}
            className={styles.dropdown_tags}
            onChange={(tag) =>
              handlChangeTags(index, data.id, tag.target.value as string)
            }
          >
            {imageTags.map((item) => (
              <MenuItem value={item.value}>{item.text}</MenuItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default observer(ImageCard);
