import React, { useState } from 'react'

const Reply = ({user, date, text, formatDate, comment, addReply}) => {
    const [showReplyBox, setShowReplyBox] = useState(false);
        const [replyText, setReplyText] = useState({
            text: "",
            error: null
        });
        const [username, setUsername] = useState({
            text: "",
            error: null
        });


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


  return (
    <section className="reply-section">
            <div className="reply">
                <img className='user__image' src='' alt=''></img>
                <div className="comment__right">
                    <div className="comment__header">
                        <h6 className='username'>{user}</h6>
                        <span className='date'>{formatDate(date)}</span>
                    </div>
                    <p className='comment__text'>{text}</p>
                    <button className='reply__btn' onClick={() => {
                        setShowReplyBox(true);
                    }}>reply now</button>
                    {
                        showReplyBox && <>
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
                                <button className='btn btn-secondary' onClick={() => {
                                    if(validateInput()){
                                        addReply(comment.id, replyText.text, username.text);
                                        setShowReplyBox(null);
                                        setReplyText(prevReply => ({...prevReply, text: "", error: false}));
                                        setUsername(prevUsername => ({...prevUsername, text: "", error: false}));
                                    }
                                }}>send</button>
                                <button className='btn btn-primary' onClick={() => {
                                    setShowReplyBox(null);
                                    setReplyText(prevReply => ({...prevReply, text: "", error: false}));
                                    setUsername(prevUsername => ({...prevUsername, text: "", error: false}));
                                }}>cancel</button>
                            </div>
                        </>
                    }
                </div>
            </div>
            {
                comment.replies.length > 0 && comment.replies.map(reply => 
                    <Reply key={reply.id} 
                    comment={reply}
                    addReply={addReply}
                    user={reply.user}
                    date={reply.date}
                    text={reply.text}
                    formatDate={formatDate}
                    />
                )
            }
    </section>
  )
}

export default Reply