class WritingsController < ApplicationController
  before_action :set_writing, only: %i[show update destroy]

  # GET /writings
  def index
    @writings = Writing.all

    render json: @writings
  end

  # GET /writings/1
  def show
    render json: @writing
  end

  # POST /writings
  def create
    @writing = Writing.new(writing_params)

    if @writing.save
      render json: @writing, status: :created, location: @writing
    else
      render json: @writing.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /writings/1
  def update
    if @writing.update(writing_params)
      render json: @writing
    else
      render json: @writing.errors, status: :unprocessable_entity
    end
  end

  # DELETE /writings/1
  def destroy
    @writing.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_writing
    @writing = Writing.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def writing_params
    params.require(:writing).permit(:slug, :string)
  end
end
