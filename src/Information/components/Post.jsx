import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAtom } from "jotai";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/post.css";
import { bookmarksAtom } from "../../../atoms";

import bookmarkIcon from "../image/bookmark.jpg";
import bookmarkHoverIcon from "../image/orangebookmark.jpg";
import dotIcon from "../image/circle.jpg";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarkImage, setBookmarkImage] = useState(bookmarkIcon);
  const [isClicked, setIsClicked] = useState(false);
  const [bookmarks, setBookmarks] = useAtom(bookmarksAtom);

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("로그인이 필요합니다.");
        return;
      }

      try {
        const response = await fetch(
          `http://43.201.176.194:8080/api/info/getInfoById/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 403) {
          console.error("접근 권한이 없습니다. 다시 로그인해주세요.");
          return;
        }

        const result = await response.json();

        if (response.status === 200) {
          setPost(result.data);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("네트워크 오류가 발생했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    if (post && bookmarks.some((bookmark) => bookmark.id === post.infoId)) {
      setBookmarkImage(bookmarkHoverIcon);
      setIsClicked(true);
    }
  }, [bookmarks, post]);

  const handleMouseEnter = () => {
    if (!isClicked) {
      setBookmarkImage(bookmarkHoverIcon);
    }
  };

  const handleMouseLeave = () => {
    if (!isClicked) {
      setBookmarkImage(bookmarkIcon);
    }
  };

  const handleClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await fetch("http://43.201.176.194:8080/api/scrap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ infoId: post.infoId }),
      });

      const result = await response.json();

      if (response.status === 200) {
        if (result.data) {
          setBookmarks([...bookmarks, post]);
          console.log("스크랩 되었습니다.");
        } else {
          setBookmarks(
            bookmarks.filter((bookmark) => bookmark.infoId !== post.infoId)
          );
          console.log("스크랩 해제 되었습니다.");
        }
        setIsClicked(!isClicked);
        setBookmarkImage(isClicked ? bookmarkIcon : bookmarkHoverIcon);
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.error("스크랩 처리 중 오류가 발생했습니다.", error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    customPaging: (i) => (
      <div className="slick-dot">
        <img src={dotIcon} alt={`dot-${i}`} />
      </div>
    ),
    appendDots: (dots) => (
      <div className="slick-dots-container">
        <div className="dots-wrapper">{dots}</div>
      </div>
    ),
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="postcontainer">
      <div className="post-container">
        <header className="post-container-header">
          <div className="issue-number">{post.infoNum}</div>
          <div className="date">{post.createdAt}</div>
          <button
            className="bookmark"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          >
            <img src={bookmarkImage} alt="bookmark" />
          </button>
          <Link to="/bookmarks" className="bookmark-page-link">
            북마크 페이지로 이동
          </Link>
        </header>
        <main className="main-content">
          <h1 className="title">{post.title}</h1>
          <Slider {...settings} className="slider">
            <div className="slide">
              <img
                src={post.thumbnailUrl}
                alt="슬라이드"
                className="image-placeholder"
              />
            </div>
          </Slider>
          <div className="content">{post.content}</div>
        </main>
        <footer className="post-footer">
          <div className="post-text-footer">{post.writer}</div>
        </footer>
      </div>
    </div>
  );
};

export default Post;
