// import 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import config from '../../config';
import { formatTimeToString } from '../../utils/helpers';
import './index.scss';

window.firebase.initializeApp({
  apiKey: config.APIKEY,
  authDomain: config.AUTHDOMAIN,
  projectId: config.PROJECTID,
  storageBucket: config.STORAGEBUCKET,
  messagingSenderId: config.MESSAGINGSENDERID,
  appId: config.APPID,
});

const firestore = window.firebase.firestore();

const Sidebar = ({ movie, handleClick }) => {
  const [comments, setComments] = useState([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const [commentValue, setCommentValue] = useState('');

  useEffect(() => {
    getComments();
  }, [movie]);

  const getComments = () => {
    const commentsData = firestore.collection('comments');
    commentsData
      .where('movieName', '==', movie.title)
      .orderBy('timestamp', 'desc')
      .get()
      .then(querySnapshot => {
        const result = [];

        querySnapshot.forEach(doc => result.push(doc.data()));

        setComments([...result].sort((a, b) => a.timestamp - b.timestamp));
        setIsCommentsLoading(false);
      })
      .catch(error => {
        setIsCommentsLoading(false);
        console.error('Error getting document:', error);
      });
  };

  const makeComment = () => {
    firestore
      .collection('comments')
      .add({
        content: commentValue,
        movieName: movie.title,
        timestamp: window.firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {})
      .catch(error => {
        console.error('Error adding document: ', error);
      });
  };

  const handleChange = e => {
    e.preventDefault();
    setCommentValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    makeComment();
    getComments();
    let comm = '';
    setCommentValue(comm);
  };

  return (
    <section className="sidebar">
      {Object.keys(movie).length > 0 && (
        <>
          <button
            className="close-btn"
            onClick={() => handleClick(movie)}
            type="button"
          >
            <i className="fas fa-times fa-lg" />
          </button>
          <h2 className="movie-title">{movie.title}</h2>
          <div className="data-section">
            <div className="descriptions">
              <div className="meta-div">
                <p className="year">{movie.year}</p>
                <div className="rating">
                  <div className="rating-value">
                    <p
                      style={{
                        color:
                          movie.rating < 5
                            ? '#ff0000'
                            : movie.rating < 7.5
                            ? '#ffb200'
                            : 'rgb(118 224 23)',
                      }}
                    >
                      {' '}
                      {movie.rating || 0}
                    </p>
                  </div>
                  <p>/10</p>
                </div>
                <p className="year"> {formatTimeToString(movie.runtime)}</p>
              </div>
              <p className="movie-description">{movie.description}</p>
            </div>
            <div className="lists">
              <p className="actors">
                Cast:{' '}
                {movie.actors.length > 0 &&
                  movie.actors.map((actor, count) => (
                    <span key={count} className="actors-list">
                      {actor}
                      {count !== movie.actors.length - 1 ? `,` : ''}&nbsp;
                    </span>
                  ))}
              </p>

              <p className="genres">
                Genres:{' '}
                {movie.genre.length > 0 &&
                  movie.genre.map((genre, count) => (
                    <span key={count} className="genre-list">
                      {genre}
                      {count !== movie.genre.length - 1 ? `,` : ''}&nbsp;
                    </span>
                  ))}
              </p>
            </div>
          </div>

          <div className="chat-section">
            {isCommentsLoading && (
              <div className="loader">
                <i className="fas fa-spinner fa-pulse fa-3x" />
              </div>
            )}
            <div className="comments">
              {comments.map((comment, index) => (
                <p key={index} className="comment">
                  {comment.content}
                </p>
              ))}
            </div>
            <div className="comment-form">
              <input
                className="form-control"
                onChange={e => handleChange(e)}
                value={commentValue}
              />
              <button
                className="send-btn"
                type="button"
                value={commentValue}
                onClick={e => handleSubmit(e)}
              >
                <i className="fas fa-paper-plane" />
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Sidebar;
