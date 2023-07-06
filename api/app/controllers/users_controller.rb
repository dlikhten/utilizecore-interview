class UsersController < ApplicationController
  def index
    respond_with(UserResource.all(params))
  end

  def show
    respond_with(UserResource.find(params))
  end
end
