import { PlusCircleIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { Button } from 'components/forms/Button';
import { TripRow } from 'components/pages/trips/TripRow';
import { createSWRKey } from 'concerns/jsonapi_utils';
import { map } from 'lodash-es';
import { TripRecord } from 'models/TripRecord';
import { ReactNode } from 'react';
import useSWR from 'swr';

function HeaderCell({ children, position = 'mid' }: { children: ReactNode; position?: 'mid' | 'head' | 'tail' }) {
  return (
    <div
      className={classNames('bg-white px-2', {
        'rounded-l-md': position === 'head',
        'rounded-r-md': position === 'tail',
      })}
    >
      {children}
    </div>
  );
}

export default function Trips() {
  const dependencyGraph = TripRow.DEPENDENCY_GRAPH.trip;

  const { data: trips, isLoading } = useSWR(
    createSWRKey(TripRecord, { includes: dependencyGraph, per: 1000 }),
    async () => {
      const raw = await TripRecord.includes(dependencyGraph).per(1000).all();
      return raw?.data;
    }
  );

  return (
    <div className="bg-blue-300 w-full h-screen p-4">
      <div className="flex justify-end">
        <Button>
          <PlusCircleIcon width={24} height={24} className="mr-2" /> Add Trip
        </Button>
      </div>
      <div className="grid grid-cols-7 mt-4">
        <HeaderCell position="head">Assignee</HeaderCell>
        <HeaderCell>Owner</HeaderCell>
        <HeaderCell>Address</HeaderCell>
        <HeaderCell>ETA</HeaderCell>
        <HeaderCell>ETC</HeaderCell>
        <HeaderCell>Status</HeaderCell>
        <HeaderCell position="tail">Actions</HeaderCell>
      </div>
      <div className="grid grid-cols-7 mt-2 rounded-md overflow-hidden">
        {map(trips, trip => (
          <TripRow key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
}
