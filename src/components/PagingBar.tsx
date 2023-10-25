'use client'
import React, { useEffect } from 'react'
import styles from './PagingBar.module.css'
import { useRouter } from 'next/navigation'

type Props = {
  currentPage: number
  totalCount: number
  itemsPerPage: number
}

export default function PagingBar({ currentPage, totalCount, itemsPerPage }: Props) {
  const router = useRouter()
  const lastPage = totalCount < 1 ? 1 : Math.ceil(totalCount / itemsPerPage)
  const startPage = Math.floor((currentPage - 1) / 10) * 10 +  1
  const endPage = startPage + 9 <= lastPage ? startPage + 9 : lastPage

  const pageArray: number[] = []
  for (let i = startPage; i <= endPage; i++) {
    pageArray.push(i)
  }

  function gotoFirstPage() {
    router.push('/bbs?page=1')
  }
  function gotoPrevPage() {
    router.push(`/bbs?page=${currentPage - 1}`)
  }
  function gotoThisPage(pageNo: number) {
    router.push(`/bbs?page=${pageNo}`)
  }
  function gotoNextPage() {
    router.push(`/bbs?page=${currentPage + 1}`)
  }
  function gotoLastPage() {
    router.push(`/bbs?page=${lastPage}`)
  }

  return (
    <div className={styles.PagingBar}>
      <button disabled={currentPage <= 1} onClick={() => gotoFirstPage()}>
        &lt;&lt;
      </button>
      <button disabled={currentPage <= 1} onClick={() => gotoPrevPage()}>
        &lt;
      </button>
      {pageArray.map((pageNo) => {
        return (
          <button
            key={pageNo}
            className={pageNo === currentPage ? styles.currentPage : ''}
            disabled={pageNo === currentPage}
            onClick={() => gotoThisPage(pageNo)}
          >
            {pageNo}
          </button>
        )
      })}
      <button disabled={currentPage >= lastPage} onClick={() => gotoNextPage()}>
        &gt;
      </button>
      <button disabled={currentPage >= lastPage} onClick={() => gotoLastPage()}>
        &gt;&gt;
      </button>
    </div>
  )
}
