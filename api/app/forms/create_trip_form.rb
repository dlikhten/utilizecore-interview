# frozen_string_literal: true

class CreateTripForm < BaseForm
  attr_accessor :assignee_id
  attr_accessor :location
  attr_accessor :description
  attr_accessor :estimated_time_of_arrival
  attr_accessor :estimated_time_of_completion

  def initialize(attributes = {})
    super
    write_only!
  end

  def save_transactioned
    trip = Trip.new

    trip.attributes = {
      assignee_id: assignee_id,
      estimated_time_of_arrival: estimated_time_of_arrival,
      estimated_time_of_completion: estimated_time_of_completion,
      location: location,
      description: description
    }
    trip.owner = current_user

    simple_save(trip, [trip]) do
      import_error(trip, {
        assignee: :assignee_id,
        estimated_time_of_arrival: :estimated_time_of_arrival,
        estimated_time_of_completion: :estimated_time_of_completion,
        location: :location,
        description: :description
      })
    end
  end
end
