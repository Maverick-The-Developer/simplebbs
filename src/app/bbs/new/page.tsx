import React from 'react'
import styles from './page.module.css'

type Props = {}

export default function NewPostPage({}: Props) {
  return (
    <form className={styles.NewPostForm}>
      <h1>새 글 작성</h1>
      <div className={styles.inputBar}>
        <label htmlFor='title'>제목</label>
        <input type='text' id='title' />
      </div>
      <div className={styles.inputBar}>
        <label htmlFor='author'>작성자</label>
        <input type='text' id='author' />
      </div>
      <div className={styles.inputBox}>
        <label>본문</label>
        <textarea />
      </div>
      <div className={styles.buttonBar}>
        <button className={styles.primary}>등록</button>
        <button className={styles.secondary}>취소</button>
      </div>
    </form>
  )
}
