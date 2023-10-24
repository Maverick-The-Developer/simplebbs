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

  if(postData === null) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <h1 style={{ textAlign: 'center' }}>Network Error</h1>
        <Link href={'/'} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
          홈으로 돌아가기
        </Link>
      </div>
    )
  } else {
    return (
      <div className={styles.ViewPage}>
        <h1 className={styles.title}>{postData.title}</h1>
        <p className={styles.infoLine}>
          <span>{postData.author}</span>
          <span>{UTC2Local(postData.created_at)}</span>
        </p>
        <p className={styles.content}>{postData.content}</p>
        <p className={styles.buttonBar}>
          <button onClick={() => {}}>수정</button>
          <button onClick={() => {}}>목록으로</button>
        </p>
      </div>
    )
  }
}
