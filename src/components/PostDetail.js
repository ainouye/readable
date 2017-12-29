import React from 'react';
import { connect } from 'react-redux'
import { Button, Col, Glyphicon, Grid, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Comment from './Comment'
import { removeObject, trackVote } from '../actions'
import { formatDate } from '../utils/helpers'

class PostDetail extends React.Component {
    deleteOnClick = () => {
        this.props.deletePost({ id: this.props.match.params.postId, type: "posts" })
        this.props.history.push('/')
    }

    voteOnClick = (option) => {
        let score = this.props.post.voteScore
        if (option === 'upVote')
            score = score + 1
        else
            score = score - 1
        this.props.votePost({ id: this.props.match.params.postId, option: option, voteScore: score, type: "posts" })
    }

    render() {
        const { match, post, comments } = this.props

        return (
            <div>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12}>
                            <div className="panel">
                                <div className="panel-heading">
                                    <Link to="/">Home</Link>
                                    <div className="pull-right">
                                        <Link to={ "/edit/" + match.params.postId }>
                                            <Glyphicon glyph="pencil" />
                                        </Link>
                                        <Glyphicon glyph="trash" onClick={ this.deleteOnClick } />
                                    </div>
                                </div>
                                { post && (
                                <div className="panel-body">
                                    <Row className="show-grid">
                                        <Col xs={11}>
                                            <h1>{ post.title }</h1>
                                            <p className="posting-detail">by <span className="author-name">{ post.author }</span> at { formatDate(post.timestamp) }</p>
                                        </Col>
                                        <Col xs={1}>
                                            <div className="post-votes">
                                                <Glyphicon glyph="chevron-up" onClick={ () => { this.voteOnClick("upVote") } } />
                                                <span className="number-vote">{ post.voteScore }</span>
                                                <Glyphicon glyph="chevron-down" onClick={ () => { this.voteOnClick("downVote") } } />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="show-grid post-content">
                                        <Col xs={12}>
                                            { post.body }
                                        </Col>
                                    </Row>
                                </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Grid>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12}>
                            <h3>Comments ({ comments.length })</h3>
                            <Link to={ "/edit_comment/" + match.params.postId + "/"}><Button bsSize="small"><Glyphicon glyph="plus" /> New Comment</Button></Link>
                            { comments && (
                                comments.map((comment) => (
                                    <Comment key={ comment.id } commentId={ comment.id } />
                                ))
                            )}
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

function mapStateToProps ({ posts, comments }, props) {
    let mappedComments = Object.keys(comments).reduce((allComments, currentKey) => {
        if (comments[currentKey] && comments[currentKey].parentId === props.match.params.postId) {
            allComments.push({
                ...comments[currentKey],
                id: currentKey
            })
        }
        return allComments
    }, [])

    if (!posts[props.match.params.postId]) {
        props.history.push('/')
    }
    return { 'post': posts[props.match.params.postId], comments: mappedComments }
}

function mapDispatchToProps (dispatch) {
  return {
    deletePost: (data) => dispatch(removeObject(data)),
    votePost: (data) => dispatch(trackVote(data)),
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetail)
