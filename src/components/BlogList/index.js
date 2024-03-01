import {Component} from 'react'
import Loader from 'react-loader-spinner'
import BlogItem from '../BlogItem'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class BlogList extends Component {
  state = {
    blogsData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getBlogsList()
  }

  getBlogsList = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const updatedData = data.map(eachBlog => ({
      author: eachBlog.author,
      avatarUrl: eachBlog.avatar_url,
      id: eachBlog.id,
      imageUrl: eachBlog.image_url,
      title: eachBlog.title,
      topic: eachBlog.topic,
    }))

    this.setState({blogsData: updatedData, isLoading: false})
  }

  render() {
    const {blogsData, isLoading} = this.state

    return (
      <div className="blog-list">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          blogsData.map(eachBlog => (
            <BlogItem key={eachBlog.id} blogDetails={eachBlog} />
          ))
        )}
      </div>
    )
  }
}

export default BlogList
