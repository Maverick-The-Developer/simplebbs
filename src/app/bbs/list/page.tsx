import React from 'react'
import styles from './page.module.css'

type Props = {}

export default function ListPage({}: Props) {
  const aaa: string = `${styles.pageTitle} ${styles.largeFont}`
  return (
    <div className={styles.ListPage}>
      <h1>간단 게시판 - 목록</h1>
      <p className={aaa}>제목</p>
    </div>
  )
}