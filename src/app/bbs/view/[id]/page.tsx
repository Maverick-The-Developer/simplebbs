'use client'
import { UTC2Local } from '@/lib/utils'
import React, { useEffect, useState, MouseEvent } from 'react'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const FETCH_ENDPOINT = 'http://bbsapi.mavericksoft.xyz/bbsapi'

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
  const router = useRouter()

  async function fetchData(id:string) {
    const response = await fetch(`${FETCH_ENDPOINT}/${id}`)
    if (response.ok) {
      const data: TDTO = await response.json()
      setPostData(data)
    } else {
      window?.alert('게시글을 읽어오는데 실패하였습니다.')
      setPostData(null)
    }
  }

  async function deleteData() {
    const url = `${FETCH_ENDPOINT}/${id}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json'
      }
    })
    if (response.ok) {
      alert('글이 삭제되었습니다')
      router.back()
    } else {
      alert('글삭제 과정에 문제가 발생하였습니다. 관리자에게 문의하세요')
    }
  }
  
  function handleDelete(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    if(confirm('이 게시글을 정말 삭제하시겠습니까? 되돌릴 수 없는 작업입니다.')) {
      deleteData()
    }
  }

  useEffect(() => {
    fetchData(id)
  }, [id])

  return (
    <div className={styles.ViewPage}>
      <h1 className={styles.title}>{postData !== null ? postData.title : '......'}</h1>
      <p className={styles.infoLine}>
        <span>{postData?.author}</span>
        <span>{UTC2Local(postData !== null ? postData.created_at : '____-__-__')}</span>
      </p>
      <p className={styles.content}>{postData?.content}</p>
      <p className={styles.buttonBar}>
        <Link href={`/bbs/edit/${postData?.id}`}>수정</Link>
        <button className={styles.warning} onClick={handleDelete}>
          삭제
        </button>
        {/* <button onClick={() => {router.back()}}>목록으로</button> */}
        <Link href={'javascript:history.back()'}>목록으로</Link>
      </p>
    </div>
  )
}
