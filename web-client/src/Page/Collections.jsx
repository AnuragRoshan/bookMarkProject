import React from "react";
import { Link, useParams } from "react-router-dom";
import BookmarkCard from "../Components/BookmarkCard";

const Collections = () => {
  const { origin, id } = useParams();
  const bookmarks = [
    {
      title: "Lorem Ipsum",
      collection_name: "Lorem Collection",
      url: "https://example.com/lorem",
      date: "2024-03-31T00:00:00.000Z",
    },
    {
      title: "Dolor Sit Amet",
      collection_name: "Dolor Collection",
      url: "https://example.com/dolor",
      date: "2024-03-30T00:00:00.000Z",
    },
    {
      title: "Consectetur Adipiscing Elit",
      collection_name: "Consectetur Collection",
      url: "https://example.com/consectetur",
      date: "2024-03-29T00:00:00.000Z",
    },
    {
      title: "Sed Do Eiusmod Tempor",
      collection_name: "Sed Collection",
      url: "https://example.com/sed",
      date: "2024-03-28T00:00:00.000Z",
    },
    {
      title: "Incididunt Ut Labore Et Dolore",
      collection_name: "Incididunt Collection",
      url: "https://example.com/incididunt",
      date: "2024-03-27T00:00:00.000Z",
    },
  ];

  return (
    <div>
      <div className="bookmark-head">{id}</div>
      {bookmarks.map((bookmark, index) => (
        // <Link to={bookmark.url}>
        <div className="bookmark-card-map">
          <BookmarkCard key={index} data={bookmark} />
        </div>
        // </Link>
      ))}
    </div>
  );
};

export default Collections;
