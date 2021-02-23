import Head from 'next/head'
import { getPreEmitDiagnostics } from 'typescript'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'

const {BLOG_URL,CONTENT_API_KEY} = process.env

type Post = {
  title: string
  slug: string
}

async function getPosts(){
  //curl "https://demo.ghost.io/ghost/api/v3/content/posts/?key=22444f78447824223cefc48062"
  const res = await fetch(`
  ${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=title,slug,custom_excerpt,reading_time`)
  .then((res) => res.json())
  //ghostからこれをとってくる&fields=title,url`).　欲しいものを追加 slugとか

  const posts = res.posts

  return posts
}
export const getStaticProps = async ({ params }) => {
  const posts = await getPosts ()
  return {
    props: { posts }
  }
}

const Home: React.FC<{props: Post[] }> =(props) => {
  const { posts } = props
  return (
  <div className={styles.container}>
    <h1>Hello to my blog</h1>
    <ul>
      {posts.map((post, index) => {
        return (
        <li key={post.slug}>
          <Link href="/post/[slug]" as={`/post/${post.slug}`}>
              <a>{post.title}</a>
          </Link>
        </li>
        )
      })}
    </ul>
  </div>
  )
}

export default Home


//const titles = res.map((post) => post.title)これではだめなぜならpostsはキーだから
//console.log(titles) 
//ここで終わるとエラーが出る。returnしないとだめ
//それぞれの記事を表示させるためにmap
//return titles
//ここまでやるとcosoleでjsonを確認できる