import styles from './search.module.css';
import { Form, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import {
    setDropDownValueForSearch,
    changeSearchValue,
    setDate,
    sortOrFilterThunk,
} from '../../Redux/action';
const sortVariants = [
    {
        label: 'A-Z',
        value: 'a-z',
    },
    {
        label: 'Z-A',
        value: 'z-a',
    },
    {
        label: 'Created_Date_Oldest',
        value: 'creation_date_oldest',
    },
    {
        label: 'Created_Date_Newest',
        value: 'creation_date_newest',
    },
    {
        label: 'Completion_Date_Oldest',
        value: 'completion_date_oldest',
    },
    {
        label: 'Completion_Date_Newest',
        value: 'completion_date_newest',
    },
    {
        label: 'Reset',
        value: '',
    },
];
const statusVariants = [
    {
        label: 'Done',
        value: 'done',
    },
    {
        label: 'Active',
        value: 'active',
    },
    {
        label: 'Reset',
        value: '',
    },
];
const Search = (props) => {
    const {
        // functions
        setDropDownValueForSearch,
        changeSearchValue,
        setDate,
        sortOrFilterThunk,
    } = props;
    const {
        sort,
        status,
        search,
        create_lte,
        create_gte,
        complete_lte,
        complete_gte,
    } = props.state;

    const sortItems = sortVariants.map((variant, index) => {
        return (
            <Dropdown.Item
                key={index}
                onClick={() => setDropDownValueForSearch('sort', variant.value)}
            >
                {variant.label}
            </Dropdown.Item>
        );
    });
    const statusItems = statusVariants.map((variant, index) => {
        return (
            <Dropdown.Item
                onClick={() =>
                    setDropDownValueForSearch('status', variant.value)
                }
                key={index}
            >
                {variant.label}
            </Dropdown.Item>
        );
    });
    return (
        <div>
            <h1>Search</h1>
            <Form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                <Form.Group className="mt-3">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        onChange={(e) => changeSearchValue(e.target)}
                        value={search}
                        name="search"
                    />
                </Form.Group>
                <Form.Group className="mt-3 d-flex justify-content-center">
                    <DropdownButton
                        title={
                            sort
                                ? sortVariants.find((i) => i.value === sort)
                                      .label
                                : 'Sort'
                        }
                        variant="secondary"
                    >
                        {sortItems}
                    </DropdownButton>
                    <DropdownButton
                        title={
                            status
                                ? statusVariants.find((i) => i.value === status)
                                      .label
                                : 'Status'
                        }
                        variant="secondary"
                        className="ml-2"
                    >
                        {statusItems}
                    </DropdownButton>
                </Form.Group>
                {/* <Form.Group>
                    Created Late
                    <DatePicker
                        selected={create_lte}
                        onChange={(date) => setDate('create_lte', date)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Created Greater</Form.Label>
                    <DatePicker
                        selected={create_gte}
                        onChange={(date) => setDate('create_gte', date)}
                    />
                </Form.Group>
                <Form.Group>
                    Complated Late
                    <DatePicker
                        selected={complete_lte}
                        onChange={(date) => setDate('complete_lte', date)}
                    />
                </Form.Group>
                <Form.Group>
                    Complated Greator
                    <DatePicker
                        selected={complete_gte}
                        onChange={(date) => setDate('complete_gte', date)}
                    />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={() => sortOrFilterThunk(props.state)}
                    >
                        Submit
                    </Button>
                </Form.Group> */}
            </Form>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        state: state.searchState,
    };
};
const mapDispatchToProps = {
    setDropDownValueForSearch,
    changeSearchValue,
    setDate,
    sortOrFilterThunk,
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
