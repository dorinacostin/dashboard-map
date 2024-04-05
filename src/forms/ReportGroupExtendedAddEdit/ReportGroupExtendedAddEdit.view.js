import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// app
import styles from './ReportGroupExtendedAddEdit.styles';
import { Button, FormContainer, FormFields, FormActions, FormGrid, FormText } from 'components';
import * as utils from 'utils';

// mui
import { makeStyles } from '@material-ui/core';

ReportGroupExtendedAddEditView.propTypes = {
  fields: PropTypes.array.isRequired,
  actions: PropTypes.array.isRequired,
};

export function ReportGroupExtendedAddEditView({ fields, actions }) {
  const classes = makeStyles(styles, { name: 'ReportGroupExtendedAddEdit' })();

  const defaultValues = utils.form.getInitialValues(fields);
  const validationSchema = utils.form.getValidationSchema(fields);

  const { control, reset, errors, handleSubmit, formState } = useForm({
    defaultValues,
    ...(validationSchema && { resolver: yupResolver(validationSchema) }),
  });

  const cancel = actions && actions.find((action) => action.name === 'cancel');
  const submit = actions && actions.find((action) => action.name === 'submit');

  const onCancel = () => {
    cancel && utils.generic.isFunction(cancel.handler) && cancel.handler();
    reset();
  };

  const onSubmit = (data) => {
    return submit && utils.generic.isFunction(submit.handler) && submit.handler({ id: defaultValues.id, ...data });
  };
  const isSubmitDisabled = !formState.isDirty;

  return (
    <div className={classes.root}>
      <FormContainer type="dialog" onSubmit={handleSubmit(onSubmit)} data-testid="form-report-group-extended-add-edit">
        <FormFields type="dialog">
          <FormGrid container>
            <FormGrid item xs={12}>
              <FormText {...utils.form.getFieldProps(fields, 'name', control, errors)} />
            </FormGrid>
            <FormGrid item xs={12}>
              <FormText {...utils.form.getFieldProps(fields, 'description', control, errors)} />
            </FormGrid>
          </FormGrid>
        </FormFields>

        <FormActions type="dialog">
          {cancel && <Button text={cancel.label} variant="text" onClick={onCancel} disabled={formState.isSubmitting || isSubmitDisabled} />}
          {submit && <Button text={submit.label} type="submit" disabled={formState.isSubmitting || isSubmitDisabled} color="primary" />}
        </FormActions>
      </FormContainer>
    </div>
  );
}
