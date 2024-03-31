import React, { useState } from "react";
import { Link } from "react-router-dom";

const BookmarkCard = ({ data }) => {
  const { title, collection_name, url, date } = data;

  const getdate = (date) => {
    const d = new Date(date);
    return d.toDateString();
  };

  const getTime = (date) => {
    const d = new Date(date);
    let hours = d.getHours();
    const minutes = d.getMinutes();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${formattedMinutes} ${amOrPm}`;
  };

  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Save edited title
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Cancel editing
    setEditedTitle(title);
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
          <div>{title}</div>
        )}
        <div>
          {isHovered && !isEditing && (
            <div className="edit-delete-options">
              <div className="edit-btn" onClick={handleEdit}>
                Edit
              </div>
              <div className="delete-btn" onclick={handleDelete}>
                Delete
              </div>
            </div>
          )}
          {isEditing && (
            <div className="edit-options">
              <div className="save-btn" onClick={handleSave}>
                Save
              </div>
              <div className="cancel-btn" onClick={handleCancel}>
                Cancel
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
      <div className="bookmark-date">{getdate(date)}</div>
      <div className="bookmark-time">{getTime(date)}</div>
    </div>
  );
};

export default BookmarkCard;
