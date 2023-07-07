import { FormikInput } from 'components/forms/FormikInput';
import { FormikSelect } from 'components/forms/FormikSelect';
import { SubmitButtonField } from 'components/forms/SubmitButtonField';
import { inputDateToZonedDateString } from 'concerns/date_parsing';
import { useSubmit } from 'concerns/form-behaviors';
import { Form, Formik } from 'formik';
import { find } from 'lodash-es';
import { CreateTripFormAttributes, CreateTripFormRecord } from 'models/forms/CreateTripFormRecord';
import { useLoadUsersAsOptions } from 'models/useLoadUsersAsOptions';
import Loading from 'pages/_loading';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { object, string } from 'yup';

const VALIDATION_SCHEMA = object({
  assigneeId: string().required().label('Assignee'),
  location: string().required().label('Location'),
  estimatedTimeOfArrival: string().required().label('ETA'),
  estimatedTimeOfCompletion: string().required().label('ETC'),
});

export function NewTripForm({ onSuccess }: { onSuccess: () => void }) {
  const userOptions = useLoadUsersAsOptions();
  const currentEmail = useSelector((state: RootState) => state.login.currentEmail);

  const initialValues: CreateTripFormAttributes = useMemo(
    () => ({
      assigneeId: find(userOptions, option => option.label === currentEmail)?.value || '',
      description: '',
      estimatedTimeOfArrival: '',
      estimatedTimeOfCompletion: '',
      location: '',
    }),
    [currentEmail, userOptions]
  );

  const onSubmit = useSubmit<CreateTripFormAttributes, CreateTripFormRecord>({
    onSuccess: () => onSuccess(),
    recordClass: CreateTripFormRecord,
    transformValues: values => {
      // the raw data contains no timezone information, we must correct that so the server interprets this date correctly
      values.estimatedTimeOfArrival = inputDateToZonedDateString(values.estimatedTimeOfArrival);
      values.estimatedTimeOfCompletion = inputDateToZonedDateString(values.estimatedTimeOfCompletion);

      return values;
    },
  });

  if (!userOptions) {
    return <Loading />;
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={VALIDATION_SCHEMA}>
      <Form>
        <FormikSelect name="assigneeId" options={userOptions} label="Assignee" />
        <FormikInput name="location" label="Location" />
        <FormikInput name="description" label="Description" />
        <FormikInput name="estimatedTimeOfArrival" label="ETA" type="datetime-local" />
        <FormikInput name="estimatedTimeOfCompletion" label="ETC" type="datetime-local" />
        <SubmitButtonField>Create</SubmitButtonField>
      </Form>
    </Formik>
  );
}
