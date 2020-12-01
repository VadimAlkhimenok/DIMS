import React, { PureComponent } from 'react';
import classes from './SidebarSwitch.module.css';
import { BurgerIcon } from '../../UI/burger-icon/BurgerIcon';
import { SidebarMain } from '../side-bar-main/SidebarMain';
import { RolesContext } from '../../../context/Contexts';

export default class SidebarSwitch extends PureComponent {
  state = { isOpen: false };

  handleClickSidebarSwitch = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { isOpen } = this.state;

    return (
      <RolesContext.Consumer>
        {({ isUser }) =>
          isUser ? null : (
            <>
              <div className={classes.Sidebar}>
                {isOpen ? (
                  <SidebarMain open={isOpen} handleClick={this.handleClickSidebarSwitch} />
                ) : (
                  <BurgerIcon handleClickBurger={this.handleClickSidebarSwitch} />
                )}
              </div>
            </>
          )
        }
      </RolesContext.Consumer>
    );
  }
}
