import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { newRequest } from "../utils/newRequest";

export const useRecentBlogs = () => {
  return useQuery({
    queryKey: ["recentblogs"],
    queryFn: () => newRequest.get(`/post`).then((res) => res.data),
  });
};

export const useGetSingleBlog = (postid) => {
  return useQuery({
    queryKey: ["singleblog", postid],
    queryFn: () => newRequest.get(`/post/${postid}`).then((res) => res.data),
  });
};
export const useGetBlogTag = (tag, page, limit) => {
  return useQuery({
    queryKey: ["singleblogtag", tag, page, limit], // Include page in the queryKey
    queryFn: () =>
      newRequest
        .get(`/tag/${tag}/post?page=${page}&limit=${limit}`)
        .then((res) => res.data),
  });
};
export const useGetUsersBlog = (userid) => {
  return useQuery({
    queryKey: ["usersblog", userid], // Include page in the queryKey
    queryFn: () =>
      newRequest.get(`/user/${userid}/post`).then((res) => res.data),
  });
};
export const useUpdateUsersBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postid, data }) => {
      return newRequest.put(`/post/${postid}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["usersblog"]);
    },
  });
};

export const useDeleteUsersBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId) => {
      return newRequest.delete(`/post/${postId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["usersblog"]);
    },
  });
};
export const useGetAllBlogs = (page, limit) => {
  return useQuery({
    queryKey: ["singleblogtag", page, limit], // Include page in the queryKey
    queryFn: () =>
      newRequest
        .get(`/post?page=${page}&limit=${limit}`)
        .then((res) => res.data),
  });
};
