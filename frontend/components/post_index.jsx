const PostIndexStore = require('../stores/post_index_store');
const PostActions = require('../actions/post_actions');
const PostIndexItem = require('./post_index_item');
const SentenceSorting = require('./sentence_sorting');
const SearchStore = require('../stores/search_store');
const SearchActions = require('../actions/search_actions');

const INITIAL_REQUEST_SIZE = 40;
const ADDITIONAL_REQUEST_SIZE = 20;
const TAG_LIMIT = 11;

const PostIndex = React.createClass({
  getInitialState() {
    return { posts: PostIndexStore.all(),
             context: this.props.context,
             activePostIndex: this.props.activePostIndex,
             fetching: false,
             filterOption: "Most Viral",
             sortOption: "Popularity" }
  },

  _onPostChange() {
    this.setState( { posts: PostIndexStore.all(), fetching: false } );
  },

  _onSearchChange() {
    this.setState( { tags: SearchStore.filterOptions() });
  },

  componentDidMount() {
    if (this.state.context === "splash") {
      window.addEventListener('scroll', this._onScroll);
    }
    this.postsListener = PostIndexStore.addListener(this._onPostChange);
    this._fetchPosts(INITIAL_REQUEST_SIZE, 0);

    this.tagsListener = SearchStore.addListener(this._onSearchChange)
    SearchActions.fetchTags(TAG_LIMIT);
  },

  componentWillUnmount() {
    window.removeEventListener('scroll', this._onScroll);
    this.postsListener.remove();
    this.tagsListener.remove();
  },

  componentWillReceiveProps(newProps) {
    if (this.state.context !== "post" && newProps.context === "post") {
      window.removeEventListener('scroll', this._onScroll);
    }
    if (this.state.context !== "splash" && newProps.context === "splash") {
      window.addEventListener('scroll', this._onScroll);
    }
    this.setState( { context: newProps.context, activePostIndex: newProps.activePostIndex } );
  },

  _fetchPosts(limit, offset) {
    const options = { filterOption: this.state.filterOption,
                      sortOption: this.state.sortOption }
    PostActions.fetchPosts(limit, offset, options);
  },

  _fetchMorePosts(offset) {
    this._fetchPosts(ADDITIONAL_REQUEST_SIZE, offset);
  },

  _onScroll() {
    const scrollDiff = $('#post-index').height() - (window.scrollY + window.innerHeight);

    if (PostIndexStore.hasMorePosts() && !this.state.fetching && scrollDiff < 300) {
      this.setState({fetching: true});
      const offset = Object.keys(this.state.posts).length;
      this._fetchMorePosts(offset);
    }
  },

  _onSideScroll() {
    const scrollTop = $(".post-show-right-scroll-container").scrollTop();
    const scrollDiff = $(".post-show-post-index-container").height() - scrollTop;

    if (PostIndexStore.hasMorePosts() && !this.state.fetching && scrollDiff < 700) {
      this.setState({fetching: true});
      const offset = Object.keys(this.state.posts).length;
      this._fetchMorePosts(offset);
    }
  },

  updateFilter(filterOption) {
    this.setState( { filterOption: filterOption }, this._fetchPosts.bind(this, INITIAL_REQUEST_SIZE, 0) );
  },

  updateSort(sortOption) {
    this.setState( { sortOption: sortOption }, this._fetchPosts.bind(this, INITIAL_REQUEST_SIZE, 0) );
  },

  render() {
    const posts = this.state.posts;
    const keys = Object.keys(posts);
    const activeKey = keys[PostIndexStore.activePostIndex()];

    if (this.state.context === "post") {
      return(
        <div className="post-show-right">
          <div className="post-show-post-index-header">
            <h2>Most Viral Images</h2>
            <h3>sorted by popularity</h3>
          </div>
          <div id="post-index" className="post-show-right-scroll-container" onScroll={ this._onSideScroll }>
            <div className="post-show-post-index-container">
              {keys.map((key) => {
                return <PostIndexItem key={ key } post={ posts[key] } active={ key === activeKey ? true : false }/>;
              })}
            </div>
          </div>
        </div>
      )
    } else {
      return(
        <div className="post-index-content">
          <SentenceSorting filterOption={ this.state.filterOption } sortOption={ this.state.sortOption }
                           updateFilter={ this.updateFilter } updateSort={ this.updateSort }
                           filterOptions={ this.state.tags } sortOptions={ SearchStore.sortOptions() } />
          <div id="post-index" className={"post-index-container"}>
            {keys.map((key) => {
              return <PostIndexItem key={ key } post={ posts[key] }/>;
            })}
          </div>
        </div>
      );
    }
  }
});

module.exports = PostIndex;
