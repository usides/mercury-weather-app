import React from 'react';
import styles from './Pane.module.css';
import placeholder from './placeholder.png';

const Pane = ({ headerText, isPlaceholder, children }) => {
  return (
    <section className={styles.pane}>
      <h2 className={styles.pane__header}>{headerText}</h2>
      {children}
      {isPlaceholder && (
        <>
          <img
            className={styles.pane__image}
            src={placeholder}
            alt='placeholder'
          />
          <p className={styles.pane__description}>
            'Fill in all the fields and the weather will be displayed'
          </p>
        </>
      )}
    </section>
  );
};

export default Pane;
