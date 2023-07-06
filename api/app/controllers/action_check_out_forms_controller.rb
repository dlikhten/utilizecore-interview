class ActionCheckOutFormsController < ApplicationController
  def create
    form = ActionCheckOutFormResource.build(params)

    if form.save
      render jsonapi: form, status: :created
    else
      render jsonapi_errors: form
    end
  end
end