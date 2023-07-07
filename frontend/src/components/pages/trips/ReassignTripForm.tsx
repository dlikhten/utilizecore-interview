import { FormikSelect } from 'components/forms/FormikSelect';
import { SubmitButtonField } from 'components/forms/SubmitButtonField';
import { useLoadFormInitialValues, useSubmit } from 'concerns/form-behaviors';
import { Form, Formik } from 'formik';
import {
  ReassignTripFormAttributes,
  ReassignTripFormRecord,
  useFetchReassignTripFormInitialValues,
} from 'models/forms/ReassignTripFormRecord';
import { useLoadUsersAsOptions } from 'models/useLoadUsersAsOptions';
import Loading from 'pages/_loading';
import { object, string } from 'yup';

const VALIDATION_SCHEMA = object({
  assigneeId: string().required().label('Assignee'),
});

export function ReassignTripForm({ onSuccess, tripId }: { onSuccess: () => void; tripId: string }) {
  const userOptions = useLoadUsersAsOptions();

  const { form, mutate, isLoading, initialValues } = useLoadFormInitialValues({
    blankInitialValues: {
      assigneeId: '',
    },
    fetcher: useFetchReassignTripFormInitialValues,
    id: tripId,
  });

  const onSubmit = useSubmit<ReassignTripFormAttributes, ReassignTripFormRecord>({
    onSuccess: () => onSuccess(),
    form,
    mutate,
  });

  if (!userOptions || isLoading) {
    return <Loading />;
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={VALIDATION_SCHEMA}>
      <Form>
        <FormikSelect name="assigneeId" options={userOptions} label="Assignee" />
        <SubmitButtonField>Reassign</SubmitButtonField>
      </Form>
    </Formik>
  );
}
