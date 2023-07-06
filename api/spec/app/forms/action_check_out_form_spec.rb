# frozen_string_literal: true

require "rails_helper"

describe ActionCheckOutForm do
  context "action" do
    it "transitions the given trip to in-progress" do
      Timecop.freeze do
        trip = create(:trip, :started)

        form = ActionCheckOutForm.new({
          trip_id: trip.id.to_s
        })

        expect {
          expect(form.save).to be_truthy
        }.to change(Trip, :count).by(0)

        trip.reload
        expect(trip.status).to eq("completed")
        expect(trip.completed_at).to eq(Time.zone.now)
      end
    end

    it "does not permit transition for an improper state" do
      trip = create(:trip)

      form = ActionCheckOutForm.new({
        trip_id: trip.id.to_s
      })

      expect {
        expect(form.save).to be_falsey
      }.to_not change{trip.reload.status}

      expect(form.errors).to have_key(:base)
    end
  end
end
