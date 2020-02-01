import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardBody, Row, Col, Button, FormGroup, Input, Label } from 'reactstrap';
import { withRouter } from 'react-router';

import { addStaff, getStaff, updateStaff } from '../../store/actions';
import Spinner from '../../components/Spinner/Spinner';
import { updateObject } from '../../shared/utility';
import { ROLE } from './../../shared/consts'
import Select from "react-select";

class Member extends Component {
    state = {
        staffID: '',
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        sex: 'Male',
        groupMembership: '',
        qualifications: '',
        dropdownOpen: false,
        role: '',
        active: true,
    };

    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    componentWillMount() {
        // Check the url for id to show Edit page.
        if (this.props.match.params.id) {
            // Hit the api to get the details of editing member.
            this.props.getMember(this.props.match.params.id);
            // Update local state from store.
            this.updateLocalState(this.props);
        }
    }

    componentWillReceiveProps(props) {
        // Update local state from store after getting response from backend.
        if (props.members.length > 0 && !props.loading && this.props.match.params.id) {
            this.updateLocalState(props);
        }
    }

    updateLocalState = props => {
        // Get the specific record from redux store list.
        const memberDetails = props.members.find(member => {
            return member.staffID === Number(props.match.params.id);
        });
        // Update local state if record available in redux state.
        if (memberDetails) {
            if (memberDetails.rolID) {
                const role = ROLE.find(role => {
                    return role.value === Number(memberDetails.rolID);
                });
                memberDetails.role = role;
            }
            this.setState(updateObject(this.state, memberDetails));
        }
    };

    // Set local state with the value of control.
    handleChange = (e) => {
        e.preventDefault();

        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);

    };

    // Method to submit the form to backend.
    handleSubmit = event => {
        // Stop the default functionality(page reload).
        event.preventDefault();
        const currentMemberId = this.props.match.params.id;
        // Create the object according to api need.
        const staffDataJson = {
            staffID: currentMemberId ? currentMemberId : 0,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            userName: this.state.userName,
            password: this.state.password,
            sex: this.state.sex,
            rolID: this.state.role.value,
            active: this.state.active,
            // Default props
            locationID: 20006,
            reportsToID: 21533,
            districtW: "7CBA",
            languages: ["EN"],
            programTypes: [{"programId":20005,"programName":"Medi-Cal"}],
            groupSecid: [20021]
        };

        console.log(staffDataJson);
        this.props.addMember(staffDataJson);
        // Check whether in Edit mode or create mode.
        if (currentMemberId) {
            // Hit update record method of api if in Edit mode.
            // this.props.updateMember(this.props.match.params.id, member);
        } else {
            // Hit add record method of api if in Create new mode.
            // this.props.addMember(staffDataJson);
            // Reset the form.
            this.resetform();
        }
    };

    backClickHandler = () => {
        // createNotification('info');
        this.props.history.goBack();
    };

    // Resets the local state to initial values.
    resetform = () => {
        this.setState({
            staffID: '',
            firstName: '',
            lastName: '',
            userName: '',
            password: '',
            sex: '',
            groupMembership: '',
            qualifications: '',
            role: '',
            active: true

        });
    };

    render() {
        // Show spinner by default.
        let form = <Spinner />;
        // If data loaded then show the form instead of Spinner.
        if (!this.props.loading) {
            form = (
                // Control's name should be same as per of state keys.
                <form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <div className="form-group">
                                <label>Staff ID</label>
                                <input
                                    type="text"
                                    name="staffID"
                                    disabled
                                    className="form-control"
                                    value={this.state.staffID}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <div className="form-group">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="form-control"
                                    placeholder="First Name"
                                    onChange={this.handleChange}
                                    value={this.state.firstName}
                                />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="form-control"
                                    placeholder="Last Name"
                                    onChange={this.handleChange}
                                    value={this.state.lastName}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <div className="form-group">
                                <label>Username / Email</label>
                                <input
                                    type="text"
                                    name="userName"
                                    className="form-control"
                                    placeholder="Username or Email"
                                    onChange={this.handleChange}
                                    value={this.state.userName}
                                />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Password"
                                    onChange={this.handleChange}
                                    value={this.state.password ? this.state.password : ''}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>

                        <Col className="checkbox-radios" sm={6}>
                            <Label> Sex</Label><br />
                            <FormGroup check className="form-check-radio" inline>
                                <Label check>
                                    <Input
                                        checked={this.state.sex === 'Male'}
                                        type="radio"
                                        name="sex"
                                        onChange={() => this.setState({ sex: 'Male' })}
                                        value={this.state.sex}
                                    />
                                    <span className="form-check-sign" />Male
                          </Label>

                                <Label check>
                                    <Input
                                        checked={this.state.sex === 'Female'}
                                        type="radio"
                                        name="sex"
                                        value={this.state.sex}
                                        onChange={() => this.setState({ sex: 'Female' })}
                                    />
                                    <span className="form-check-sign" />Female
                          </Label>
                            </FormGroup>
                        </Col>

                        <Col sm={6}>
                            <FormGroup>
                                <label>Role</label>
                                <Select
                                    className="react-select info"
                                    classNamePrefix="react-select"
                                    name="role"
                                    value={this.state.role}
                                    placeholder="Select Role"
                                    onChange={data => this.setState({ role: data })}
                                    options={ROLE}
                                />
                            </FormGroup>

                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <div className="form-group">
                                <label>Group Membership</label>
                                <input
                                    type="text"
                                    name="groupMembership"
                                    className="form-control"
                                    placeholder="Group Membership"
                                    onChange={this.handleChange}
                                    value={this.state.groupMembership}
                                />
                            </div>
                        </Col>

                        <Col md={6}>
                            <div className="form-group">
                                <label>Qualifications</label>
                                <input
                                    type="text"
                                    name="qualifications"
                                    className="form-control"
                                    placeholder="Qualifications"
                                    onChange={this.handleChange}
                                    value={this.state.qualifications}
                                />
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Label />
                        <Col md={9}>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox"
                                        checked={this.state.active}
                                        name="active"
                                        onClick={() => this.setState({ active: !this.state.active })}
                                        readOnly
                                    />
                                    <span className="form-check-sign" />
                                    Active
                          </Label>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <div className="update ml-auto mr-auto">
                            <Button color="primary">
                                {this.props.match.params.id
                                    ? 'Update Member'
                                    : 'Add Member'}
                            </Button>
                            <Button
                                color="info"
                                onClick={this.backClickHandler}
                            >
                                Cancel
                            </Button>
                        </div>
                    </Row>
                </form>
            );
        }
        return (
            <div className="content">
                <Card className="card-user">
                    <CardHeader>
                        <h4 className="card-title">
                            {this.props.match.params.id
                                ? 'Edit Staff'
                                : 'New Staff'}
                        </h4>
                    </CardHeader>
                    <CardBody>{form}</CardBody>
                </Card>
            </div>
        );
    }
}

const matchStateToProps = state => {
    return {
        loading: state.staff.loading,
        error: state.staff.error,
        members: state.staff.data
    };
};
const mapDispatchToProps = dispatch => {
    return {
        addMember: payload => dispatch(addStaff(payload)),
        getMember: id => dispatch(getStaff(id)),
        updateMember: (id, payload) => dispatch(updateStaff(id, payload))
    };
};

export default withRouter(
    connect(
        matchStateToProps,
        mapDispatchToProps
    )(Member)
);
