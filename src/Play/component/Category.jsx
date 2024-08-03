import React from 'react';
import '../style/Category.css';

const categories = [
  { ko: "자기계발", en: "IMPROVEMENT" },
  { ko: "외국어", en: "LANGUAGE" },
  { ko: "SNS", en: "SNS" },
  { ko: "독서", en: "BOOK" },
  { ko: "문화∙예술", en: "CULTURE" },
  { ko: "요리", en: "COOKING" },
  { ko: "여행", en: "TRIP" },
  { ko: "운동", en: "EXERCISE" },
  { ko: "나들이", en: "PICNIC" },
  { ko: "맛집탐방", en: "RESTAURANT" },
  { ko: "오락", en: "ENTERTAINMENT" },
  { ko: "기타", en: "ETC" }
];

const Category = ({ selectedCategory, setSelectedCategory }) => {
  const handleCategoryToggle = (koCategory) => {
    const enCategory = getEnglishCategory(koCategory);
    setSelectedCategory((prevSelectedCategory) =>
      prevSelectedCategory === enCategory ? null : enCategory
    );
  };

  const getEnglishCategory = (koCategory) => {
    const foundCategory = categories.find(cat => cat.ko === koCategory);
    return foundCategory ? foundCategory.en : null;
  };

  return (
    <div>
      <div className='header'>
        <span>카테고리</span>
        <p className='category-count'>{selectedCategory ? 1 : 0}/1</p>
      </div>
      <div className='category-wrap'>
        {categories.map(({ ko, en }) => (
          <button
            className={`select-category ${selectedCategory === en ? 'selected' : ''}`}
            key={en}
            onClick={() => handleCategoryToggle(ko)}
          >
            {ko}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;
