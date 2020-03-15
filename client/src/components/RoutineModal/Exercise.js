import React, { Component, Fragment } from 'react'
import shortid from "shortid";
import Modal from "react-bootstrap/Modal";
import Button from '@material-ui/core/Button';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Table from "react-bootstrap/Table";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

export default class Routine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalEditName: false,
            modalEditLift: false,
            modalEditReps: false,
        }

        this.togglePrevious = this.togglePrevious.bind(this);
        this.toggleLift = this.toggleLift.bind(this);
        this.toggleReps = this.toggleReps.bind(this);
		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    
    togglePrevious() {
        this.setState({ modalEditName: !this.state.modalEditName, modalEditLift: false, modalEditReps: false })
    }

    toggleLift() {
        this.setState({ modalEditLift: !this.state.modalEditLift, modalEditName: false, modalEditReps: false })
    }

    toggleReps() {
        this.setState({ modalEditReps: !this.state.modalEditReps, modalEditName: false, modalEditLift: false })
    }
	
	/**
     * Set the wrapper ref
     */
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({ modalEditName: false, modalEditLift: false, modalEditReps: false })
        }
	}
	
	handleKeyPress(e, id, setId, type) {
		if (e.key == "Enter" && e.target.value !== "") {
			this.props.handleSetKeyPress(e, id, setId, type)
			this.setState({ modalEditName: false, modalEditLift: false, modalEditReps: false })
		}
		
	}

    render() {
        return (
			<TableRow key={shortid.generate()}>
                <TableCell>{this.props.set.id}</TableCell>
                {
					this.state.modalEditName ?
                    <Input
                        ref={this.setWrapperRef}
                        autoFocus
                        id="note"
                        label=""
                        type="text"
                        size="small"
                        onKeyPress={e => this.handleKeyPress(e, this.props.id, this.props.set.id, "previous")}
                        style={{width: "100px", margin: "5px"}}
                    />
					: <TableCell onDoubleClick={this.togglePrevious}>{this.props.set.previous}</TableCell>
				}
                {
					this.state.modalEditLift ?
                    <Input
                        ref={this.setWrapperRef}
                        autoFocus
                        id="note"
                        label=""
                        type="text"
                        size="small"
                        style={{width: "50px", margin: "5px"}}
                        onKeyPress={e => this.handleKeyPress(e, this.props.id, this.props.set.id, "lift")}
                    />
					: <TableCell onDoubleClick={this.toggleLift}>{this.props.set.lift}</TableCell>
				}
                {
					this.state.modalEditReps ?
                    <Input
                        ref={this.setWrapperRef}
                        autoFocus
                        id="note"
                        label=""
                        type="text"
                        size="small"
                        style={{width: "50px"}}
                        onKeyPress={e => this.handleKeyPress(e, this.props.id, this.props.set.id, "reps")}
                    />
					: <TableCell onDoubleClick={this.toggleReps}>{this.props.set.reps}</TableCell>
				}
            </TableRow>
        )
    }
}
