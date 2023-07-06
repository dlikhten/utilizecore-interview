class CreateTripFormsController < ApplicationController
  def create
    form = CreateTripFormResource.build(params)

    if form.save
      render jsonapi: form, status: :created
    else
      render jsonapi_errors: form
    end
  end
end