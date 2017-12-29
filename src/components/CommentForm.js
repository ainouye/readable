import { addComment, editComment } from '../actions'
import { connect } from 'react-redux'
import React, { Component } from 'react';
import { Button, Col, FormControl, Grid, Row } from 'react-bootstrap'
import {  generateUUID } from '../utils/helpers'

class CommentForm extends Component {
    state = {
        'formAuthor': (this.props.comment && this.props.comment.author) || '',
        'formBody': (this.props.comment && this.props.comment.body) || '',
    }

    submitForm = (e) => {
        e.preventDefault()
        if (this.props.comment) {
            this.props.editExistingComment({
                id: this.props.match.params.commentId,
                body: this.state.formBody
            })
        } else {
            this.props.addNewComment({
                id: generateUUID(),
                author: this.state.formAuthor,
                body: this.state.formBody,
                parentId: this.props.match.params.parentId,
                timestamp: Date.now(),
                voteScore: 1
            })
        }
        this.props.history.push('/post/' + this.props.match.params.parentId)
    }

    handleAuthorChange = (e) => {
       this.setState({ formAuthor: e.target.value })
    }

    handleBodyChange = (e) => {
       this.setState({ formBody: e.target.value })
    }

    render () {
        var disabled = false;
        if (this.props.comment) {
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

function mapStateToProps ({ comments }, props) {
    let comment = comments[props.match.params.commentId] || null
    return { comment }
}

function mapDispatchToProps (dispatch) {
  return {
    addNewComment: (data) => dispatch(addComment(data)),
    editExistingComment: (data) => dispatch(editComment(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm)
