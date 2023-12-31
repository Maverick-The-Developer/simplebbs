'use client'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { useSearchParams } from 'next/navigation'
import PagingBar from '@/components/PagingBar'
import Link from 'next/link'
import { UTC2Local } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import PagingNav from '@/components/PagingNav'

type TLine = {
  id: string
  title: string
  author: string
  date: string
}

type TDTO = {
  totalCount: number
  list: {
    id: string
    title: string
    author: string
    content: string
    created_at: string
    updated_at: string
  }[]
}
type Props = {}

export default function ListPage({}: Props) {
  const searchParams = useSearchParams()
  const itemsPerPage = 5
  const currentPage = parseInt(searchParams.get('page') || '1', 10)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [totalPage, setTotalPage]  = useState<number>(1)
  const [list, setList] = useState<TLine[] | null>(null)
  const noStart = totalCount - (currentPage - 1) * itemsPerPage
  const router = useRouter()

  async function fetchData(page: number = 1) {
    let url = 'http://bbsapi.mavericksoft.xyz/bbsapi'
    let paramsArray: string[] = []
    if (page > 1) {
      paramsArray.push(`p=${page}`)
    }
    paramsArray.push(`n=${itemsPerPage}`)
    const paramsStr = paramsArray.join('&')
    if (paramsStr.length > 0) {
      url += '?' + paramsStr
    }
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json',
      },
    })
    if (response.ok) {
      const data: TDTO = await response.json()
      setTotalCount(data.totalCount)
      const titleList: TLine[] = data.list.map((item) => {
        const newDate = UTC2Local(item.created_at)
        return {
          id: item.id,
          title: item.title,
          author: item.author,
          date: newDate,
        }
      })
      setList(titleList)
      setTotalPage(data.totalCount < 1 ? 1 : Math.ceil(data.totalCount / itemsPerPage))
    } else {
      alert('게시글 목록을 가져오지 못했습니다. 인터넷 연결을 확인하세요')
    }
  }

  function gotoView(id: string) {
    router.push(`/bbs/view/${id}`)
  }

  useEffect(() => {
    fetchData(currentPage)
  }, [currentPage])
  return (
    <div className={styles.ListPage}>
      <h1>간단 게시판</h1>
      <div className={styles.listTable}>
        <div className={styles.listHeader}>
          <p>No.</p>
          <p>제목</p>
          <p>글쓴이</p>
          <p>작성일</p>
        </div>
        {list?.map((line, idx) => (
          <div key={line.id} className={styles.listRow} onClick={() => gotoView(line.id)}>
            <p>{noStart - idx}</p>
            <p className={styles.leftAlign}>
              {line.title}
            </p>
            <p>{line.author}</p>
            <p>{line.date}</p>
          </div>
        ))}
      </div>
      <div className={styles.buttomBar}>
        {/* <PagingBar
          currentPage={currentPage}
          totalCount={totalCount}
          itemsPerPage={itemsPerPage}
        /> */}
        <PagingNav currentPage={currentPage} totalPage={totalPage} />
        <Link href='/bbs/new'>글쓰기</Link>
      </div>
    </div>
  )
}
