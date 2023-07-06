# frozen_string_literal: true

class ActionCheckInForm < BaseForm
  attr_accessor :trip_id

  def initialize(attributes)
    super
    write_only!
  end

  def save_transactioned
    trip = Trip.find(trip_id)

    if trip.status == "not-started"
      trip.status = "in-progress"
      trip.start_at = Time.zone.now
      trip.save

      # here is where we can throw in a notification about the trip being in progress

      true
    else
      self.errors.add(:base, :"transition to in-progress not permitted for #{trip.status}")

      false
    end
  end
end
