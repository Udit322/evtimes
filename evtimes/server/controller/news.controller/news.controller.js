import {
  createNews,
  getAllNews,
  getNewsBySlug,
  incrementViews,
  updateNews,
  changeNewsStatus,
} from "@/server/repository/NewsRepository/news.repository";
import slugify from "slugify";
import News from "@/server/model/NewsModel/news.model";

export const createNewsHandler = async (data, userId) => {
  const { title, content, description, category } = data;

  if (!title || !content || !description || !category) {
    throw new Error("All required fields missing");
  }

  // const slug = slugify(title, { lower: true });

//To ensure unique slug generation, we will use a helper function that checks for existing slugs and appends a number if needed.
const generateUniqueSlug = async (title) => {
  let slug = slugify(title, { lower: true });
  let count = 1;

  while (await News.findOne({ slug })) {
    slug = `${slug}-${count++}`;
  }

  return slug;
};

const slug = await generateUniqueSlug(title);

  return await createNews({
    ...data,
    slug,
    author: userId,
  });
};

export const changeNewsStatusHandler = async (newsId, status, user) => {
  const existingNews = await News.findById(newsId);

  if (!existingNews) {
    throw new Error("News not found");
  }
   
  //  AUTH CHECK
  if (
    existingNews.author.toString() !== user.userId &&
    user.role !== "super_admin"
  ) {
    throw new Error("Not authorized to change status of this news");
  }       

  return await changeNewsStatus(existingNews._id, status);

};

export const getAllNewsHandler = async () => {
  return await getAllNews({ status: "published" });
};

export const getAllPostsHandler = async () => {
  return await getAllNews({ status: "draft" });
};

export const getSingleNewsHandler = async (slug) => {
  const news = await getNewsBySlug(slug);

  if (!news) throw new Error("News not found");

  await incrementViews(news._id);

  return news;
};
// UPDATE NEWS HANDLER
export const updateNewsHandler = async (newsId, data, user) => {
  const existingNews = await News.findById(newsId);// noot finding using slug finding using id

  if (!existingNews) {
    throw new Error("News not found");
  }

  //  AUTH CHECK
  if (
    existingNews.author.toString() !== user.userId &&
    user.role !== "super_admin"
  ) {
    throw new Error("Not authorized to update this news");
  }

  //  If title changes → update slug
  if (data.title) {
    data.slug = slugify(data.title, { lower: true });
  }

  //  If publishing → set publishedAt
  if (data.status === "published" && !existingNews.publishedAt) {
    data.publishedAt = new Date();
  }

  return await updateNews(existingNews._id, data);
};