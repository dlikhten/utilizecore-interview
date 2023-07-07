import { parseISO } from 'concerns/date_parsing';
import { ApplicationRecord } from 'models/ApplicationRecord';
import { UserRecord } from 'models/UserRecord';
import { Attr, BelongsTo, Model } from 'spraypaint';

export type StatusType = 'not-started' | 'in-progress' | 'completed';
export type ComputedStatusType = StatusType | 'overdue';

@Model()
export class TripRecord extends ApplicationRecord {
  static jsonapiType = 'trip';
  static endpoint = '/trips';

  @Attr() location!: string;
  @Attr() description!: string;
  @Attr() estimatedTimeOfArrival!: string;
  @Attr() estimatedTimeOfCompletion!: string;
  @Attr() startAt!: string;
  @Attr() completedAt!: string;
  @Attr() status!: StatusType;
  @Attr() email!: string;

  computedStatus(): ComputedStatusType {
    if (this.status === 'in-progress' && parseISO(this.estimatedTimeOfCompletion).isBefore(new Date())) {
      return 'overdue';
    } else {
      return this.status;
    }
  }

  @BelongsTo(UserRecord) owner!: UserRecord;
  @BelongsTo(UserRecord) assignee!: UserRecord;
}
