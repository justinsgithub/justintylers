# frozen_string_literal: true

# get current user
class SiteUsersController < ApplicationController
  # before_action :set_site_user, only: %i[show update destroy]

  # GET /site_users
  def index
    @current_user.xlikes
    render json: @current_user
  end

  # # GET /site_users/1
  # def show
  #   render json: @site_user
  # end
  #
  # # POST /site_users
  # def create
  #   @site_user = SiteUser.new(site_user_params)
  #
  #   if @site_user.save
  #     render json: @site_user, status: :created, location: @site_user
  #   else
  #     render json: @site_user.errors, status: :unprocessable_entity
  #   end
  # end
  #
  # # PATCH/PUT /site_users/1
  # def update
  #   if @site_user.update(site_user_params)
  #     render json: @site_user
  #   else
  #     render json: @site_user.errors, status: :unprocessable_entity
  #   end
  # end
  #
  # # DELETE /site_users/1
  # def destroy
  #   @site_user.destroy
  # end

  private

  # Use callbacks to share common setup or constraints between actions.

  # Only allow a list of trusted parameters through.
  def site_user_params
    params.require(:site_user).permit(:username)
  end
end
