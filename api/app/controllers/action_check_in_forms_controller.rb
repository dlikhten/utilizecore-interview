class ActionCheckInFormsController < ApplicationController
  def create
    form = ActionCheckInFormResource.build(params)

    if form.save
      render jsonapi: form, status: :created
    else
      render jsonapi_errors: form
    end
  end
end