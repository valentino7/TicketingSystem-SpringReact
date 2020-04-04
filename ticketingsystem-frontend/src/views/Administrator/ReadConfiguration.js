import React from 'react'
import axios from 'axios';

import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText
} from 'reactstrap';

const baseUrl = "http://35.239.133.8:8081/ticketingsystem/system/configuration/";

const itemToRender = ((props) => {
    return <ListGroupItem key={props.id}>{props.name}</ListGroupItem>
});

class ReadConfiguration extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            requestURL: baseUrl.concat("getConfigurationFile"),
            id: "",
            userRolesInternal: [],
            userRolesExternal: [],
            teamNames: [],
            ticketCategories: [],
            ticketLifecycle: [],
        }
    }

    componentDidMount() {
        axios.get(this.state.requestURL, {
            responseType: 'json'
        }).then((response) => {
            this.setState({id: response.data.id})
            this.setState({ userRolesInternal: response.data.userSettings.userRolesInternal })
            this.setState({ userRolesExternal: response.data.userSettings.userRolesExternal })
            this.setState({ teamNames: response.data.teamSettings.teamNames })
            this.setState({ ticketCategories: response.data.ticketSettings.ticketCategories })
            this.setState({ ticketLifecycle: response.data.ticketSettings.lifecycleVersion })
        })
    }

    renderUsersfromResponse(props) {
        if (!props) {
            return (<ListGroupItem>Error during download users</ListGroupItem>)
        }
        return props.map((item) => {
            return <ListGroupItem key={item.id}>{item.name}</ListGroupItem>
        });
    }

    renderTicketLifecyclefromResponse(props) {
        if (!props) {
            return (<ListGroupItem>Error during download ticket information</ListGroupItem>)
        }
        return props.map((item) => {
            return (
                <ListGroupItem key={item.id}>
                    <ListGroupItemHeading>Lifecycle v{item.version}</ListGroupItemHeading>
                    {item.states.map(p => <ListGroupItemText> {p} </ListGroupItemText>)}
                </ListGroupItem>
            )
        });
    }

    renderTeamsfromResponse(props) {
        if (!props) {
            return (<ListGroupItem>Error during download teams</ListGroupItem>)
        }
        return props.map((item) => {
            return <ListGroupItem key={item.id}>{item.name}</ListGroupItem>
        });
    }

    renderTicketCategoriesfromResponse(props) {
        if (!props) {
            return (<ListGroupItem>Error during download ticket categories</ListGroupItem>)
        }
        return props.map((item) => {
            return <ListGroupItem key={item.id}>{item.name}</ListGroupItem>
        });
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-edit"></i>System configuration ID: {this.state.id}
                                <div className="card-header-actions">
                                    <Button color="link" className="card-header-action btn-setting"><i className="icon-settings"></i></Button>
                                    <Button color="link" className="card-header-action btn-minimize" data-target="#collapseExample" onClick={this.toggle}><i className="icon-arrow-up"></i></Button>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12">
                                        <h4 xs="12" className="text-center mt-2">User - Settings</h4>
                                    </Col>
                                    <Col xs="12" sm="12" md="6">
                                        <h5 className="text-center mb-4">Internal user types</h5>
                                        <ListGroup className="mb-4">
                                            {this.renderUsersfromResponse(this.state.userRolesInternal)}
                                        </ListGroup>
                                    </Col>
                                    <Col xs="12" sm="12" md="6">
                                        <h5 className="text-center mb-4">External user types</h5>
                                        <ListGroup>
                                            {this.renderUsersfromResponse(this.state.userRolesExternal)}
                                        </ListGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardBody>
                                <Row>
                                    <Col xs="12">
                                        <h4 xs="12" className="text-center mt-2">Team - Settings</h4>
                                    </Col>
                                    <Col xs="12" sm="12" md="12">
                                        <h5 className="text-center mb-4">Team names</h5>
                                        <ListGroup className="mb-4">
                                            {this.renderTeamsfromResponse(this.state.teamNames)}
                                        </ListGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardBody>
                                <Row>
                                    <Col xs="12">
                                        <h4 xs="12" className="text-center mt-2">Ticket - Settings</h4>
                                    </Col>
                                    <Col xs="12" sm="12" md="6">
                                        <h5 className="text-center mb-4">Ticket types</h5>
                                        <ListGroup className="mb-4">
                                            {this.renderTicketCategoriesfromResponse(this.state.ticketCategories)}
                                        </ListGroup>
                                    </Col>
                                    <Col xs="12" sm="12" md="6">
                                        <h5 className="text-center mb-4">Ticket lifecycles</h5>
                                        <ListGroup>
                                            {this.renderTicketLifecyclefromResponse(this.state.ticketLifecycle)}
                                        </ListGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </div>
        );
    }

}

export default ReadConfiguration;