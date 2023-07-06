require 'rails_helper'

describe Trip, type: :model do
  context "validations" do
    it "smoke test" do
      # just to make sure when we build we have a valid object
      expect(build(:trip).valid?).to be_truthy
      expect(build(:trip, :own_assignee).valid?).to be_truthy
      expect(build(:trip, :started).valid?).to be_truthy
      expect(build(:trip, :completed).valid?).to be_truthy
    end

    it "requires certain fields to be present" do
      trip = Trip.new
      trip.status = nil

      expect(trip.valid?).to be_falsey

      expect(trip.errors).to have_key(:owner)
      expect(trip.errors).to have_key(:assignee)
      expect(trip.errors).to have_key(:status)
      expect(trip.errors).to have_key(:estimated_time_of_arrival)
      expect(trip.errors).to have_key(:estimated_time_of_completion)
      expect(trip.errors).to have_key(:location)
    end

    it "start_at is required when the status is in-progress" do
      trip = build(:trip, :completed)
      trip.completed_at = nil

      expect(trip.valid?).to be_falsey
      expect(trip.errors).to have_key(:completed_at)
    end

    it "completed_at is required when the status is completed" do
      trip = build(:trip, :started)
      trip.start_at = nil

      expect(trip.valid?).to be_falsey
      expect(trip.errors).to have_key(:start_at)
    end

    it "ETA should be before ETC" do
      trip = build(:trip, estimated_time_of_arrival: "2023-01-01 00:01:00.000Z", estimated_time_of_completion: "2023-01-01 00:00:00.000Z")

      expect(trip.valid?).to be_falsey

      trip.estimated_time_of_completion = trip.estimated_time_of_arrival + 1.minute
      expect(trip.valid?).to be_truthy
    end

    it "completed should be after started" do
      trip = build(:trip, :completed, start_at: "2023-01-01 00:01:00.000Z", completed_at: "2023-01-01 00:00:00.000Z")

      expect(trip.valid?).to be_falsey

      trip.completed_at = trip.start_at + 1.minute
      expect(trip.valid?).to be_truthy
    end
  end
end
