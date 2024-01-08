import React from "react";
import SectionTop from "../reusables/SectionTop";
import { useRecentBlogs } from "../../hooks/api";
import moment from "moment/moment";
import Avatar from "@mui/material/Avatar";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Recent = () => {
  const { isLoading, error, data } = useRecentBlogs();
  const recentData = data && data ? data?.data?.slice(0, 4) : [];
  let nav = useNavigate();
  console.log(data);
  return (
    <div className="h-auto  mt-10">
      <div className=" text-white m-4 flex md:flex-row xs:flex-col justify-center gap-2 ">
        <div className="md:w-[40%] xs:w-full shadow-lg h-full transition duration-300 ease-in-out transform hover:scale-105">
          <div
            className="h-[65%] cursor-pointer"
            onClick={() => nav(`/single-post/${recentData[0]?.id}`)}>
            <img
              className="h-[300px] w-full object-contain"
              src={recentData[0]?.image}
              alt="Post"
            />
          </div>
          <div className="h-[35%] m-4">
            <div className="flex justify-start items-center w-[80%]">
              {recentData &&
                recentData[0]?.tags.map((tag, i) => (
                  <h4
                    key={i}
                    className="bg-orange-400 w-full text-xs p-1 m-1 text-center text-white rounded-md">
                    {tag}
                  </h4>
                ))}
            </div>
            <h3 className="font-bold text-lg text-center mt-2">
              {recentData[0]?.text}
            </h3>
          </div>
          <div className="flex text-black text-xs m-2 items-center gap-1">
            <span className="text-blue-500 font-bold mr-1">Posted by:</span>
            <div>
              <Avatar
                alt="User Avatar"
                src={recentData[0]?.owner?.picture}
                sx={{ width: 24, height: 24 }}
              />
            </div>
            {[
              recentData[0]?.owner?.title,
              recentData[0]?.owner?.firstName,
              recentData[0]?.owner?.lastName,
            ]
              .filter(Boolean)
              .join(" ")}
          </div>
          <div className="text-black text-xs m-2">
            <span className="text-blue-500 font-bold">Date published:</span>{" "}
            {moment(recentData[0]?.publishDate).format("LL")}
          </div>
        </div>
        <div className=" md:w-[40%] xs:w-full ">
          <div className="flex justify-between m-3">
            {isLoading && <CircularProgress color="secondary" />}
            {error && <h3>Error Loading recent data</h3>}
            <h4 className="text-blue-800 font-bold">Recent News</h4>
            <h6
              className="text-sm underline text-gray-700 cursor-pointer"
              onClick={() => nav(`/posts`)}>
              See All News
            </h6>
          </div>
          <div>
            {recentData &&
              recentData?.map((data) => (
                <SectionTop
                  img={data?.image}
                  text={data?.text}
                  tags={data?.tags}
                  date={data?.publishDate}
                  id={data?.id}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recent;
