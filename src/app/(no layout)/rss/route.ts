import { PostListRequest, PostListResult } from "@app/getPostList";
import Post from "@domain/post";
import PostList from "@domain/postList";
import UseCaseFactory, { UseCaseOption } from "@infra/useCaseFactory";
import dayjs from "dayjs";
import { Feed, FeedOptions } from "feed";
import md from 'markdown-it'
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

import highlightMarkdown from '@/infrastructure/helper/highlightMarkdown';

const generateRssFeed = (posts: Post[]) => {

  const m = md({
    html: true,
    highlight(str, lang, attrs) {
      return highlightMarkdown(str, lang, attrs)
    },
  })


  // /**   
  //     updated?: Date;
  //     generator?: string;
  //     ttl?: number;
  //     feed?: string;
  //     feedLinks?: any;
  //     hub?: string;
  //     docs?: string;
  //     copyright: string; */

  const options: FeedOptions = {
    id: "http://localhost:3000",
    title: "My Website's RSS Feed",
    description: "Stay up to date with my latest content",
    link: "http://localhost:3000",
    language: "en",
    image: "http://localhost:3000/logo.png",
    favicon: "http://localhost:3000/favicon.ico",
    author: {
      name: "John Doe",
      email: "john@example.com",
      link: "http://localhost:3000/about",
    },
    copyright: 'techos.dev',
    ttl: 60
  }

  const feed = new Feed(options)

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: post.title,
      link: `http://localhost:3000/post/${post.slug}`,
      date: dayjs(post.start_at).toDate(),
      content: m.render(post.extract || ''),
      image: post.picture?.src,
    })
  })

  return feed.rss2()
}

export async function GET(request: NextRequest, params: any) {

  // const configManager = await IOC().resolve<IConfigManager>('ConfigManager')


  let posts: Post[] = []
  const page = 0
  const limit = 2

  let isError = false
  const useCase = await UseCaseFactory.Instance.getUseCase<PostListRequest, PostList, PostListResult>(UseCaseOption.GET_POST_LIST);
  let response = await useCase?.execute({ index: page * limit, limit });

  if (response.IsError) {
    console.error('response.Error:', response)
    redirect('/error/400')
  }

  posts = posts.concat(response.Value.posts.map((post) => post as Post))

  while (!isError && response.Value.meta.pagination.page <= response.Value.meta.pagination.pageCount) {
    response = await useCase?.execute({ index: response.Value.meta.pagination.page * limit, limit });
    if (response.IsError) {
      isError = true
      console.error('response.Error:', response)
      redirect('/error/400')
    } else {
      posts = posts.concat(response.Value.posts.map((post) => post as Post))
    }
  }

  generateRssFeed(posts)

  const res = new NextResponse(generateRssFeed(posts), {
    headers: {
      'Content-Type': 'text/xml',
      'Cache-Control': 's-maxage=1, stale-while-revalidate',
    },
  })

  return res
}
