require "test_helper"

class LikesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @like = likes(:one)
  end

  test "should get index" do
    get likes_url, as: :json
    assert_response :success
  end

  test "should create like" do
    assert_difference("Like.count") do
      post likes_url, params: { like: { comment_id: @like.comment_id, member_id: @like.member_id, writing_id: @like.writing_id } }, as: :json
    end

    assert_response :created
  end

  test "should show like" do
    get like_url(@like), as: :json
    assert_response :success
  end

  test "should update like" do
    patch like_url(@like), params: { like: { comment_id: @like.comment_id, member_id: @like.member_id, writing_id: @like.writing_id } }, as: :json
    assert_response :success
  end

  test "should destroy like" do
    assert_difference("Like.count", -1) do
      delete like_url(@like), as: :json
    end

    assert_response :no_content
  end
end
