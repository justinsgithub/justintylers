require "test_helper"

class SiteUsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @site_user = site_users(:one)
  end

  test "should get index" do
    get site_users_url, as: :json
    assert_response :success
  end

  test "should create site_user" do
    assert_difference("SiteUser.count") do
      post site_users_url, params: { site_user: { username: @site_user.username } }, as: :json
    end

    assert_response :created
  end

  test "should show site_user" do
    get site_user_url(@site_user), as: :json
    assert_response :success
  end

  test "should update site_user" do
    patch site_user_url(@site_user), params: { site_user: { username: @site_user.username } }, as: :json
    assert_response :success
  end

  test "should destroy site_user" do
    assert_difference("SiteUser.count", -1) do
      delete site_user_url(@site_user), as: :json
    end

    assert_response :no_content
  end
end
