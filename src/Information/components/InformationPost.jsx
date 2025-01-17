import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import "../css/informationpost.css";
import uploadImage from "../image/upload.jpg"; // 이미지 경로를 맞춰주세요
import Footer from "../../Footer/components/Footer";
import InformationHeader from "../../Header/components/InformationHeader";

const InformationPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + images.length <= 5) {
      setImages([...images, ...files]);
    } else {
      alert("최대 5개의 이미지만 선택할 수 있습니다.");
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // 폼 제출 기본 동작 방지
    setIsModalOpen(true); // 모달 창 열기
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigateHome = () => {
    navigate("/MainLogin");
  };

  const navigateMypage = () => {
    navigate("/mypage");
  };

  return (
    <div>
      <InformationHeader />
      <div className="information-post-container">
        <div className="information-post">
          <form onSubmit={handleSubmit}>
            <div className="information-post-form-group">
              <label className="information-title-label">제목</label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                className="information-title-input"
                placeholder="제목을 입력해주세요."
              />
            </div>
            <div className="information-post-form-group">
              <label className="information-image-label">사진</label>
              <div className="images">
                <div
                  className="image-upload-container"
                  onClick={handleImageClick}
                >
                  <img
                    src={uploadImage}
                    alt="Upload"
                    className="image-upload-icon"
                  />
                  <div className="image-count">{images.length}/5</div>
                </div>
                <div className="image-preview-grid">
                  {images.map((image, index) => (
                    <div key={index} className="image-preview-container">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`preview-${index}`}
                        className="image-preview"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                ref={fileInputRef}
                className="image-input-hidden"
                accept="image/*"
              />
            </div>
            <div className="information-post-form-group">
              <label className="information-content-label">내용</label>
              <textarea
                value={content}
                onChange={handleContentChange}
                className="information-content-input"
                placeholder="내용을 입력해주세요."
              />
            </div>
            <div className="information-submit-button-container">
              <button type="submit" className="information-submit-button">
                투고하기
              </button>
            </div>
          </form>
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            onNavigateHome={navigateHome}
            onNavigateInfo={navigateMypage}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InformationPost;
