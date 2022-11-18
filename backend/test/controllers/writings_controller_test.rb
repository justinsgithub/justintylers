require "test_helper"

class WritingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @writing = writings(:one)
  end

  test "should get index" do
    get writings_url, as: :json
    assert_response :success
  end

  test "should create writing" do
    assert_difference("Writing.count") do
      post writings_url, params: { writing: { slug: @writing.slug, string: @writing.string } }, as: :json
    end

    assert_response :created
  end

  test "should show writing" do
    get writing_url(@writing), as: :json
    assert_response :success
  end

  test "should update writing" do
    patch writing_url(@writing), params: { writing: { slug: @writing.slug, string: @writing.string } }, as: :json
    assert_response :success
  end

  test "should destroy writing" do
    assert_difference("Writing.count", -1) do
      delete writing_url(@writing), as: :json
    end

    assert_response :no_content
  end
end
