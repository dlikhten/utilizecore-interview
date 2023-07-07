import { SelectOption } from 'components/forms/FormikSelect';
import { createSWRKey } from 'concerns/jsonapi_utils';
import { map } from 'lodash-es';
import { UserRecord } from 'models/UserRecord';
import useSWR from 'swr';

export function useLoadUsersAsOptions(): SelectOption[] | undefined {
  const { data } = useSWR(createSWRKey(UserRecord, { per: 1000 }), async () => {
    const records = (await UserRecord.per(1000).all())?.data;
    return map(records, user => ({ label: user.email, value: user.id }));
  });

  return data;
}
