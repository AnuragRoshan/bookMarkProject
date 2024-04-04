import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BookmarkCard from "../Components/BookmarkCard";
import axios from "axios";
import Home from "./Home";

const Collections = () => {
  const { origin, id } = useParams();
  console.log(origin, id);
  const [bookmarkData, setbookmarkData] = useState([]);
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    getBookmarkData();
  }, [id, origin]);

  const getBookmarkData = async () => {
    const user_id = "6608f182472c4f5e0dda23b7";
    setIsloading(true);
    try {
      const response = await axios
        .post("http://localhost:5000/api/v1/bookmarks/fetch", {
          user_id: user_id,
          all_bookmarks: true,
          favorite: false,
          without_tag: false,
          collection_name: id,
          tag_name: "",
          search: "",
        })
        .then((res) => {
          setbookmarkData(res.data.bookmark_list);
          setIsloading(false);
        });
    } catch (error) {
      console.error("Error fetching bookmark data:", error);
    }
  };

  return (
    <div>
      {isloading ? (
        <div style={{ height: "90vh", display: "flex" }}>
          <div className="loader"></div>
        </div>
      ) : (
        <>
          {!bookmarkData.length ? (
            <Home id={id} />
          ) : (
            <>
              <div className="bookmark-head">{id}</div>
              <div className="bookmark-card">
                {bookmarkData.map((bookmark, index) => (
                  // <Link to={bookmark.url}>
                  <div className="bookmark-card-map">
                    <BookmarkCard key={index} data={bookmark} />
                  </div>
                  // </Link>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Collections;
