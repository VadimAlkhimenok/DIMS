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
import { Status } from '../../UI/status/Status';
import { isEmptyInputModal } from '../../helpers/validations/emptyInputModal';
import { ThemeContext } from '../../../context/Contexts';
import { addData, updateData } from '../../firebase/firebaseAPI';
import { collection } from '../../helpers/commonData/collections';

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
    isStatus: false,
    isShowStatus: false,
    statusMessage: '',
    isErrorInput: false,
    errorMessageInput: '',
  };

  componentDidMount() {
    const { task, currentTask: {taskId, userId}, taskName } = this.props;
    const { trackData } = this.state;

    const tempTrackData = Object.assign(trackData, task);
    this.setState({ trackData: tempTrackData });
    this.setState(prevState => ({
      trackData: {
        ...prevState.trackData,
        taskId,
        userId,
        description: taskName
      }
    }))
  }

  showError = message => {
    this.setState({
      isShowStatus: true,
      statusMessage: message,
    })
  }

  showSuccess = message => {
    this.setState({
      isShowStatus: true,
      statusMessage: message,
      isStatus: true,
    })
  }

  handleClickSubmit = async event => {
    event.preventDefault();

    try {
      const { taskTrackId, trackDate, trackNote } = this.state.trackData;
      const { trackData } = this.state;
      const { handleClickTrack } = this.props;

      if (isEmptyInputModal({trackDate, trackNote })) {
        this.setState({
          isErrorInput: true,
          errorMessageInput: 'Fill important field',
        });
        return;
      }

      if (taskTrackId) {
        try {
          await updateData(taskTrackId, collection.track, trackData);
          this.showSuccess('Success! Subtask was updated!');
        } catch (e) {
          this.showError("Something wrong! Subtask wasn't updated!");
        }
      } else {
        try {
          await addData(collection.track, trackData, 'taskTrackId');
          this.showSuccess('Success! Subtask was added!');
        } catch (e) {
          this.showError("Something wrong! Subtask wasn't added!");
        }
      }
      handleClickTrack();
    } catch (e) {
      this.showError("Something wrong! Check input data!");
    }
  };

  handleChangeInput = ({ target: {id, value } }) => {
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
    const { trackData: { trackNote, trackDate }, errorMessageInput, isErrorInput, isShowStatus, statusMessage, isStatus } = this.state;

    return (
      <>
        <ThemeContext.Consumer>
          {isBlack => (
            <ModalTemplate handleOpenCloseModal={handleClickTrack}>
              <div className={classes.ModalTrack}>
                <Title text={title} />

                <div className={classes.Content}>
                  <Textarea
                    name='Note'
                    disabled={disabled}
                    handleChange={this.handleChangeInput}
                    errorMessage={errorMessageInput}
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
                    errorMessage={errorMessageInput}
                    error={isErrorInput}
                    important={true}
                    value={trackDate}
                    id={'trackDate'}
                  />
                </div>

                <ButtonsGroupModal>
                  <Button
                    name={name}
                    color={isBlack ? color.black : color.green}
                    hidden={hidden}
                    handleClick={this.handleClickSubmit}
                  />
                  <Button
                    name='Back to grid'
                    color={isBlack ? color.darkRed : color.red}
                    handleClick={handleClickTrack}
                  />
                </ButtonsGroupModal>
              </div>
            </ModalTemplate>
          )}
        </ThemeContext.Consumer>
        { isShowStatus ? <Status message={statusMessage} isStatus={isStatus} /> : null }
      </>
  );
  }
}

ModalTrack.defaultProps = {
  name: 'Save changes',
  title: 'Edit',
  hidden: false,
  disabled: false,
};

ModalTrack.propTypes = {
  handleClickTrack: PropTypes.func.isRequired,
};
