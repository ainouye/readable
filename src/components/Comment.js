import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { removeObject, trackVote } from '../actions'
import { Col, Glyphicon, Row } from 'react-bootstrap'
import { formatDate } from '../utils/helpers'

class Comment extends React.Component {
    voteOnClick = (option) => {
        let score = this.props.comment.voteScore
        if (option === 'upVote')
            score = score + 1
        else
            score = score - 1
        this.props.votePost({ id: this.props.commentId, option: option, voteScore: score, type: "comments" })
    }

    deleteOnClick = () => {
        this.props.deleteComment({ id: this.props.commentId, type: "comments" })
    }

    render() {
        const { comment } = this.props
        return (
            <div className="panel">
                <div className="panel-heading">
                    <p>By <span className="author-name">{ comment.author }</span> at { formatDate(comment.timestamp) } </p>

                    <div className="pull-right">
                        <Link to={ "/edit_comment/" + comment.parentId + "/" + this.props.commentId}><Glyphicon glyph="pencil" /></Link>
                        <Glyphicon glyph="trash" onClick={ this.deleteOnClick } />
                    </div>
                </div>
                <div className="panel-body">
                    <Row className="show-grid">
                        <Col xs={11}>
                            <p>{ comment.body }</p>
                        </Col>
                        <Col xs={1}>
                            <div className="post-votes">
                                <Glyphicon glyph="chevron-up" onClick={ () => { this.voteOnClick("upVote") } } />
                                <span className="number-vote">{ comment.voteScore }</span>
                                <Glyphicon glyph="chevron-down" onClick={ () => { this.voteOnClick("downVote") } } />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({ comments }, props) {
    return { comment: comments[props.commentId] }
}

function mapDispatchToProps (dispatch) {
  return {
    deleteComment: (data) => dispatch(removeObject(data)),
    votePost: (data) => dispatch(trackVote(data)),
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Comment)

