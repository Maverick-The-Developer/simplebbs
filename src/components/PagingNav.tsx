'use client'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, KeyboardEvent, useRef } from 'react'
import styles from './PagingNav.module.css'
import Link from 'next/link'
import { BiCaretLeftCircle, BiCaretRightCircle } from 'react-icons/bi'

type Props = {
  currentPage: number
  totalPage: number
}

export default function PagingNav({ currentPage, totalPage }: Props) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value
    if (inputValue != '') {
      const parsedNumber = parseInt(inputValue, 10)
      if (isNaN(parsedNumber)) {
        alert('숫자만 입력하실 수 있습니다.')
        return
      } else {
        if (parsedNumber < 1 || parsedNumber > totalPage) {
          alert(`입력 가능한 페이지 값은 1 부터 ${totalPage} 까지의 숫자 입니다.`)
          return
        }
      }
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault()
      const inputValue = inputRef?.current?.value
      if (inputValue) {
        const newPage = parseInt(inputValue)
        if (!isNaN(newPage) && newPage > 0 && newPage <= totalPage) {
          router.push(`?page=${newPage}`)
        } else {
          alert('올바른 페이지 번호를 입력하셔야 합니다.')
        }
      }
    }
  }
  return (
    <div className={styles.PagingNav}>
      {currentPage > 1 ? (
        <Link href={`/bbs?page=${currentPage - 1}`}>
          <BiCaretLeftCircle />
        </Link>
      ) : (
        null
      )}
      <input
        id='inputPage'
        ref={inputRef}
        type='text'
        defaultValue={currentPage}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <label htmlFor='inputPage'>/ {totalPage}</label>
      {currentPage < totalPage ? (
        <Link href={`/bbs?page=${currentPage + 1}`}>
          <BiCaretRightCircle />
        </Link>
      ) : (
        null
      )}
    </div>
  )
}
