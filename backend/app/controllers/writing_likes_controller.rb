class WritingLikesController < ApplicationController
  before_action :find_writing
  before_action :find_writing_like, only: [:destroy]

  def create
    @writing.likes.create(site_user_id: @current_user.id) unless already_liked?
    render json: @writing, status: :created, location: @writing
  end

  def destroy
    if already_liked?
      @writing_like.destroy
    end
    render json: @writing, status: :created, location: @writing
  end

  private

  def find_writing_like
   @writing_like = @writing.likes.find(params[:id])
  end

  def find_writing
    @writing = Writing.find(params[:writing_id])
  end

  def already_liked?
    WritingLike.where(site_user_id: @current_user.id, writing_id: params[:writing_id]).exists?
  end
end
