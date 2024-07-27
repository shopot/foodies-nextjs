'use client';

import { type JSX } from 'react';
import { useFormState } from 'react-dom';

import { ImagePicker, MealsFromSubmit } from '@/components/meals';
import { shareMeal } from '@/actions/meal/share-meal';

import styles from './page.module.css';

type FormState = {
  name: string;
  email: string;
  title: string;
  summary: string;
  instructions: string;
  image: string;
  message: string;
};

const initialState: FormState = {
  name: '',
  email: '',
  title: '',
  summary: '',
  instructions: '',
  image: '',
  message: '',
};

const ShareMealPage = (): JSX.Element => {
  const [formState, formAction] = useFormState(shareMeal, { ...initialState });

  const { errors } = formState;

  return (
    <>
      <header className={styles.header}>
        <h1>
          Share your <span className={styles.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={styles.main}>
        <form className={styles.form} action={formAction}>
          {formState.message && <p className={styles.errorMessage}>{formState.message}</p>}
          <div className={styles.row}>
            <p>
              <label htmlFor='name'>Your name</label>
              <input type='text' id='name' name='name' required />
              {errors?.creator && <span className={styles.fieldError}>{errors.creator}</span>}
            </p>
            <p>
              <label htmlFor='email'>Your email</label>
              <input type='email' id='email' name='email' required />
              {errors?.creator_email && <span className={styles.fieldError}>{errors.creator_email}</span>}
            </p>
          </div>
          <p>
            <label htmlFor='title'>Title</label>
            <input type='text' id='title' name='title' required />
            {errors?.title && <span className={styles.fieldError}>{errors.title}</span>}
          </p>
          <p>
            <label htmlFor='summary'>Short Summary</label>
            <input type='text' id='summary' name='summary' required />
            {errors?.summary && <span className={styles.fieldError}>{errors.summary}</span>}
          </p>
          <p>
            <label htmlFor='instructions'>Instructions</label>
            <textarea id='instructions' name='instructions' rows={10} required></textarea>
            {errors?.instructions && <span className={styles.fieldError}>{errors.instructions}</span>}
          </p>
          <ImagePicker name='image' label='Image' />
          {errors?.image && <span className={styles.fieldError}>{errors.image}</span>}
          <p className={styles.actions}>
            <MealsFromSubmit />
          </p>
        </form>
      </main>
    </>
  );
};

export default ShareMealPage;
