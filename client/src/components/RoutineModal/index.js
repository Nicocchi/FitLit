import React from "react";
import shortid from "shortid";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Table from "react-bootstrap/Table";
import Routine from "./Routine";

export default function RoutineModal(props) {
	return (
		<Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">{props.modalEdit ? "Edit" : "New"} Routine</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<InputGroup className="mb-3">
					<InputGroup.Prepend>
						<InputGroup.Text id="basic-addon1">Routine Name</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl onChange={e => props.handleRoutineName(e)} placeholder={props.routine.name} aria-label="Routine-Name" aria-describedby="basic-addon1" />
				</InputGroup>
				<InputGroup>
					<InputGroup.Prepend>
						<InputGroup.Text>Routine Note</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl onChange={e => props.handleRoutineNote(e)} as="textarea" placeholder={props.routine.note} aria-label="With textarea" />
				</InputGroup>
				<br />
				<Button onClick={e => props.addExercise(e)}>Add Exercise</Button>
				<br />
				{
					props.exercises.map(exercise => {
						return (
							<Routine exercise={exercise} handleKeyPress={props.handleKeyPress} handleSetKeyPress={props.handleSetKeyPress} addSet={props.addSet} addExercise={props.addExercise} setWrapperRef={props.setWrapperRef} />
						)
					})
				}
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
				{
					props.modalEdit ? null : <Button onClick={props.addRoutine}>Add</Button>
				}
				
			</Modal.Footer>
		</Modal>
	);
}
