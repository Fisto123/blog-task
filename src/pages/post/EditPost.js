import React, { useEffect, useState } from "react";
import { getDataFromLocalStorage } from "../../utils/localstorage";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleBlog, useUpdateUsersBlog } from "../../hooks/api";
import { CircularProgress } from "@mui/material";

const EditPost = () => {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [postError, setPostError] = useState(null);
  let nav = useNavigate();
  let { postid } = useParams();

  const { isLoading, data } = useGetSingleBlog(postid);

  let initialPostdata = {
    text: "",
    image: "",
    tags: [],
  };
  const [postData, setPostData] = useState(initialPostdata);
  const updateUserBlog = useUpdateUsersBlog();
  useEffect(() => {
    setPostData({
      text: data?.text,
      image: data?.image,
      tags: data?.tags,
    });
    setTags(data?.tags);
  }, [data]);
  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);

      // Update the postData state
      setPostData((prev) => {
        return {
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        };
      });

      setTagInput("");
    }
  };
  const handleRemoveTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);

    // Update the tags in postData state
    setPostData((prev) => {
      return {
        ...prev,
        tags: newTags,
      };
    });

    // Update the tags state
    setTags(newTags);
  };

  const handleChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;

    // Check if the property is 'tags'
    if (name === "tags") {
      // Handle tags separately
      setPostData((prev) => {
        return {
          ...prev,
          tags: value,
        };
      });
    } else if (name === "owner") {
      // Merge existing owner with data from localStorage
      setPostData((prev) => {
        return {
          ...prev,
          owner: {
            ...prev.owner,
            ...getDataFromLocalStorage(),
          },
        };
      });
    } else {
      // Handle other properties
      setPostData((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  };
  const handleUpdate = async () => {
    try {
      await updateUserBlog.mutateAsync({
        postid,
        data: postData,
      });
      toast.success("Blog updated successfully");
      nav("/userposts");
    } catch (error) {
      setPostError(error);
      toast.error("Failed to update blog");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 border rounded shadow-md h-auto w-[450px]">
        {isLoading && <CircularProgress color="secondary" />}
        <h1 className="font-bold text-md mb-3 text-purple-500 uppercase">
          Update Blog Post
        </h1>
        <div>
          <textarea
            className="border border-gray-300 p-3 w-full mt-3"
            placeholder="Blog Content"
            name="text"
            onChange={handleChange}
            defaultValue={data?.text}
          />
          <input
            type="text"
            className="border border-gray-300 p-3 w-full mt-3 mb-2"
            placeholder="Blog image"
            name="image"
            onChange={handleChange}
          />
          <div className=" flex justify-center items-center">
            <img alt="img" className="h-20" src={data?.image} />
          </div>
          <div className="mt-3">
            <input
              type="text"
              value={tagInput}
              onChange={handleTagInputChange}
              className="border border-gray-300 p-2 w-[80%]"
              placeholder="Add tags (comma separated)"
            />
            <button
              onClick={handleAddTag}
              className="bg-blue-500 text-white px-3 py-2 ml-2 rounded-sm">
              Add
            </button>
          </div>
          <div className="mt-2">
            {tags &&
              tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full inline-block m-1">
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(index)}
                    className="ml-1 text-red-600">
                    X
                  </button>
                </span>
              ))}
          </div>
          <button
            className={`bg-blue-500 w-full p-4 mt-3 cursor-pointer text-center rounded-lg text-white ${
              postData?.text ? "" : "opacity-50 pointer-events-none"
            }`}
            onClick={handleUpdate}
            disabled={!postData?.text}>
            Edit Blog
          </button>
          {postError && (
            <div className="text-red-500 mb-4">
              {Object.entries(postError).map(([key, value]) => (
                <p key={key}>{`${key}: ${value}`}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditPost;
