import { PostListRequest, PostListResult } from "@app/getPostList";
import Post from "@domain/post";
import PostList from "@domain/postList";
import UseCaseFactory, { UseCaseOption } from "@infra/useCaseFactory";
import dayjs from "dayjs";
import { Feed, FeedOptions } from "feed";
import md from "markdown-it";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

import highlightMarkdown from "@/infrastructure/helper/highlightMarkdown";

const generateRssFeed = (posts: Post[]) => {
  const m = md({
    html: true,
    highlight(str, lang) {
      return highlightMarkdown(str, lang);
    },
  });

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
    id: `${process.env.NEXT_PUBLIC_FRONT_URL}`,
    title: "Techos.dev RSS Feed",
    description: "Découvrez les dernières tendances de codage sur techos.dev",
    link: `${process.env.NEXT_PUBLIC_FRONT_URL}`,
    language: "fr",
    image: `${process.env.NEXT_PUBLIC_FRONT_URL}/logo.png`,
    favicon: `${process.env.NEXT_PUBLIC_FRONT_URL}/favicon.ico`,
    author: {
      name: "Yoann Lorho",
      email: "yoann.lorho@gmail.com",
      link: `${process.env.NEXT_PUBLIC_FRONT_URL}/about`,
    },
    copyright: "techos.dev",
    ttl: 60,
  };

  const feed = new Feed(options);

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: post.title,
      link: `${process.env.NEXT_PUBLIC_FRONT_URL}/post/${post.slug}`,
      date: dayjs(post.start_at).toDate(),
      content: m.render(
        post.extract !== undefined ? post.extract : post.content
      ),
      image: post.picture?.src,
    });
  });

  return feed.rss2();
};

export async function GET() {
  let posts: Post[] = [];
  const page = 0;
  const limit = 2;

  let isError = false;
  const useCase = await UseCaseFactory.Instance.getUseCase<
    PostListRequest,
    PostList,
    PostListResult
  >(UseCaseOption.GET_POST_LIST);
  let response = await useCase?.execute({ index: page * limit, limit });

  if (response.IsError) {
    console.error("response.Error:", response);
    redirect("/error/400");
  }

  posts = posts.concat(response.Value.posts.map((post) => post as Post));

  while (
    !isError &&
    response.Value.meta.pagination.page <=
      response.Value.meta.pagination.pageCount
  ) {
    response = await useCase?.execute({
      index: response.Value.meta.pagination.page * limit,
      limit,
    });
    if (response.IsError) {
      isError = true;
      console.error("response.Error:", response);
      redirect("/error/400");
    } else {
      posts = posts.concat(response.Value.posts.map((post) => post as Post));
    }
  }

  generateRssFeed(posts);

  const res = new NextResponse(generateRssFeed(posts), {
    headers: {
      "Content-Type": "text/xml",
      "Cache-Control": "s-maxage=1, stale-while-revalidate",
    },
  });

  return res;
}
