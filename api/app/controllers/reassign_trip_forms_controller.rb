class ReassignTripFormsController < ApplicationController
  def show
    respond_with(ReassignTripFormResource.find(params))
  end

  def update
    form = ReassignTripFormResource.find(params)

    if form.update_attributes
      render jsonapi: form
    else
      render jsonapi_errors: form
    end
  end
end
