import React from 'react';
import classes from './Routing.module.css';
import { RolesContext } from '../../context/Contexts';
import { Redirect, Switch, Route } from 'react-router-dom';
import { Home } from '../../pages/home/Home';
import Members from '../../pages/members/Members';
import Tasks from '../../pages/tasks/Tasks';
import MemberProgress from '../../pages/member-progress/MemberProgress';
import MembersTrack from '../../pages/members-track/MemberTrack';
import { About } from '../../pages/about/About';
import Auth from '../../components/auth/Auth';
import { MemberTasks } from '../../pages/members-tasks/MemberTasks';

export const Routing = (login, setLogin, getLoginRole) => {
  if (login) {
    return (
      <div className={classes.Routing}>
        <Switch>
          <RolesContext.Consumer>
            {({ isUser, userId }) =>
              isUser ? (
                <>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/users/:userId/tasks' component={MemberTasks} />
                  <Route exact path='/users/:userId/tasks/:taskId/track' component={MembersTrack} />
                  <Redirect to={`/users/${userId}/tasks`} />
                  <Route exact path='/about' component={About} />
                </>
              ) : (
                <>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/users' component={Members} />
                  <Route exact path='/tasks' component={Tasks} />
                  <Route exact path='/users/:userId/progress' component={MemberProgress} />
                  <Route exact path='/users/:userId/tasks' component={MemberTasks} />
                  <Route exact path='/users/:userId/tasks/:taskId/track' component={MembersTrack} />
                  <Route exact path='/about' component={About} />
                  <Redirect to='/' />
                </>
              )
            }
          </RolesContext.Consumer>
        </Switch>
      </div>
    );
  }

  return (
    <div className={classes.Routing}>
      <Switch>
        <Route
          exact
          path='/login'
          render={(props) => <Auth {...props} setLogin={setLogin} getLoginRole={getLoginRole} />}
        />
        <Redirect from='/' to='/login' />
      </Switch>
    </div>
  );
};
