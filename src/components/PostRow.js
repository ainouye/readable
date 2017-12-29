import React from 'react';
import { Badge, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/helpers'

function PostRow(props) {
    return (
        <div className="category-posts">
            <div className="category-post">
                <Row className="show-grid">
                    <Col xs={12} sm={9}>
                        <Link to={"/post/" + props.id}>{ props.title }</Link>
                        <p>by { props.author }</p>
                    </Col>
                    <Col xs={12} sm={2}>
                        <p>{ formatDate(props.timestamp) }</p>
                    </Col>
                    <Col xs={12} sm={1}>
                        <Badge>{ props.voteScore }</Badge>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default PostRow
