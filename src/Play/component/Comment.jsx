import React, { useState } from 'react';
import '../style/Comment.css';

export default function Comment() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [newReply, setNewReply] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      const date = new Date().toLocaleString();
      setComments([...comments, { id: Date.now(), nickname: '닉네임', content: newComment, date, replies: [] }]);
      setNewComment('');
    }
  };

  const handleAddReply = (commentId) => {
    if (newReply.trim()) {
      const updatedComments = comments.map(comment => {
        if (comment.id === commentId) {
          const date = new Date().toLocaleString();
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
        {comments.map(comment => (
          <div key={comment.id} className='comment'>
            <p><strong>{comment.nickname}:</strong> {comment.content}</p>
            <p className='comment-date'>{comment.date}</p>
            <button onClick={() => setReplyingTo(comment.id)}>답글 달기</button>
            {comment.replies.length > 0 && (
              <div className='replies'>
                {comment.replies.map(reply => (
                  <div key={reply.id} className='reply'>
                    <p><strong>{reply.nickname}:</strong> {reply.content}</p>
                    <p className='reply-date'>{reply.date}</p>
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
                <button onClick={() => handleAddReply(comment.id)}>답글 추가</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
