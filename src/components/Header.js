import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Header(props) {
    return (
        <header>
            <Grid>
                <Row className="show-grid">
                    <Col xs={12}>
                        <Link to="/">Readable</Link>
                    </Col>
                </Row>
            </Grid>
        </header>
    );
}

export default Header
