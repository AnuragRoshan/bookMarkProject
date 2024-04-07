import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { CiSaveUp2 } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";

const BookmarkCard = ({ data }) => {
  const { bookmark_name, collection_name, url, created_on, tags } = data;

  const getdate = (created_on) => {
    const d = new Date(created_on);
    return d.toDateString();
  };

  const getTime = (created_on) => {
    const d = new Date(created_on);
    let hours = d.getHours();
    const minutes = d.getMinutes();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${formattedMinutes} ${amOrPm}`;
  };

  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(bookmark_name);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    // Save edited title
    setIsEditing(false);
    await axios.post("http://localhost:5000/api/v1/bookmark/rename", {
      user_id: "6608f182472c4f5e0dda23b7",
      url,
      new_bookmark_name: editedTitle,
    });
  };

  const handleCancel = () => {
    // Cancel editing
    setEditedTitle(bookmark_name);
    setIsEditing(false);
  };

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleDelete = (e) => {
    // Delete the bookmark
  };

  return (
    <div
      className="bookmark-top"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bookmark-title">
        {isEditing ? (
          <input type="text" value={editedTitle} onChange={handleTitleChange} />
        ) : (
          <div>{editedTitle}</div>
        )}
        <div>
          {isHovered && !isEditing && (
            <div className="edit-delete-options">
              <div className="edit-btn" onClick={handleEdit}>
                <CiEdit />
              </div>
              <div className="delete-btn" onclick={handleDelete}>
                <MdOutlineDelete />
              </div>
            </div>
          )}
          {isEditing && (
            <div className="edit-options">
              <div className="save-btn" onClick={handleSave}>
                <CiSaveUp2 />
              </div>
              <div className="cancel-btn" onClick={handleCancel}>
                <MdOutlineCancel />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bookmark-collection">
        <Link to={`/bookmark/collection/${collection_name}`}>
          {collection_name}
        </Link>
      </div>
      <div className="bookmark-url">
        URL : <Link to={url}>{url}</Link>
      </div>
      <div className="bookmark-tags">
        {
          // Tags
          tags &&
            tags.map((tag, index) => (
              <>
                <Link to={`/hello/${tag}`}>
                  <div key={index} className="tag-selected">
                    {tag}
                  </div>
                </Link>
              </>
            ))
        }
      </div>
      <div className="bookmark-date">{getdate(created_on)}</div>
      <div className="bookmark-time">{getTime(created_on)}</div>
    </div>
  );
};

export default BookmarkCard;
