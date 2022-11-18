# frozen_string_literal: true

class Writing
  include Mongoid::Document
  include Mongoid::Timestamps
  field :slug, type: String
  has_many :likes
end
