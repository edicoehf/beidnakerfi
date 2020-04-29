// Dependencies
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Components
import Sidebar from '../../components/Sidebar';
import DepartmentForm from '../../components/Forms/DepartmentForm';

const useStyles = makeStyles((themes) => ({
  main: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    width: '100%',
  },
  container: {
    display: 'flex',
    width: '80%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 150,
    marginLeft: themes.spacing(5),
  },
}));

const CreateDepartment = () => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <div>
        <Sidebar />
      </div>
      <div className={classes.container}>
        <DepartmentForm />
      </div>
    </div>
  );
};

export default CreateDepartment;
