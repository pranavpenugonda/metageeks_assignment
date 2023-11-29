import React, { Component } from "react";
import Loader from "react-loader-spinner";
import "./app.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class App extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    postsList: [],
    showPosts: {},
  };

  componentDidMount() {
    this.getPosts();
  }

  getPosts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    });

    const url = "https://jsonplaceholder.typicode.com/posts";
    try {
      const response = await fetch(url);

      if (response.ok) {
        const fetchedData = await response.json();
        this.setState({
          postsList: fetchedData,
          apiStatus: apiStatusConstants.success,
        });
      } else {
        this.setState({
          apiStatus: apiStatusConstants.failure,
        });
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      this.setState({
        apiStatus: apiStatusConstants.failure,
      });
    }
  };

  onToggleDesc = (postId) => {
    this.setState((prevState) => ({
      showPosts: {
        ...prevState.showPosts,
        [postId]: !prevState.showPosts[postId],
      },
    }));
  };

  renderSuccessView = () => {
    const { postsList, showPosts } = this.state;

    return (
      <div className="success-bg-cont">
        <ul className="ul-list">
          {postsList.map((eachPost) => (
            <li className="list-item" key={eachPost.id}>
              <h1>Id: {eachPost.id}</h1>
              <h1>Title: {eachPost.title}</h1>
              {showPosts[eachPost.id] ? <p>{eachPost.body}</p> : null}
              <button
                type="button"
                onClick={() => this.onToggleDesc(eachPost.id)}
                className="show-btn"
              >
                {showPosts[eachPost.id] ? "Hide" : "Show"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  renderLoadingView = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  );

  renderFailureView = () => (
    <div>
      <h1>Oops! Failed....</h1>
    </div>
  );

  renderAllPosts = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="bg-container">
        <h1 className="heading">Posts</h1>
        <div>{this.renderAllPosts()}</div>
      </div>
    );
  }
}

export default App;
