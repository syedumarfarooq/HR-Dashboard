import React, { createContext, useState } from 'react';

export const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);

  const addBookmark = (user) => {
    if (!bookmarks.find(u => u.id === user.id)) {
      setBookmarks(prev => [...prev, user]);
    }
  };
  console.log("Bookmarks:", bookmarks);
  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};
