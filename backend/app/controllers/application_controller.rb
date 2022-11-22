# frozen_string_literal: true

# Set user to be accessed throughout all other controllers
class ApplicationController < ActionController::API
  # protect_from_forgery with: :null_session
  before_action :set_current_user
  attr_reader :current_user

  def reload_user
    @current_user.reload
  end

  private

  def set_current_user
    session[:id] && (@current_user = SiteUser.find(session[:id]))

    !session[:id] && @current_user = SiteUser.new(username: "Guest #{SiteUser.count + 1}", password: 'password')

    if @current_user.save
      session[:id] = @current_user[:id]
    else
      render json: @current_user.errors, status: :unprocessable_entity
    end
  end
end
