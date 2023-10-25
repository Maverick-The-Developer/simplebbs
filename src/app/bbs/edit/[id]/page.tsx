'use client'
import React, { useState, MouseEvent, useEffect } from 'react'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'

type TDTO = {
  id: string
  created_at: string
  updated_at: string
  title: string
  author: string
  content: string
}

const FETCH_ENDPOINT = 'http://bbsapi.mavericksoft.xyz/bbsapi'

export default function EditPostPage({ params }: { params: { id: string } }) {
  const postID = params.id
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')

  async function getData(postID: string) {
    if (postID.length < 1) return
    const url = `${FETCH_ENDPOINT}/${postID}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      const postData: TDTO = await response.json()
      setTitle(postData.title)
      setAuthor(postData.author)
      setContent(postData.content)
    } else {
      alert('게시글이 존재하지 않습니다.')
      router.replace('/bbs')
    }
  }
  async function sendData() {
    if (title.trim().length < 1) {
      window?.alert('제목을 입력하여야 합니다')
      return
    }
    if (author.trim().length < 1) {
      window?.alert('작성자를 입력하여야 합니다')
      return
    }
    if (content.trim().length < 1) {
      window?.alert('본문을 입력하여야 합니다.')
      return
    }
    const postData = {
      id: postID,
      title,
      author,
      content,
    }
    const url = `${FETCH_ENDPOINT}/${postID}`
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      // post success
      alert('글이 수정되었습니다.')
      router.replace('/bbs')
    } else {
      alert('글 수정에 문제가 발생하였습니다. 관리자에게 문의하세요')
      return
    }
  }

  async function deleteData() {
    const url = `${FETCH_ENDPOINT}/${postID}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json'
      }
    })
    if (response.ok) {
      alert('글이 삭제되었습니다')
      router.replace('/bbs')
    } else {
      alert('글삭제 과정에 문제가 발생하였습니다. 관리자에게 문의하세요')
    }
  }


  function handleOk(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    sendData()
  }

  function handleDelete(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    if(confirm('이 게시글을 정말 삭제하시겠습니까? 되돌릴 수 없는 작업입니다.')) {
      deleteData()
    }
  }

  function handleCancel(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    router.back()
  }

  useEffect(() => {
    getData(postID)
  }, [postID])
  return (
    <div className={styles.EditPostForm}>
      <h1>글 수정</h1>
      <div className={styles.inputBar}>
        <label htmlFor='title'>제목</label>
        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className={styles.inputBar}>
        <label htmlFor='author'>작성자</label>
        <input type='text' value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div className={styles.inputBox}>
        <label>본문</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      <div className={styles.buttonBar}>
        <button className={styles.primary} onClick={handleOk}>
          수정
        </button>
        <button className={styles.warning} onClick={handleDelete}>
          삭제
        </button>
        <button className={styles.secondary} onClick={handleCancel}>
          취소
        </button>
      </div>
    </div>
  )
}
