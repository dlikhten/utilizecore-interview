class TripsController < ApplicationController
  def index
    respond_with(TripResource.all(params))
  end

  def show
    respond_with(TripResource.find(params))
  end
end
