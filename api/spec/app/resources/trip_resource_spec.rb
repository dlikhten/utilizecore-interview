# frozen_string_literal: true

require "rails_helper"

describe TripResource, type: :resource do
  context "logged-in user based filtering" do
    let!(:trip) { create(:trip, :own_assignee) }
    let!(:other_trip) { create(:trip, :own_assignee) }

    context "logged in" do
      let(:logged_in_user) { trip.owner }

      it "can fetch only own trips" do
        render

        expect(d.size).to eq(1)
        expect(d.map(&:id)).to eq([trip.id])
      end
    end

    context "logged out" do
      let(:logged_in_user) { nil }

      it "cannot fetch any trips" do
        render

        expect(d.size).to eq(0)
      end
    end
  end
end
