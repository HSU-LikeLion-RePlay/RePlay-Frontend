import React from "react";
import { useAtom } from "jotai";
import { bookmarksAtom } from "../../../atoms";
import "../css/post.css"; // 필요한 CSS 파일

const BookmarkPage = () => {
  const [bookmarks] = useAtom(bookmarksAtom);

  return (
    <div className="bookmark-page">
      <h1>북마크 페이지</h1>
      {bookmarks.length === 0 ? (
        <p>북마크가 없습니다.</p>
      ) : (
        <ul className="bookmark-list">
          {bookmarks.map((bookmark, index) => (
            <li key={index} className="bookmark-item">
              <h2>{bookmark.title}</h2>
              <p>{bookmark.date}</p>
              <p>{bookmark.issue}</p>
              <p>{bookmark.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookmarkPage;
