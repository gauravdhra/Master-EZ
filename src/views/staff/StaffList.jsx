import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Row,
    Col,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from 'reactstrap';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { fetchStaff } from '../../store/actions';
import Spinner from '../../components/Spinner/Spinner';

class StaffList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            searchString: '',
            completeData: null            
        };
    }

    componentWillMount() {
        // Hit the api to get the list of staff members.
        this.props.getStaff();
        // Update local state from store if we have something in store.
        if (this.props.staff.length > 0) {
            this.setState({ tableData: this.props.staff });
        }
    }

    componentWillReceiveProps(props) {
        // Update local state from store after getting response from backend.
        if (props.staff.length > 0 && !props.loading && !this.state.searchString ) {
            this.setState({ tableData: props.staff });
        }
    }

    // Method to handle the search filters.
    searchHandler = e => {
        e.preventDefault();
        // Search string.
        const val = this.state.searchString;
        // Complete list of staff members.
        const staff = [...this.props.staff];
        let filteredData = [];
        // Get Filtered list by using filters.
        filteredData = staff.filter(user => {
            return (
                user.firstName.toLowerCase().startsWith(val) ||
                user.lastName.toLowerCase().startsWith(val)
            );
        });
        // Update local state with filtered list.
        this.setState({ tableData: filteredData });
    };

    // Update the search text to local state variable.
    searchTextChangeHandler = event => {
        this.setState({ searchString: event.target.value });
    };

    // Add new button click handler.
    addNewMemberHandler = () => {
        this.props.history.push('/admin/add-staff');
    };

    render() {
        // Columns mapping of react table to the data source.
        const columns = [
            {
                Header: 'First Name',
                accessor: 'firstName' // String-based value accessors!
            },
            {
                Header: 'Last Name',
                accessor: 'lastName' // String-based value accessors!
            },
            {
                Header: 'Username',
                accessor: 'userName'
            },
            // {
            //     id: 'country', // Required because our accessor is not a string
            //     Header: 'Country',
            //     accessor: d => d.address.country // Custom value accessors!
            // },
            // {
            //     id: 'city', // Required because our accessor is not a string
            //     Header: 'City',
            //     accessor: d => d.address.city // Custom value accessors!
            // },
            // {
            //     Header: props => <span>Salary</span>, // Custom header components!
            //     accessor: 'salary',
            //     Cell: props => <span className="number">{props.value}</span> // Custom cell components!
            // },
            {
                Header: 'Actions',
                accessor: 'staffID',
                Cell: props => (
                    <Link to={'/admin/edit-staff/' + props.value }>Edit</Link>
                )
            }
        ];

        // Show spinner by default.
        let table = <Spinner />;
        // If data loaded then show the table instead of Spinner.
        if (!this.props.loading) {
            table = (
                <ReactTable
                    data={this.state.tableData}
                    columns={columns}
                    defaultPageSize={10}
                    pageSizeOptions={[2, 5, 10]}
                />
            );
        }

        return (
            <div className="content">
                <Card>
                    <CardHeader>
                        <CardTitle tag="h4">Staff List</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            {/* Add new Button starts */}
                            <Col md={8}>
                                <Button
                                    className="btn-simple"
                                    color="primary"
                                    onClick={this.addNewMemberHandler}
                                >
                                    Add New
                                </Button>
                            </Col>
                            {/* -----Add new Button ends----- */}
                            {/* Search box starts */}
                            <Col md={4}>
                                <form onSubmit={this.searchHandler}>
                                    <InputGroup className="no-border">
                                        <Input
                                            placeholder="Search..."
                                            value={this.state.searchString}
                                            onChange={this.searchTextChangeHandler}
                                            onKeyUp={this.searchHandler}
                                        />
                                        <InputGroupAddon addonType="append">
                                            <InputGroupText>
                                                <i
                                                    className="tim-icons icon-zoom-split"
                                                    onClick={this.searchHandler}
                                                />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </form>
                            </Col>
                            {/* -----Search box ends----- */}
                        </Row>

                        {table}
                    </CardBody>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        staff: state.staff.data,
        loading: state.staff.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getStaff: () => dispatch(fetchStaff())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StaffList);
