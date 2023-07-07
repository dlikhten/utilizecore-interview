# frozen_string_literal: true

class ReassignTripForm < BaseForm
  attr_accessor :assignee_id

  def find_trip
    @trip ||= Trip.find(id)
  end

  def hydrate
    self.assignee_id = find_trip.assignee_id.to_s
  end

  def save_transactioned
    trip = find_trip
    trip.assignee_id = assignee_id

    simple_save(trip, [trip]) do
      import_error(trip, {
        assignee: :assignee_id,
      })
    end
  end
end
