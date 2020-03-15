import React from "react";
import shortid from "shortid";
import Modal from "react-bootstrap/Modal";
import Button from '@material-ui/core/Button';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Table from "react-bootstrap/Table";
import Routine from "./Routine";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default function RoutineModal(props) {
	return (
		<Dialog
			open={props.show}
			onClose={props.onHide}
			aria-labelledby="responsive-dialog-title"
		>
			<DialogTitle id="responsive-dialog-title">{props.modalEdit ? "Edit" : "New"} Routine</DialogTitle>
			<DialogContent>
			<TextField
				autoFocus
				margin="dense"
				id="name"
				label={props.routine.name}
				type="text"
				fullWidth
				onChange={e => props.handleRoutineName(e)}
			/>
			<TextField
				autoFocus
				margin="dense"
				id="note"
				label={props.routine.note !== null ? props.routine.note : "Routine Note"}
				type="text"
				fullWidth
				multiline
				rowsMax="4"
				onChange={e => props.handleRoutineNote(e)}
			/>
			<Button onClick={e => props.addExercise(e)} style={{marginTop: "20px"}}>Add Exercise</Button>
			{
				props.exercises.map(exercise => {
					return (
						<Routine key={shortid.generate()} exercise={exercise} handleKeyPress={props.handleKeyPress} handleSetKeyPress={props.handleSetKeyPress} addSet={props.addSet} addExercise={props.addExercise} setWrapperRef={props.setWrapperRef} />
					)
				})
			}
			</DialogContent>
			<DialogActions>
			<Button autoFocus onClick={props.onHide} color="primary">
				Cancel
			</Button>
			{
				props.modalEdit ? null : <Button onClick={props.addRoutine} color="primary" autoFocus>Add</Button>
			}
			
			</DialogActions>
		</Dialog>
	);
}
