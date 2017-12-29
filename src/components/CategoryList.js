import React, { Component } from 'react';
import { Button, Col, Glyphicon, Grid, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PostRow from './PostRow'

class CategoryList extends Component {
    state = {
        sort: '',
        direction: false
    }

    render() {
        if (this.state.sort === 'date')
            this.props.posts.sort((a, b) => {
                if (this.state.direction)
                    return a.timestamp < b.timestamp
                return a.timestamp > b.timestamp
            })
        else if (this.state.sort === 'votes')
            this.props.posts.sort((a, b) => {
                if (this.state.direction)
                    return a.voteScore < b.voteScore
                return a.voteScore > b.voteScore
            })

        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} bsClass="text-right">
                        <Link to="/edit/"><Button bsSize="small"><Glyphicon glyph="plus" /> New Post</Button></Link>
                        <div className="panel">
                            <div className="panel-heading">
                                <Row className="show-grid">
                                    <Col xs={12} sm={9}>
                                        { this.props.name }
                                    </Col>
                                    <Col xs={12} sm={2}>
                                        <p>Date Posted <Glyphicon glyph="sort" onClick={ () => this.setState( { sort: 'date',
                                        direction: !this.state.direction }) } /></p>

                                    </Col>
                                    <Col xs={12} sm={1}>
                                        <p>Votes <Glyphicon glyph="sort" onClick={ () => this.setState( { sort: 'votes', direction: !this.state.direction }) } /></p>
                                    </Col>
                                </Row>
                            </div>
                            { this.props.posts && (
                                Object.keys(this.props.posts).map((post) => (
                                    <PostRow key={ post } { ...this.props.posts[post] } />
                                ))
                            )}
                        </div>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default CategoryList
