import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { populateCategory } from '../actions'
import CategoryList from './CategoryList'
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

    }

    render() {
        const { categories } = this.props
        return (
            <div className="page">
                <Header />
                <Switch>
                    <Route path="/" exact render={() => (
                        <div>
                            { categories  && (
                                categories.map((category) => (
                                    <CategoryList key={ category.name } category={ category.name } />
                                ))
                            )}
                        </div>
                    )} />
                    <Route exact path="/edit" component={PostForm} />
                    <Route exact path="/edit/:postId" component={PostForm} />
                    <Route exact path="/edit_comment/:parentId/" component={CommentForm} />
                    <Route exact path="/edit_comment/:parentId/:commentId" component={CommentForm} />
                    <Route exact path="/:category/" component={CategoryList} />
                    <Route exact path="/:category/:postId" component={PostDetail} />
                </Switch>
            </div>
        );
    }
}
function mapStateToProps ({ categories }) {
    return { categories }
}

function mapDispatchToProps (dispatch) {
  return {
    addAllCategories: (data) => dispatch(populateCategory(data))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
