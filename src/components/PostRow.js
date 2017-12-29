import React, { Component } from 'react';
import { Badge, Col, Glyphicon, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/helpers'
import { connect } from 'react-redux'
import { removeObject, populateComment, trackVote } from '../actions'
import * as ReadableAPI from '../utils/api'

class PostRow extends Component {
    componentWillMount() {
        ReadableAPI.getComments(this.props.id).then((comments) => {
            console.log('getting')
            comments.forEach(function(comment) {
                this.props.addAllComments({ ...comment })
            }, this)
        }).catch(e => {console.log(e)})
    }

    deleteOnClick = () => {
        this.props.deletePost({ id: this.props.id, type: "posts" })
    }
    voteOnClick = (option) => {
        let score = this.props.voteScore
        if (option === 'upVote')
            score = score + 1
        else
            score = score - 1
        this.props.votePost({ id: this.props.id, option: option, voteScore: score, type: "posts" })
    }

    render() {
        return (
            <div className="category-posts">
                <div className="category-post">
                    <Row className="show-grid">
                        <Col xs={12} sm={9}>
                            <div className="edit-icons">
                            <Link to={ `/edit/${this.props.id}` }>
                                <Glyphicon glyph="pencil" />
                                </Link>
                                <Glyphicon glyph="trash" onClick={ this.deleteOnClick } />
                            </div>
                            <Link to={`/${this.props.category}/${this.props.id}`}><h4>{ this.props.title }</h4></Link>
                            <p>by { this.props.author }</p>
                            <p>{ this.props.comment_count } Comments</p>
                        </Col>
                        <Col xs={12} sm={2}>
                            <p>{ formatDate(this.props.timestamp) }</p>
                        </Col>
                        <Col xs={12} sm={1}>
                            <Glyphicon glyph="chevron-up" onClick={ () => { this.voteOnClick("upVote") } } />
                                <Badge>{ this.props.voteScore }</Badge>
                            <Glyphicon glyph="chevron-down" onClick={ () => { this.voteOnClick("downVote") } } />

                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
function mapStateToProps ({ comments }, props) {
    let totalComments = Object.keys(comments).reduce((allComments, currentKey) => {
        if (comments[currentKey] && comments[currentKey].parentId === props.id) {
            allComments.push({
                ...comments[currentKey]
            })
        }
        return allComments
    }, [])
    return { comment_count: totalComments.length }
}

function mapDispatchToProps (dispatch) {
  return {
        votePost: (data) => dispatch(trackVote(data)),
        deletePost: (data) => dispatch(removeObject(data)),
        addAllComments: (data) => dispatch(populateComment(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostRow)
