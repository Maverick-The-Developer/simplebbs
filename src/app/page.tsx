import Link from 'next/link'
import styles from './page.module.css'

export default function HomePage() {
  return (
    <>
      <h1>간단 게시판 예제</h1>
      <Link href='/bbs/list'>게시판 바로가기</Link>
    </>
  )
}
