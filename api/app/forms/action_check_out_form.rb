# frozen_string_literal: true

class ActionCheckOutForm < BaseForm
  attr_accessor :trip_id

  def initialize(attributes)
    super
    write_only!
  end

  def save_transactioned
    trip = Trip.find(trip_id)

    if trip.status == "in-progress"
      trip.status = "completed"
      trip.completed_at = Time.zone.now
      trip.save

      true
    else
      self.errors.add(:base, "transition to completed not permitted for #{trip.status}")

      false
    end
  end
end
