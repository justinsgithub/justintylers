# frozen_string_literal: true

# like writings and comments
class LikesController < ApplicationController
  before_action :set_like, only: %i[show update destroy]

  # GET /likes
  def index
    @likes = Like.all
    render json: @likes
  end

  # GET /likes/1
  def show
    render json: @like
  end

  # POST /likes
  def create
    is_like = check_for_like
    if is_like
      is_like.destroy
      reload_user
      return render json: @current_user, status: :ok, location: @like
    end

    @like = @current_user.likes.new(like_params)
    if @like.save
      reload_user
      render json: @current_user, status: :created, location: @like
    else
      render json: @like.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /likes/1
  def update
    if @like.update(like_params)
      render json: @like
    else
      render json: @like.errors, status: :unprocessable_entity
    end
  end

  # DELETE /likes/1
  def destroy
    @like.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_like
    @like = Like.find(params[:id])
  end

  def check_for_like
    likes = @current_user.likes.map { |like| like[:comment_id]&.to_s || like[:writing_id]&.to_s }
    entity = Hash.new(like_params)[:like][:writing] || Hash.new(like_params)[:like][:comment]
    like = nil
    if likes.include? entity
      like = @current_user.likes.where(writing: entity).first || @current_user.likes.where(comment: entity).first
    end
    like
  end

  # Only allow a list of trusted parameters through.
  def like_params
    params.require(:like).permit(:writing, :comment)
  end
end
