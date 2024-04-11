import { Provider } from "react-redux";
import { store } from "./store";
import { fetchBlogs } from "./blogsSlice";
import { fetchTags } from "./tagsSlice";
import { useEffect } from "react";

export default function ReduxProvider({
  children
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    store.dispatch(fetchBlogs());
    store.dispatch(fetchTags());
  }, []);
  return <Provider store={store}>{children}</Provider>;
}
