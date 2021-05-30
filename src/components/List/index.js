import React from 'react';
import favorite from '../../assets/favorite.svg';
import unFavorite from '../../assets/unfavorite.svg';
import deleteIcon from '../../assets/delete.svg';

const List = ({ friend, handleFavorite, handleDelete }) => {

    return (
        <div className="list-container">
            <div>
                <h5>{friend.name}</h5>
                <span className="friend-tag">is your friend</span>
            </div>
            <div className="display-flex">
                {
                    friend.isFavorite ?
                        <div className="list-images" onClick={e => { e.preventDefault(); handleFavorite(friend.id) }}>
                            <img src={unFavorite} alt="un-favorite" />
                        </div>
                        :
                        <div className="list-images" onClick={e => { e.preventDefault(); handleFavorite(friend.id) }}>
                            <img src={favorite} alt="favorite" />
                        </div>
                }
                <div className="list-images delete" onClick={e => { e.preventDefault(); handleDelete(friend.id) }}>
                    <img src={deleteIcon} alt="delete" />
                </div>
            </div>
        </div>
    );
};

export default List;
