# frozen_string_literal: true

class SiteUser
  include Mongoid::Document
  include Mongoid::Timestamps
  field :email, type: String
  field :password, type: String
  field :username, type: String
  field :guest, type: Boolean, default: true
  has_many :writing_likes
end
