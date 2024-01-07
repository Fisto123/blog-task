import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleBlog } from "../../hooks/api";
import moment from "moment";
import { Avatar, CircularProgress } from "@mui/material";

const SinglePost = () => {
  let { postid } = useParams();
  const { isLoading, error, data: blog } = useGetSingleBlog(postid);

  return (
    <div>
      <div className="flex justify-center items-center mt-10">
        {isLoading && <CircularProgress color="secondary" />}
        {error && (
          <h3 className="text-red-500 text-3xl">
            {error?.response?.data?.error}
          </h3>
        )}
      </div>

      {blog && (
        <div className="max-w-2xl mx-auto my-8  p-6 bg-white shadow-lg rounded-md">
          <img
            className="w-full h-64 object-contain mb-4"
            src={blog?.image}
            alt="Blog Cover"
          />

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Avatar
                alt={`${blog?.owner?.title} ${blog?.owner?.firstName} ${blog?.owner?.lastName}`}
                src={blog?.owner?.picture}
                sx={{ width: 40, height: 40 }}
              />
              <div className="ml-2">
                <p className="text-sm font-semibold">{`${blog?.owner?.title} ${blog?.owner?.firstName} ${blog?.owner?.lastName}`}</p>
                <p className="text-xs text-gray-500">
                  {moment(blog?.publishDate).format("LL")}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">{blog?.likes} Likes</span>
              {blog &&
                blog?.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
            </div>
          </div>

          <h2 className="text-xl font-bold mb-2">{blog?.text}</h2>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
