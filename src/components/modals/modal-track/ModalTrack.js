import React, { Component } from 'react';
import classes from './ModalTrack.module.css';
import PropTypes from 'prop-types';
import { Input } from '../../input/Input';
import { Title } from '../../title/Title';
import { Button } from '../../UI/button/Button';
import { ModalTemplate } from '../modal-template/ModalTemplate';
import { color } from '../../UI/colors/colors';
import { Textarea } from '../../textarea/Textarea';
import { ButtonsGroupModal } from '../../UI/button-groups-modal/ButtonGroupModal';
import { isEmptyInputModal } from '../../helpers/validations/emptyInputModal';
import { RolesContext } from '../../../context/Contexts';
import { addDataTrack, updateData } from '../../firebase/firebaseAPI';
import { collection } from '../../helpers/commonData/collections';
import { successResponseData } from '../../helpers/commonData/successResponseData';

export default class ModalTrack extends Component {
  state = {
    trackData: {
      description: '',
      taskId: null,
      taskTrackId: null,
      trackDate: '',
      trackNote: '',
      userId: null,
    },
    isErrorInput: false,
  };

  componentDidMount() {
    const {
      task,
      currentTask: { taskId, userId },
      taskName,
    } = this.props;
    const { trackData } = this.state;

    const tempTrackData = Object.assign(trackData, task);
    this.setState({ trackData: tempTrackData });
    this.setState((prevState) => ({
      trackData: {
        ...prevState.trackData,
        taskId,
        userId,
        description: taskName,
      },
    }));
  }

  handleClickSubmit = async (event) => {
    event.preventDefault();

    const { taskTrackId, trackDate, trackNote } = this.state.trackData;
    const { trackData } = this.state;
    const { handleClickTrack } = this.props;
    const { showSuccess, showError } = this.context;
    const { updateTrack, addTrack } = successResponseData;

    if (isEmptyInputModal({ trackDate, trackNote })) {
      this.setState({
        isErrorInput: true,
      });
      showError('Fill empty field');
      return;
    }

    try {
      if (taskTrackId) {
        await updateData(taskTrackId, collection.track, trackData);
        showSuccess(updateTrack);
      } else {
        await addDataTrack(collection.track, trackData, 'taskTrackId');
        showSuccess(addTrack);
      }
      handleClickTrack();
    } catch ({ message }) {
      const { showError } = this.context;
      handleClickTrack();
      showError(message);
    }
  };

  handleChangeInput = ({ target: { id, value } }) => {
    this.setState((prevState) => ({
      trackData: {
        ...prevState.trackData,
        [id]: value,
      },
      isErrorInput: false,
    }));
  };

  render() {
    const { name, title, handleClickTrack, disabled, hidden } = this.props;
    const {
      trackData: { trackNote, trackDate },
      isErrorInput,
    } = this.state;

    return (
      <>
        <ModalTemplate handleOpenCloseModal={handleClickTrack}>
          <div className={classes.ModalTrack}>
            <Title text={title} />

            <div className={classes.Content}>
              <Textarea
                name='Note'
                disabled={disabled}
                handleChange={this.handleChangeInput}
                error={isErrorInput}
                value={trackNote}
                important={true}
                id={'trackNote'}
              />
              <Input
                name='Date'
                type='date'
                disabled={disabled}
                handleChange={this.handleChangeInput}
                error={isErrorInput}
                important={true}
                value={trackDate}
                id='trackDate'
              />
            </div>

            <ButtonsGroupModal>
              <Button name={name} color={color.green} hidden={hidden} handleClick={this.handleClickSubmit} />
              <Button name='Back' color={'var(--color-button-delete)'} handleClick={handleClickTrack} />
            </ButtonsGroupModal>
          </div>
        </ModalTemplate>
      </>
    );
  }
}

ModalTrack.defaultProps = {
  name: 'Save',
  title: 'Edit',
  hidden: false,
  disabled: false,
};

ModalTrack.propTypes = {
  handleClickTrack: PropTypes.func.isRequired,
};

ModalTrack.contextType = RolesContext;
