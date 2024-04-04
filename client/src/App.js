/* global chrome */
import React, { useState, useEffect } from 'react';
import AnotherComp from './AnotherComp';
// import axios from 'axios';
import axios from 'axios';


function App() {
  const [component, setComponent] = useState(false);
  const [formData, setFormData] = useState({
    title: 'Title Here',
    note: '',
    collection_name: '',
    tags: '',
    url: '',
    is_favorite: false,
  });
  const [tags, setTags] = useState([]);
  const [collections, setCollections] = useState([

  ]);

  // useEffect to set the default URL value
  useEffect(() => {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      setFormData(prevState => ({
        ...prevState,
        url: tabs[0].url,
        title: tabs[0].title
      }));
    });

    // // Fetch image associated with the tab
    // chrome.tabs.captureVisibleTab(null, { format: "png" }, function (image) {
    //   setFormData(prevState => ({
    //     ...prevState,
    //     image // Set image data URI directly
    //   }));
    // });

    // Fetch the collections
    fetchCollections();


  }, []);
  const fetchCollections = async () => {
    const user_id = "6608f182472c4f5e0dda23b7";
    console.log(user_id)
    const res = await axios.post('http://localhost:5000/api/v1/collections/fetch', { user_id });
    setCollections(res.data.collection_list);
    console.log(res.data.collection_list);
  };
  // Runs only once after initial render
  // Runs only once after initial render

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    console.log(formData);
  };

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newTag = `#${e.target.value.trim()}`;
      if (!tags.includes(newTag)) {
        setTags(prevTags => [...prevTags, newTag]);
      }
      setFormData(prevState => ({
        ...prevState,
        tags: ''
      }));
    }
  };

  const handleTagDelete = (index) => {
    setTags(prevTags => prevTags.filter((_, i) => i !== index));
  };

  const handleBookmarkToggle = () => {
    setFormData(prevState => ({
      ...prevState,
      is_favorite: !prevState.is_favorite
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.tags = tags;
    formData.user_id = "6608f182472c4f5e0dda23b7"
    const res = await axios.post('http://localhost:5000/api/v1/bookmark/save', formData);
    console.log(res);
  };

  const openComp = () => {
    // Open another component
    setComponent(true);
  };

  const handleAddCollection = (newCollection) => {
    // Add the new collection to the collections array
    if (!collections.includes(newCollection)) {
      setCollections(prevCollections => [...prevCollections, newCollection]);
    }
    // Close the AnotherComp component
    setComponent(false);
    // Set the selected collection in formData
    setFormData(prevState => ({
      ...prevState,
      collection_name: newCollection
    }));
    console.log(formData);
  };

  return (
    <>
      {component ? (
        <AnotherComp collections={collections} onAddCollection={handleAddCollection} />
      ) : (
        <div className='top'>
          <>
            <div className='head'>Add Bookmark</div>
            <div className='form-title'>
              <div>{formData.image && <img src="https://images.unsplash.com/photo-1700981293090-f78b500fc92c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Tab Screenshot" className="tab-image" style={{ width: "8rem" }} />}
              </div><div className='input-title'>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
              </div>
            </div>
            <div className='note'>
              <div className='label'>Note:</div>
              <textarea type="text" id="note" name="note" value={formData.note} onChange={handleChange} />
            </div>
            <div className='collection'>
              <div className='label'>Collection:</div>
              <div className='collection-comp' onClick={openComp}>{formData.collection_name || 'Select Collection'}</div>
            </div>
            <div className='tag'>
              <div className='tag-input'>
                <div className='label'>Tag:</div>
                <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange} onKeyPress={handleTagKeyPress} />
              </div>
              <div className="tag-list">
                {tags.map((tag, index) => (
                  <div key={index} className="tag-item" onClick={() => handleTagDelete(index)}>
                    {tag} <span className="delete-tag">X</span>
                  </div>
                ))}
              </div>
            </div>
            <div className='url'>
              <div className='label'>URL:</div>
              <input type="text" id="url" name="url" value={formData.url} onChange={handleChange} />
            </div>
            <div className="bookmark-status" onClick={handleBookmarkToggle}>
              {formData.is_favorite ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
            </div>
            <button className="submit" onClick={handleSubmit}>Save</button>
          </>
        </div>
      )
      }
    </>
  );
}

export default App;
