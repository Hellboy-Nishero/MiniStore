import React, { useEffect, useContext, useState } from 'react'
import { BlogContext } from '../../pages/BlogPage';
import Reply from './Reply';

const Comments = () => {
        const {blog, setBlog} = useContext(BlogContext);
        const [replyText, setReplyText] = useState({
            text: "",
            error: null
        });
        const [username, setUsername] = useState({
            text: "",
            error: null
        });
        const [replyBoxVisible, setReplyBoxVisible] = useState(null);
        
        let totalComments = 0;

        const countAllComments = (comments) => {
            return comments.reduce((acc, comment) => {
                acc += 1;
                if (comment.replies && comment.replies.length > 0) {
                    acc += countAllComments(comment.replies);
                }
                return acc;
            }, 0);
        };



        const validateInput = () => {
            let isValid = true;
            if(replyText.text.trim() !== ""){
                setReplyText(prevReply => ({...prevReply, error: false}));
            } if(username.text.trim() !== ""){
                setUsername(prevUsername => ({...prevUsername, error: false}));
            }
            if(replyText.text.trim() === ""){
                isValid = false;
                setReplyText(prevReply => ({...prevReply, error: true}));
            }
            if(username.text.trim() === ""){
                isValid = false;
                setUsername(prevUsername => ({...prevUsername, error: true}));
            }
            return isValid;
        }



    const [count, setCount] = useState(totalComments);

    const formatDate = (dateString) => {
        const months = [
            "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
            "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
          ];

          const [year, month, day] = dateString.split("-");

          return (`${months[parseInt(month) - 1]} ${parseInt(day)}, ${parseInt(year)}`)
    }

    const addReply = (commentId, replyText, username) => {
        let commentsWithNewReply = [...blog.comments];
        insertComment(commentsWithNewReply, commentId, replyText, username);
        setBlog(prevBlog => ({...prevBlog, comments: commentsWithNewReply}));
    }

    const newComment = (text, username) => {
        const rawDate = new Date().toLocaleString().split(", ")[0].replace(/\./g, '-');
        const [day, month, year] = rawDate.split('-');
        const formattedDate = `${year}-${month}-${day}`;
        return {
            id: new Date().getTime(),
            text: text,
            date: formattedDate,
            user: username,
            replies: []
        }
    }

    const insertComment = (comments, parentId, text, username) => {
        for(let i = 0; i < comments.length; i++){
            let comment = comments[i];
            if (comment.id === parentId){
                comment.replies.push(newComment(text, username));
            }
        }

        for (let i = 0; i < comments.length; i++){
            let comment = comments[i];
            insertComment(comment.replies, parentId, text, username)
        }
    }

    useEffect(() => {
        if(blog.comments){
            setCount(countAllComments(blog.comments))
        }
    }, [blog])


  return (

    <section className="comments-section">
    <h3 className="comments__count">{count} Comments</h3>
    <div className="comments">
        {blog.comments.length !== 0 ? (
            blog.comments.map((comment) => (
                <section className="comment-section" key={comment.id}>
                    <div className="comment">
                        <img className="user__image" src="" alt=""></img>
                        <div className="comment__right">
                            <div className="comment__header">
                                <h6 className="username">{comment.user}</h6>
                                <span className="date">{formatDate(comment.date)}</span>
                            </div>
                            <p className="comment__text">{comment.text}</p>
                            <button
                                className="reply__btn"
                                onClick={() =>
                                    setReplyBoxVisible(
                                        replyBoxVisible === comment.id
                                            ? null
                                            : comment.id
                                    )
                                }
                            >
                                reply now
                            </button>
                            {replyBoxVisible === comment.id && (
                                <>
                                    <input
                                        className={`username__input ${username.error ? "error" : ""}`}
                                        onChange={(e) => setUsername(prevUsername => ({...prevUsername, text: e.target.value}))}
                                        placeholder="Your name..."
                                    ></input>
                                    <textarea
                                        className={`comment__input ${replyText.error ? "error" : ""}`}
                                        onChange={(e) => setReplyText(prevReply => ({...prevReply, text: e.target.value}))}
                                    ></textarea>
                                    <div className="buttons">
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => {
                                                if(validateInput()){
                                                    addReply(comment.id, replyText.text, username.text);
                                                    setReplyBoxVisible(null);
                                                    setReplyText(prevReply => ({...prevReply, text: "", error: false}));
                                                    setUsername(prevUsername => ({...prevUsername, text: "", error: false}));
                                                }
                                            }}
                                        >
                                            send
                                        </button>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => {
                                                setReplyBoxVisible(null);
                                                setReplyText(prevReply => ({...prevReply, text: "", error: false}));
                                                setUsername(prevUsername => ({...prevUsername, text: "", error: false}));
                                            }}
                                        >
                                            cancel
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    {comment.replies.length !== 0 &&
                        comment.replies.map((reply) => (
                            <Reply
                                key={reply.id}
                                user={reply.user}
                                date={reply.date}
                                text={reply.text}
                                formatDate={formatDate}
                                comment={reply}
                                addReply={addReply}
                            />
                        ))}
                </section>
            ))
        ) : (
            <p className='no-comments'>No comments</p>
        )}
    </div>
</section>
  )
}

export default Comments