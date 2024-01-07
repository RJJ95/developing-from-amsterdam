import { EntrySkeletonType } from "contentful";

interface BlogPost extends EntrySkeletonType {
  blogTitle: string;
  subTitle: string;
  level: string;
  image: File;
  body: string;
}

export default BlogPost;
