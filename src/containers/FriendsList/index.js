import React from 'react';
import data from '../../utils/data.json'
import List from '../../components/List/index.js';
import Pagination from '../../components/Pagination/index.js';
import DeleteFriend from '../../components/DeleteFriend/index.js';
class FriendsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [...data],
            activePage: 1,
            filterData: [...data.slice(0, 4)],
            lastPage: data.length % 4 === 0 ? data.length / 4 : parseInt((data.length / 4)) + 1,
            value: '',
            count: data.length,
            friendsData: [...data],
            isDeleteModal: false,
            deletingId: null
        };
    }

    handlePaginate = activePage => {
        const filterData = [...this.state.data.slice((activePage - 1) * 4, activePage * 4)];
        this.setState({ filterData, activePage: activePage });
    }

    handleChange = e => {
        const { friendsData } = this.state;
        const searchingData = [...friendsData.filter(data => data.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)]
        const filterData = [...searchingData.slice(0, 4)];
        let lastPage = searchingData.length % 4 === 0 ? searchingData.length / 4 : parseInt((searchingData.length / 4)) + 1
        lastPage = lastPage ? lastPage : 1
        this.setState({ data: searchingData, filterData, lastPage, value: e.target.value, activePage: 1 });
    }

    handleKeypress = e => {
        if (e.key === 'Enter') {
            const { friendsData } = this.state;
            const updateData = [...[{ name: this.state.value, id: this.state.count + 1, isFavorite: false }], ...friendsData];
            const filterData = [...updateData.slice(0, 4)];
            const lastPage = updateData.length % 4 === 0 ? updateData.length / 4 : parseInt((updateData.length / 4)) + 1;
            this.setState({
                data: updateData, filterData, count: this.state.count + 1, lastPage,
                activePage: 1, value: '', friendsData: updateData
            });
        }
    }

    handleFavorite = id => {
        const { friendsData, data, filterData } = this.state;
        const updateFriendsData = [...this.favorites(friendsData, id)];
        const updateData = [...this.favorites(data, id)];
        const updatedFilterData = [...this.favorites(filterData, id)];
        this.setState({ data: updateData, friendsData: updateFriendsData, filterData: updatedFilterData });
    }

    favorites = (friendsData, id) => {
        friendsData.some(data => {
            if (data.id === id) {
                data.isFavorite = !data.isFavorite;
                return true;
            }
        });
        return friendsData
    }

    toggleDelete = () => {
        this.setState({ isDeleteModal: !this.state.isDeleteModal });
    }

    handleDelete = () => {
        const { friendsData, deletingId, data, activePage, filterData, lastPage } = this.state;
        const updatedFriendsData = [...friendsData.filter(friend => friend.id !== deletingId)]
        const updatedData = [...data.filter(friend => friend.id !== deletingId)];
        if (activePage === lastPage) {
            const upadtedFilterData = [...filterData.filter(friend => friend.id !== deletingId)];
            if (upadtedFilterData.length === 0) {
                this.handlePaginate(activePage - 1);
                this.setState({
                    activePage: activePage - 1 ? activePage - 1 : 1,
                    lastPage: lastPage - 1 ? activePage - 1 : 1
                });
            } else {
                this.setState({ filterData: upadtedFilterData });
            }
        } else {
            const upadtedFilterData = [...updatedData.slice((activePage - 1) * 4, activePage * 4)];
            const lastPage = updatedData.length % 4 === 0 ? updatedData.length / 4 : parseInt((updatedData.length / 4)) + 1;
            this.setState({ filterData: upadtedFilterData, lastPage });
        }
        this.setState({ friendsData: updatedFriendsData, data: updatedData });
        this.toggleDelete();

    }

    handleSort = event => {
        const { friendsData } = this.state;
        if (event.target.value === 'favorites') {
            const updatedData = friendsData.sort(function (a, b) {
                return (a.isFavorite === b.isFavorite) ? 0 : a.isFavorite ? -1 : 1;
            });
            const filterData = [...updatedData.slice(0, 4)];
            this.setState({ data: updatedData, filterData, value: '', activePage: 1 });
        } else {
            const filterData = [...friendsData.slice(0, 4)];
            this.setState({ data: [...this.state.friendsData], filterData, value: '', activePage: 1 });
        }
    }

    render() {
        const { filterData, activePage, lastPage, value, isDeleteModal } = this.state;
        return (
            <div>
                <div className="sorting-container">
                    <span>Sort:</span>
                    <select onChange={this.handleSort}>
                        <option value="all">All</option>
                        <option value="favorites">Favorites</option>
                    </select>
                </div>
                <div className="app-container">
                    <div className="friend-list-header">
                        <h3>Friends List</h3>
                    </div>
                    <div>
                        <input
                            className="search-input"
                            placeholder="Enter your friends name"
                            onChange={this.handleChange}
                            onKeyPress={this.handleKeypress}
                            value={value}
                        />
                    </div>
                    <div>
                        <div>
                            {
                                filterData.map(friend => (
                                    <>
                                        <List
                                            friend={friend}
                                            handleFavorite={this.handleFavorite}
                                            handleDelete={id => {
                                                this.setState({ deletingId: id });
                                                this.toggleDelete();
                                            }}
                                        />
                                    </>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <Pagination
                        activePage={activePage}
                        lastPage={lastPage}
                        handlePaginate={activePage => { this.handlePaginate(activePage) }}
                    />
                </div>
                <DeleteFriend
                    handleClose={this.toggleDelete}
                    handleDelete={this.handleDelete}
                    show={isDeleteModal}
                />
            </div>
        );
    }
}

export default FriendsList;
