"use client";

import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ lable, name }) {
  const [pickedImage, setPickImage] = useState();
  const imageInput = useRef();

  function handlePickClick() {
    imageInput.current.click();
  }

  function handleImageChange(even) {
    const file = even.target.files[0];
    if (!file) {
      return;
    }
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{lable}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>이미지 선택 안했대</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="이것이 너가 선택한 이미지란다."
              fill
            />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          사진 고르삼
        </button>
      </div>
    </div>
  );
}
