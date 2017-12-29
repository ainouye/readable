import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { populateCategory, populatePost } from '../actions'
import CategoryList from './CategoryList'
import { capitalize } from '../utils/helpers'
import * as ReadableAPI from '../utils/api'

import CommentForm from './CommentForm'
import PostForm from './PostForm'
import Header from './Header'
import PostDetail from './PostDetail'

class App extends Component {

    componentWillMount() {
        ReadableAPI.getCategories().then((categories) => {
            categories.forEach(function(category) {
                this.props.addAllCategories({ name: category.name, slug: category.slug })
            }, this)
        }).catch(e => {})

         ReadableAPI.getPosts().then((posts) => {
            posts.forEach(function(post) {
                this.props.addAllPosts({ ...post })
            }, this)
        }).catch(e => { })
    }

    render() {
        const { categories, posts } = this.props
        return (
            <div className="page">
                <Header />
                <Route path="/" exact render={() => (
                    <div>
                        { categories && posts && (
                            categories.map((category) => (
                                <CategoryList key={ category.name } name={ capitalize(category.name) } posts={ posts.filter((post) => post.category === category.name) }/>
                            ))
                        )}
                    </div>
                )} />
                <Route exact path="/edit/" component={PostForm} />
                <Route path="/edit/:postId" component={PostForm} />
                <Route path="/post/:postId" component={PostDetail} />
                <Route exact path="/edit_comment/:parentId/" component={CommentForm} />
                <Route path="/edit_comment/:parentId/:commentId" component={CommentForm} />
            </div>
        );
    }
}
function mapStateToProps ({ categories, posts }) {
    let mappedPosts = Object.keys(posts).reduce((allPosts, totalPosts) => {
        allPosts.push({
            ...posts[totalPosts],
            id: totalPosts
        })
        return allPosts
    }, [])
    return { posts: mappedPosts, categories }
}

function mapDispatchToProps (dispatch) {
  return {
    addAllCategories: (data) => dispatch(populateCategory(data)),
    addAllPosts: (data) => dispatch(populatePost(data)),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
