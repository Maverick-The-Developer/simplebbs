'use client'
import React, { MouseEvent, useState } from 'react'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'

const FETCH_EndPoint = 'http://bbsapi.mavericksoft.xyz/bbsapi'
type Props = {}

export default function NewPostPage({}: Props) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')

  async function postNewData() {
    if (title.trim().length < 1) {
      window?.alert('제목을 입력하여야 합니다')
      return
    }
    if (author.trim().length < 1) {
      window?.alert('작성자를 입력하여야 합니다')
      return
    }
    if (content.trim().length <1) {
      window?.alert('본문을 입력하여야 합니다.')
      return
    }
    const postData = {
      title, author, content
    }

    const url = FETCH_EndPoint
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type':'application/json'
      }
    })
    if (response.ok) {
        // post success
        alert('새글이 등록되었습니다.')
        router.replace('/bbs')
    } else {
      alert('새글 등록에 문제가 발생하였습니다. 관리자에게 문의하세요')
      return
    }
  }

  function handleOk(event:MouseEvent<HTMLButtonElement>) {
    postNewData()
  }
  function handleCancel(event:MouseEvent<HTMLButtonElement>) {
    router.back()
  }

  return (
    <div className={styles.NewPostForm}>
      <h1>새 글 작성</h1>
      <div className={styles.inputBar}>
        <label htmlFor='title'>제목</label>
        <input type='text' value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div className={styles.inputBar}>
        <label htmlFor='author'>작성자</label>
        <input type='text' value={author} onChange={e => setAuthor(e.target.value)} />
      </div>
      <div className={styles.inputBox}>
        <label>본문</label>
        <textarea value={content} onChange={e => setContent(e.target.value)}/>
      </div>
      <div className={styles.buttonBar}>
        <button className={styles.primary} onClick={handleOk}>등록</button>
        <button className={styles.secondary} onClick={handleCancel}>취소</button>
      </div>
    </div>
  )
}
