'use client'
import { UTC2Local } from '@/lib/utils'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'

type TDTO = {
  id: string
  title: string
  author: string
  content: string
  created_at: string
  updated_at: string
}

export default function ViewPage({ params }: { params: { id: string } }) {
  const id = params.id
  const [postData, setPostData] = useState<TDTO | null>(null)

  async function fetchData() {
    const response = await fetch(`http://bbsapi.mavericksoft.xyz/bbsapi/${id}`)
    if (response.ok) {
      const data: TDTO = await response.json()
      setPostData(data)
    } else {
      window?.alert('게시글을 읽어오는데 실패하였습니다.')
      setPostData(null)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className={styles.ViewPage}>
      <h1 className={styles.title}>{postData !== null ? postData.title : '......'}</h1>
      <p className={styles.infoLine}>
        <span>{postData?.author}</span>
        <span>{UTC2Local(postData !== null ? postData.created_at : '____-__-__')}</span>
      </p>
      <p className={styles.content}>{postData?.content}</p>
      <p className={styles.buttonBar}>
        <button onClick={() => {}}>수정</button>
        <button onClick={() => {}}>목록으로</button>
      </p>
    </div>
  )
}
