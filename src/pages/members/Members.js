import React, { PureComponent } from 'react';
import classes from './Members.module.css';
import { HeaderLine } from '../../components/table/header-line/HeaderLine';
import { Button } from '../../components/UI/button/Button';
import { Line } from '../../components/table/line/Line';
import { Lines } from '../../components/table/lines/Lines';
import { LineLink } from '../../components/table/line-link/LineLink';
import { ButtonsGroup } from '../../components/UI/buttons-group/ButtonsGroup';
import { ButtonMain } from '../../components/UI/button-main/ButtonMain';
import { Spinner } from '../../components/UI/spinner/Spinner';
import ModalRegister from '../../components/modals/modal-register/ModalRegister';
import { Link } from 'react-router-dom';
import { headerLine } from './MembersData';
import { color } from '../../components/UI/colors/colors';
import { Status } from '../../components/UI/status/Status';
import { RolesContext, ThemeContext } from '../../context/Contexts';
import { connect } from 'react-redux';
import {
  getListMembers,
  getMember,
  setLoading,
  setModal,
  setName,
  setTitle,
  setHidden,
  setDisabled,
  setRegister,
  setStatus,
  setShowStatus,
  setStatusMessage,
  getUpdatedMembers,
  deleteMember, handleClickClose, handleClickRegister, editMember, detailMember
} from '../../redux/actionsCreators/actionsCreators';

class Members extends PureComponent {

  async componentDidMount() {
    const {getListMembers, getUpdatedMembers} = this.props;
    getListMembers();
    getUpdatedMembers();
    document.title = 'Members';
  };

  componentWillUnmount() {
    const {getUpdatedMembers} = this.props;
    getUpdatedMembers();
  };

  handleClickEdit = userId => async () => {
    const {editMember} = this.props;
    editMember(userId);
  };

  handleClickDetail = userId => async () => {
    const {detailMember} = this.props;
    detailMember(userId);
  };

  handleClickDelete = (userId) => async () => {
    const {deleteMember} = this.props;
    deleteMember(userId);
  };

  membersTable = () => {
    const { members } = this.props.members;
    const { handleClickRegister } = this.props;

    return (
      <div className={classes.membersTable}>
        <RolesContext.Consumer>
          {({isMentor}) => (
            isMentor
              ? null
              : <ButtonMain>
                  <Button name='Register' handleClick={handleClickRegister} />
                </ButtonMain>
          )}
        </RolesContext.Consumer>

        <HeaderLine>
          {headerLine.map((line, index) => (
            <Line key={index} width={line.width} text={line.text} />
          ))}
        </HeaderLine>

        {members.map((member, index) => {
          return (
            <Lines key={member.userId}>
              <Line width={3} text={index + 1} />
              <LineLink
                width={15}
                text={member.name}
                handleClick={this.handleClickDetail(member.userId)}
              />
              <Line width={20} text={member.direction} />
              <Line width={20} text={member.education} />
              <Line width={10} text={member.startDate} />
              <Line width={7} text={member.age} />

                <ThemeContext.Consumer>
                  {isBlack => (
                    <ButtonsGroup>
                      <Button color={isBlack ? color.black : color.lightBlue}>
                        <Link to={`/users/${member.userId}/progress`} className={classes.Link}>
                          Progress
                        </Link>
                      </Button>

                      <Button color={isBlack ? color.black : color.lightBlue}>
                        <Link to={`/users/${member.userId}/tasks`} className={classes.Link}>
                          Tasks
                        </Link>
                      </Button>

                      <RolesContext.Consumer>
                      {({isMentor}) => (
                        isMentor
                          ? null
                          : <>
                              <Button
                                name='Edit'
                                color={isBlack ? color.black : color.lightBlue}
                                handleClick={this.handleClickEdit(member.userId)}
                              />
                              <Button
                                name='Delete'
                                color={isBlack ? color.darkRed : color.red}
                                handleClick={this.handleClickDelete(member.userId)}
                              />
                            </>
                      )}
                      </RolesContext.Consumer>
                    </ButtonsGroup>
                  )}
                </ThemeContext.Consumer>
            </Lines>
          );
        })}
      </div>
    );
  };

  render() {
    const {isLoading, member, isModal, name, title, isHidden, isDisabled,
      isRegister, isStatus, isShowStatus, statusMessage} = this.props.members;
    const {handleClickClose} = this.props;

    return (
      <>
        {
          isLoading
            ? this.membersTable()
            : isModal || member
                ? <ModalRegister
                    name={name}
                    title={title}
                    handleClickClose={handleClickClose}
                    hidden={isHidden}
                    disabled={isDisabled}
                    user={member}
                    isRegister={isRegister}
                  />
                : <Spinner />
        }
        { isShowStatus ? <Status message={statusMessage} isStatus={isStatus} /> : null }
      </>
    );
  }
}

const mapStateToProps = state => {
  const {isLoading, members, member, isModal, name, title, isHidden,
    isDisabled, isRegister, isStatus, isShowStatus, statusMessage} = state;

  return {
    isLoading, members, member, isModal, name, title, isHidden,
    isDisabled, isRegister, isStatus, isShowStatus, statusMessage
  };
}

export default connect(
  mapStateToProps,
  {
    getListMembers, setLoading, getMember,
    setModal, setName, setTitle, setHidden,
    setDisabled, setRegister, setStatus,
    setShowStatus, setStatusMessage, getUpdatedMembers,
    deleteMember, handleClickClose, handleClickRegister,
    editMember, detailMember
  }
)(Members)