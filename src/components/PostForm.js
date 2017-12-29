import { addPost, editPost } from '../actions'
import { connect } from 'react-redux'
import React, { Component } from 'react';
import { Button, Col, FormControl, Grid, Row } from 'react-bootstrap'
import { capitalize, generateUUID } from '../utils/helpers'

class PostForm extends Component {
    state = {
        'formAuthor': (this.props.post && this.props.post.author) || '',
        'formTitle': (this.props.post && this.props.post.title) || '',
        'formBody': (this.props.post && this.props.post.body) || '',
        'formCategory': (this.props.post && this.props.post.category) || 'react'
    }

    submitForm = (e) => {
        e.preventDefault()
        let postId = this.props.match.params.postId
        if (this.props.post) {
            this.props.editExistingPost({
                id: this.props.match.params.postId,
                title: this.state.formTitle,
                body: this.state.formBody
            })
        } else {
            postId = generateUUID()
            this.props.addNewPost({
                id: postId,
                author: this.state.formAuthor,
                title: this.state.formTitle,
                body: this.state.formBody,
                category: this.state.formCategory,
                timestamp: Date.now(),
                voteScore: 1
            })
        }
        this.props.history.push('/post/' + postId)
    }

    handleAuthorChange = (e) => {
       this.setState({ formAuthor: e.target.value })
    }

    handleTitleChange = (e) => {
       this.setState({ formTitle: e.target.value })
    }

    handleBodyChange = (e) => {
       this.setState({ formBody: e.target.value })
    }

    handleCategoryChange = (e) => {
       this.setState({ formCategory: e.target.value })
    }

    render () {
        var disabled = false;
        if (this.props.post) {
            disabled = true;
        }
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={12}>
                        <div className="panel">
                            <div className="panel-heading">
                                <p>Edit</p>
                            </div>
                            <div className="panel-body">
                                <form className="edit-form" onSubmit={ this.submitForm } method="POST" action="">
                                    <label>Author</label>
                                    <FormControl
                                        name="author"
                                        type="text"
                                        disabled={ disabled }
                                        value={ this.state.formAuthor }
                                        onChange={ this.handleAuthorChange }
                                    />
                                    <label>Title</label>
                                    <FormControl
                                        name="title"
                                        type="text"
                                        value={ this.state.formTitle }
                                        onChange={ this.handleTitleChange }
                                    />
                                    <label>Category</label>
                                    <FormControl
                                        onChange={ this.handleCategoryChange }
                                        value={ this.state.formCategory }
                                        disabled={ disabled }
                                        componentClass="select">
                                        { this.props.categories && (
                                            this.props.categories.map((category) => (
                                                <option key={ category.name } value={ category.name }>{ capitalize(category.name) }</option>
                                            ))
                                        )}
                                    </FormControl>
                                    <label>Content</label>
                                    <FormControl
                                        componentClass="textarea"
                                        name="body"
                                        value={ this.state.formBody }
                                        onChange={ this.handleBodyChange }
                                    />
                                    <Button type="submit">
                                        Submit
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

function mapStateToProps ({ posts, categories }, props) {
    let post = posts[props.match.params.postId] || null
    return { post, categories }
}

function mapDispatchToProps (dispatch) {
  return {
    addNewPost: (data) => dispatch(addPost(data)),
    editExistingPost: (data) => dispatch(editPost(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm)
