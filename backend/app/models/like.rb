# frozen_string_literal: true

class Like
  include Mongoid::Document
  include Mongoid::Timestamps
  belongs_to :site_user
  belongs_to :writing, optional: true
  belongs_to :comment, optional: true
end
