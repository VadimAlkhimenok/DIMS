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
import { RolesContext } from '../../context/Contexts';
import { connect } from 'react-redux';
import {
  getListMembers,
  getMember,
  getUpdatedMembers,
  deleteMember,
  handleClickRegister,
} from '../../redux/actionsCreators/membersCreators';
import { handleClickClose, setEdit, setDetail } from '../../redux/actionsCreators/appCreators';
import { successResponseData } from '../../components/helpers/commonData/successResponseData';

class Members extends PureComponent {
  async componentDidMount() {
    const { getListMembers, getUpdatedMembers } = this.props;
    await Promise.all([await getListMembers(), await getUpdatedMembers()]);
    document.title = 'Members';
  }

  handleClickEdit = (userId) => async () => {
    const { getMember, setEdit } = this.props;
    const { showError } = this.context;
    try {
      await getMember(userId).then(() => setEdit(userId));
    } catch ({ message }) {
      showError(message);
    }
  };

  handleClickDetail = (userId) => async () => {
    const { getMember, setDetail } = this.props;
    const { showError } = this.context;
    try {
      await getMember(userId).then(() => setDetail(userId));
    } catch ({ message }) {
      showError(message);
    }
  };

  handleClickDelete = (userId) => async () => {
    const { deleteMember } = this.props;
    const { showError, showSuccess } = this.context;
    const { deleteUser } = successResponseData;
    try {
      await deleteMember(userId);
      showSuccess(deleteUser);
    } catch ({ message }) {
      showError(message);
    }
  };

  membersTable = () => {
    const { members } = this.props.members;
    const { handleClickRegister } = this.props;

    return (
      <div className={classes.membersTable}>
        <RolesContext.Consumer>
          {({ isMentor }) =>
            isMentor ? null : (
              <ButtonMain>
                <Button name='Register' handleClick={handleClickRegister} />
              </ButtonMain>
            )
          }
        </RolesContext.Consumer>

        <HeaderLine>
          {headerLine.map((line, index) => (
            <Line key={index} width={line.width} text={line.text} />
          ))}
        </HeaderLine>

        {members.map((member, index) => {
          return (
            <Lines key={member.userId}>
              <Line width={5} text={index + 1} />
              <LineLink width={15} text={member.name} handleClick={this.handleClickDetail(member.userId)} />
              <Line width={15} text={member.direction} />
              <Line width={15} text={member.education} />
              <Line width={17} text={member.startDate} />
              <Line width={10} text={member.age} />

              <ButtonsGroup>
                <Button color={'var(--background-table)'}>
                  <Link to={`/users/${member.userId}/progress`} className={classes.Link}>
                    Progress
                  </Link>
                </Button>

                <Button color={'var(--background-table)'}>
                  <Link to={`/users/${member.userId}/tasks`} className={classes.Link}>
                    Tasks
                  </Link>
                </Button>

                <RolesContext.Consumer>
                  {({ isMentor }) =>
                    isMentor ? null : (
                      <>
                        <Button
                          name='Edit'
                          color={'var(--background-table)'}
                          handleClick={this.handleClickEdit(member.userId)}
                        />
                        <Button
                          name='Delete'
                          color={'var(--color-button-delete)'}
                          handleClick={this.handleClickDelete(member.userId)}
                        />
                      </>
                    )
                  }
                </RolesContext.Consumer>
              </ButtonsGroup>
            </Lines>
          );
        })}
      </div>
    );
  };

  render() {
    const { isLoading, member, isModal, name, title, isHidden, isDisabled, isRegister } = this.props.members;
    const { handleClickClose } = this.props;

    return (
      <>
        {isLoading ? (
          this.membersTable()
        ) : isModal || member ? (
          <ModalRegister
            name={name}
            title={title}
            handleClickClose={handleClickClose}
            hidden={isHidden}
            disabled={isDisabled}
            user={member}
            isRegister={isRegister}
          />
        ) : (
          <Spinner />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { isLoading, members, member, isModal, name, title, isHidden, isDisabled, isRegister } = state;

  return {
    isLoading,
    members,
    member,
    isModal,
    name,
    title,
    isHidden,
    isDisabled,
    isRegister,
  };
};

export default connect(mapStateToProps, {
  getListMembers,
  getMember,
  setEdit,
  setDetail,
  getUpdatedMembers,
  deleteMember,
  handleClickClose,
  handleClickRegister,
})(Members);

Members.contextType = RolesContext;
