import React, { useState } from 'react';
import '../style/Comment.css';

export default function Comment() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [newReply, setNewReply] = useState('');
  const [visibleCount, setVisibleCount] = useState(4);

  const formatDate = (date) => {
    return date.toISOString(); // ISO 형식으로 저장
  };

  const formatDisplayDate = (dateString) => {
    const [date] = dateString.split('T'); // 'T'를 기준으로 문자열을 나눠서 날짜 부분만 사용
    return date.replace(/-/g, '.'); // '-'를 '.'로 대체하여 표시
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const date = formatDate(new Date());
      setComments([...comments, { id: Date.now(), nickname: '닉네임', content: newComment, date, replies: [] }]);
      setNewComment('');
    }
  };

  const handleAddReply = (commentId) => {
    if (newReply.trim()) {
      const updatedComments = comments.map(comment => {
        if (comment.id === commentId) {
          const date = formatDate(new Date());
          return {
            ...comment,
            replies: [...comment.replies, { id: Date.now(), nickname: '닉네임', content: newReply, date }]
          };
        }
        return comment;
      });
      setComments(updatedComments);
      setReplyingTo(null);
      setNewReply('');
    }
  };

  const handleShowMore = () => {
    setVisibleCount(visibleCount + 4);
  };

  return (
    <div className='comment-section'>
      <h3>댓글</h3>
      <div className='comment-input'>
        <textarea
          placeholder='댓글을 입력하세요'
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>댓글 추가</button>
      </div>
      <div className='comments'>
        {comments.slice(0, visibleCount).map(comment => (
          <div key={comment.id} className='comment'>
            <p><strong>{comment.nickname}:</strong> {comment.content}</p>
            <p className='comment-date'>{formatDisplayDate(comment.date)}</p>
            <button onClick={() => setReplyingTo(comment.id)}>답글 달기</button>
            {comment.replies.length > 0 && (
              <div className='replies'>
                {comment.replies.map(reply => (
                  <div key={reply.id} className='reply'>
                    <p><strong>{reply.nickname}:</strong> {reply.content}</p>
                    <p className='reply-date'>{formatDisplayDate(reply.date)}</p>
                  </div>
                ))}
              </div>
            )}
            {replyingTo === comment.id && (
              <div className='reply-input'>
                <textarea
                  placeholder='답글을 입력하세요'
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                />
                <button className="add-comment"onClick={() => handleAddReply(comment.id)}>답글 추가</button>
              </div>
            )}
          </div>
        ))}
      </div>
      {visibleCount < comments.length && (
        <button className='show-more' onClick={handleShowMore}>더보기</button>
      )}
    </div>
  );
}
