import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/post.css";
import { bookmarksAtom } from "../../atoms"; // 경로를 수정하여 올바르게 import 합니다.
import InformationHeader from "../../Header/components/InformationHeader";
import Footer from "../../Footer/components/Footer";
import bookmarkIcon from "../image/bookmark.jpg";
import bookmarkHoverIcon from "../image/orangebookmark.jpg";
import dotIcon from "../image/circle.jpg";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const dateParts = date.toLocaleDateString("ko-KR", options).split(". ");
  const [year, month, day] = dateParts.map((part) => part.replace(".", ""));
  return `${year}년 ${month}월 ${day}일`;
};

const Post = () => {
  const { id: infoId } = useParams(); // URL에서 infoId를 가져옴
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarkImage, setBookmarkImage] = useState(bookmarkIcon);
  const [isClicked, setIsClicked] = useState(false);
  const [bookmarks, setBookmarks] = useRecoilState(bookmarksAtom);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://43.201.176.194.nip.io/api/info/getOneInfo/${infoId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 404) {
          console.error("해당 글을 찾을 수 없습니다.");
          setLoading(false);
          return;
        }

        const result = await response.json();

        console.log("Response status:", response.status);
        console.log("Response result:", result);

        if (response.status === 200) {
          setPost(result.data);
          console.log("데이터 가져오기 성공:", result.data);
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
  }, [infoId]);

  useEffect(() => {
    if (post && bookmarks.some((bookmark) => bookmark.infoId === post.infoId)) {
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
      const response = await fetch(
        `https://43.201.176.194.nip.io/api/info/scrapInfo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ infoId: post.infoId }),
        }
      );

      const result = await response.json();

      console.log("Response status:", response.status);
      console.log("Response data:", result);

      if (response.status === 200) {
        if (result.data) {
          setBookmarks([...bookmarks, post]);
          setBookmarkImage(bookmarkHoverIcon);
          setIsClicked(true);
          console.log("스크랩 되었습니다.");
        } else {
          setBookmarks(
            bookmarks.filter((bookmark) => bookmark.infoId !== post.infoId)
          );
          setBookmarkImage(bookmarkIcon);
          setIsClicked(false);
          console.log("스크랩 해제 되었습니다. 데이터:", result.data);
        }
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
    <div>
      <InformationHeader />
      <div className="post-container">
        <div className="post-header">
          <button
            className="bookmark"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          >
            <img src={bookmarkImage} alt="bookmark" />
            <div>스크랩</div>
          </button>
          <div className="post-issue-date">
            <div className="post-issue">제 {post.infoNum}호</div>
            <div className="post-date">{formatDate(post.createdAt)}</div>
          </div>
        </div>
        <div className="post-title">
          <h1>{post.title}</h1>
        </div>
        <main className="main-content">
          {post.images && post.images.length > 0 ? (
            <Slider {...settings} className="slider">
              {post.images.map((image, index) => (
                <div className="slide" key={index}>
                  <img
                    src={image}
                    alt={`슬라이드 ${index + 1}`}
                    className="image-placeholder"
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <div className="slide">
              <img
                src={post.thumbnailUrl}
                alt="슬라이드"
                className="image-placeholder"
              />
            </div>
          )}
          <div className="post-content">{post.content}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Post;
