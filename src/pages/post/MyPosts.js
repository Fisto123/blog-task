import React from "react";
import { useDeleteUsersBlog, useGetUsersBlog } from "../../hooks/api";
import { getDataFromLocalStorage } from "../../utils/localstorage";
import moment from "moment";
import { Avatar, CircularProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { Delete } from "@mui/icons-material";

const MyPosts = () => {
  let userid = getDataFromLocalStorage()?.id;
  const { isLoading, error, data } = useGetUsersBlog(userid);
  const deleteUsersBlog = useDeleteUsersBlog();
  const handleDelete = async () => {
    try {
      await deleteUsersBlog.mutateAsync(data?.data[0]?.id);
      alert("Blog post deleted successfully");
    } catch (error) {
      alert("Error deleting blog post:", error);
    }
  };

  let nav = useNavigate();
  return (
    <div>
      <div className="max-w-[1040px] mt-5 mx-auto h-auto">
        {isLoading && <CircularProgress color="secondary" />}
        {error && (
          <h3 className="text-3xl items-center">error fetching posts</h3>
        )}
        <h3 className="text-md font-bold uppercase text-orange-500">
          {data && data?.data?.length} post(s) created
        </h3>

        <div className="m-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data &&
            data?.data?.map((item, index) => (
              <div key={index} className="rounded-md shadow-lg flex flex-col">
                <img
                  className="h-[120px] w-full"
                  src={item?.image}
                  alt={`nature Post ${index + 1}`}
                />
                <div className="m-2">
                  <div className="flex flex-row gap-1">
                    {item &&
                      item?.tags?.map((tag, i) => (
                        <h8
                          key={i}
                          className="text-xs text-white bg-blue-500 rounded-full p-1 m-1">
                          {tag}
                        </h8>
                      ))}
                  </div>
                  <h4 className="text-xs mt-2 font-bold">{item?.text}</h4>
                  <div className="flex justify-between mt-2">
                    <div className="text-xs">
                      {moment(item?.publishDate).format("LL")}
                    </div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <div className="text-xs flex justify-center gap-1 items-center">
                      <Avatar
                        alt="Remy Sharp"
                        src={item?.owner?.picture}
                        sx={{ width: 24, height: 24 }}
                      />
                      {item?.owner?.title +
                        " " +
                        item?.owner?.firstName +
                        " " +
                        item?.owner?.lastName}
                    </div>
                    <div>
                      <EditIcon onClick={() => nav(`/edit-post/${item?.id}`)} />
                      <Delete
                        sx={{ color: "red" }}
                        onClick={() => handleDelete()}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
