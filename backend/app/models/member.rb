# frozen_string_literal: true

class Member
  include Mongoid::Document
  include Mongoid::Timestamps
  store_in client: 'ali'
  field :uid, type: String
  field :age, type: Integer
  field :gender, type: String
  field :username, type: String
  field :orientation, type: String
  field :style, type: String
  field :interests, type: Array
  field :curiosities, type: Array
  field :looking_for, type: Array
  field :active, type: String
  field :page_url, type: String
  field :pictures_page_url, type: String
  field :picture_urls, type: Array
  field :total_pictures, type: Integer
  field :total_followers, type: Integer
  field :total_friends, type: Integer
  field :latest_activity, type: Date
  belongs_to :city, optional: true
  belongs_to :state, optional: true
  validates :uid, :age, :gender, :username, :page_url, :pictures_page_url, presence: true
  validates_uniqueness_of :uid, :username
end
