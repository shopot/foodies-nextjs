'use client';

import { type ChangeEvent, type JSX, useRef, useState } from 'react';
import Image from 'next/image';

import styles from './image-picker.module.css';

type ImagePickerProps = {
  label: string;
  name: string;
};

export const ImagePicker = ({ label, name }: ImagePickerProps): JSX.Element => {
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const imageInput = useRef<HTMLInputElement>(null!);

  const handlePickClick = () => {
    imageInput.current.click();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const fileReader = new FileReader();

      fileReader.onload = () => {
        setPickedImage(fileReader.result as string);
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.controls}>
        <div className={styles.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && <Image src={pickedImage} alt='The image selected by the user' width={160} height={160} />}
        </div>
        <input
          className={styles.input}
          type='file'
          id={name}
          accept='image/png, image/jpeg'
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
        />
        <button className={styles.button} type='button' onClick={handlePickClick}>
          Pick an Image
        </button>
      </div>
    </div>
  );
};
