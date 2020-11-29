import React from 'react';
import classes from './About.module.css';
import { Title } from '../../components/title/Title';
import { Text } from '../../components/UI/text/Text';
import { List } from '../../components/UI/list/List';
import { list } from '../../components/helpers/commonData/list';

export const About = () => (
  <div className={classes.About}>
    <Title text='Dev Incubator Management System' />
    <Text text='This system has several user roles in the DIMS:' />
    <List list={list} />
    <Text text='All roles have several actions. Look at the table.' />
    <table>
      <thead>
        <tr className={classes.Main}>
          <th className={classes.Title}>Actions</th>
          <th className={classes.Subtitle}>Admin</th>
          <th className={classes.Subtitle}>Mentor</th>
          <th className={classes.Subtitle}>Member</th>
        </tr>
      </thead>
      <tbody>
        <tr className={classes.SubBold}>
          <td className={classes.CellTitle}>Watch the Member's Manage Grid</td>
          <td className={classes.Allowed}>+</td>
          <td className={classes.Allowed}>+</td>
          <td className={classes.NotAllowed}>-</td>
        </tr>
        <tr className={classes.SubBold}>
          <td className={classes.CellTitle}>Add, edit, and delete a member on Member's Manage Grid</td>
          <td className={classes.Allowed}>+</td>
          <td className={classes.NotAllowed}>-</td>
          <td className={classes.NotAllowed}>-</td>
        </tr>
        <tr className={classes.SubBold}>
          <td className={classes.CellTitle}>Watch the Member's Progress Grid</td>
          <td className={classes.Allowed}>+</td>
          <td className={classes.Allowed}>+</td>
          <td className={classes.NotAllowed}>-</td>
        </tr>
        <tr className={classes.SubBold}>
          <td className={classes.CellTitle}>Watch the Tasks Menage Grid</td>
          <td className={classes.Allowed}>+</td>
          <td className={classes.Allowed}>+</td>
          <td className={classes.NotAllowed}>-</td>
        </tr>
        <tr className={classes.SubBold}>
          <td className={classes.CellTitle}>Add, edit, and delete a New Task</td>
          <td className={classes.Allowed}>+</td>
          <td className={classes.Allowed}>+</td>
          <td className={classes.Allowed}>+</td>
        </tr>
        <tr className={classes.SubBold}>
          <td className={classes.CellTitle}>Watch the Member's Task Manage grid</td>
          <td className={classes.Allowed}>+</td>
          <td className={classes.Allowed}>+</td>
          <td className={classes.NotAllowed}>-</td>
        </tr>
        <tr className={classes.SubBold}>
          <td className={classes.CellTitle}>Set the Member's task state as Success or Fail</td>
          <td className={classes.NotAllowed}>-</td>
          <td className={classes.NotAllowed}>-</td>
          <td className={classes.Allowed}>+</td>
        </tr>
        <tr className={classes.SubBold}>
          <td className={classes.CellTitle}>Add, edit, and delete a Subtasks of the current Task</td>
          <td className={classes.NotAllowed}>-</td>
          <td className={classes.NotAllowed}>-</td>
          <td className={classes.Allowed}>+</td>
        </tr>
      </tbody>
    </table>
  </div>
);
