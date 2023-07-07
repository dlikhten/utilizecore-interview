import { PlusCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { Button } from 'components/forms/Button';
import { NewTripForm } from 'components/pages/trips/NewTripForm';
import { TripRow } from 'components/pages/trips/TripRow';
import { createSWRKey } from 'concerns/jsonapi_utils';
import { map } from 'lodash-es';
import { TripRecord } from 'models/TripRecord';
import { ReactNode, useCallback, useState } from 'react';
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

  const {
    data: trips,
    isLoading,
    mutate,
  } = useSWR(createSWRKey(TripRecord, { includes: dependencyGraph, per: 1000 }), async () => {
    const raw = await TripRecord.includes(dependencyGraph).per(1000).all();
    return raw?.data;
  });

  // this is a hack, if I had more time I'd make the popups a more robust system in the frontend
  const statusMessage = '';

  const [popupContent, setPopupContent] = useState<ReactNode | null>(null);
  const [popupTitle, setPopupTitle] = useState<string | null>(null);

  const closePopup = useCallback((e?: any) => {
    if (e) {
      e.preventDefault();
    }
    setPopupContent(null);
    setPopupTitle(null);
  }, []);

  const onSuccess = useCallback(() => {
    mutate();
    closePopup();
  }, [closePopup, mutate]);

  const openPopup = useCallback((popupTitle: string, popupContent: ReactNode) => {
    setPopupTitle(popupTitle);
    setPopupContent(popupContent);
  }, []);

  const openAdd = useCallback(() => {
    openPopup('Create trip', <NewTripForm onSuccess={onSuccess} />);
  }, [onSuccess, openPopup]);

  return (
    <div>
      {popupContent && popupTitle && (
        <div className="absolute top-0 left-0 w-full h-screen">
          <div className="opacity-40 bg-black w-full h-screen absolute top-0 left-0" />
          <div className="absolute top-0 left-0 w-full h-screen z-10 flex items-center justify-center">
            <div className="bg-white w-2/5 p-6">
              <div className="flex border-b-2 pb-2 mb-2">
                <div className="text-2xl flex-grow">{popupTitle}</div>
                <div className="">
                  <a href="#" onClick={closePopup}>
                    <XMarkIcon width={24} height={24} />
                  </a>
                </div>
              </div>
              <div>{popupContent}</div>
            </div>
          </div>
        </div>
      )}
      <div className="bg-blue-300 w-full h-screen p-4">
        <div className="flex justify-end">
          <Button onClick={openAdd}>
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
            <TripRow key={trip.id} trip={trip} openPopup={openPopup} onSuccess={onSuccess} />
          ))}
        </div>
      </div>
    </div>
  );
}
