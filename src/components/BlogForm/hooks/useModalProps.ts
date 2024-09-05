import { blogsLinkByPage } from "@/general-utils/app-routes";
import { deleteBlogPost } from "@/server-utils/blogsFunctions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useModalProps(blogId: string | undefined, toUpdate: boolean) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleDeletePost = async () => {
    if (!!blogId) deleteBlogPost(blogId);
    router.push(blogsLinkByPage(1));
  };

  const message = toUpdate
    ? "Do you really want to delete this post? This process cannot be undone"
    : "The post will be lost.";

  return {
    isOpen: isModalOpen,
    setIsOpen: setIsModalOpen,
    deletePost: handleDeletePost,
    message
  };
}
