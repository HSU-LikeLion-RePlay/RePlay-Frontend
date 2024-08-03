import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";
import "../css/informationpost.css";
import uploadImage from "../image/upload.jpg"; // 이미지 경로를 맞춰주세요

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append(
      "infoSubmitRequest",
      new Blob([JSON.stringify({ title, content })], {
        type: "application/json",
      })
    );

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await axios.post(
        "https://43.201.176.194:8080/api/info/submitInfo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (response.status === 200) {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
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
    <div className="informationpostcontainer">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="title-label">제목</label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="title-input"
              placeholder="제목을 입력해주세요."
            />
          </div>
          <div className="form-group">
            <label className="image-label">사진</label>
            <div
              className="images"
              style={{ display: "flex", alignItems: "center" }}
            >
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
          <div className="form-group">
            <label className="content-label">내용</label>
            <textarea
              value={content}
              onChange={handleContentChange}
              className="content-input"
              placeholder="내용을 입력해주세요."
            />
          </div>
          <button type="submit" className="submit-button">
            투고하기
          </button>
        </form>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onNavigateHome={navigateHome}
          onNavigateInfo={navigateMypage}
        />
      </div>
    </div>
  );
};

export default InformationPost;
