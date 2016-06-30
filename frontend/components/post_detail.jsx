const React = require('react');
const ImageDetail = require('./image_detail')

const PostDetail = React.createClass({
  render(){
    const post = this.props.post
    return(
      <div className="post-detail-container">
        <h1>{post.title}</h1>
        {post.images.map((image) => {
          return <ImageDetail key ={ image.id } image={ image } />
        })}
      </div>
    )
  }
})

module.exports = PostDetail;
