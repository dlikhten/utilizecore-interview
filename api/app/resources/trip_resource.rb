class TripResource < ApplicationResource
  self.type = "trip"

  attribute :location, :string
  attribute :description, :string
  attribute :status, :string_enum, writeable: false, allow: Trip::STATUSES
  attribute :estimated_time_of_arrival, :datetime
  attribute :estimated_time_of_completion, :datetime
  attribute :start_at, :datetime
  attribute :completed_at, :datetime

  belongs_to :owner, resource: UserResource
  belongs_to :assignee, resource: UserResource

  def base_scope
    # nobody should be listing someone else's trips, and this keeps querying trips really simple...
    if current_user.present?
      Trip.for_user(current_user)
    else
      Trip.none
    end
  end
end