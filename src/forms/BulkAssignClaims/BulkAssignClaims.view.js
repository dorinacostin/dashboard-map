import React from 'react';
import PropTypes from 'prop-types';

// app
import styles from './BulkAssignClaims.styles';
import { Button, FormContainer, FormGrid, FormFields, FormActions, FormAutocompleteMui, FormText, FormRequired } from 'components';
import * as utils from 'utils';

// mui
import { makeStyles } from '@material-ui/core';

BulkAssignClaimsView.propTypes = {
  fields: PropTypes.array,
  buttons: PropTypes.object.isRequired,
  formProps: PropTypes.object.isRequired,
  resetKey: PropTypes.number,
};

export function BulkAssignClaimsView({ fields, buttons, formProps, resetKey }) {
  const classes = makeStyles(styles, { name: 'BulkAssignClaims' })();

  const { cancel, submit } = buttons;
  const { control, errors, handleSubmit, formState } = formProps;

  return (
    <div className={classes.root}>
      <FormContainer type="dialog" onSubmit={handleSubmit(submit.handler)} data-testid="form-bulk-assign-claim">
        <FormRequired type="dialog" />
        <FormFields type="dialog">
          <FormGrid container>
            <FormGrid item xs={12} key={resetKey}>
              <FormAutocompleteMui {...utils.form.getFieldProps(fields, 'team', control, errors)} />
            </FormGrid>
            <FormGrid item xs={12}>
              <FormAutocompleteMui {...utils.form.getFieldProps(fields, 'assignTo', control, errors)} />
            </FormGrid>
            <FormGrid item xs={12}>
              <FormText {...utils.form.getFieldProps(fields, 'notes', control, errors)} />
            </FormGrid>
          </FormGrid>
        </FormFields>

        <FormActions type="dialog">
          {cancel && <Button text={cancel.label} variant="text" disabled={formState.isSubmitting} onClick={cancel.handler} />}
          {submit && (
            <Button
              text={submit.label}
              type="submit"
              disabled={formState.isSubmitting}
              onClick={handleSubmit(submit.handler)}
              color="primary"
            />
          )}
        </FormActions>
      </FormContainer>
    </div>
  );
}
