import PostForm from "@/components/admin/post-form";

export const metadata = { title: "New note" };

export default function NewPostPage() {
  return (
    <>
      <p className="u-eyebrow text-ink-45">Blogs</p>
      <h1 className="u-display mt-3 text-[2.4rem] leading-none">New note</h1>
      <PostForm />
    </>
  );
}
